const fs = require("fs");
const path = require("path");
const courseCategory = require("../models/course/courseCategory");
const courseContent = require("../models/course/courseContent");
const courseType = require("../models/course/coursesType");
const subCourses = require("../models/course/subCourses");
const configurations = require("../config/config").configurations;
const { logger } = require("../logs/logger");
// const uploadCoursePath = configurations.rootFolderOfCourse;
const uploadCoursePath = path.join(__dirname, "..", "..", "uploads"); // main uploads folder

const addNewCourseService = async (
  categoryId,
  courseUniquePrefix,
  courseName,
  username
) => {
  if (!courseName || !username) {
    return {
      status: 0,
      data: configurations.Messages.common.provideDetails,
    };
  }
  try {
    const findExistingCourseName = await courseType.findOne({
      where: { courseName: courseName },
    });
    if (findExistingCourseName) {
      return {
        status: 0,
        data: "Couse Name already exits",
      };
    }
    await courseType.create({
      courseName: courseName,
      categoryId: categoryId,
      courseUniquePrefix: courseUniquePrefix,
      createdBy: username,
      updatedBy: "",
    });
    const getNewlyCreatedCourse = await courseType.findOne({
      where: { courseName: courseName },
    });
    let courseId = getNewlyCreatedCourse.dataValues.courseId;
    await subCourses.create({
      subCourseName: courseName,
      courseId: courseId,
      categoryId: categoryId,
      coursePathDetails: courseUniquePrefix,
      createdBy: username,
    });
    return {
      status: 1,
      data: "Course created successfully",
    };
  } catch (error) {
    console.log(error);
    logger.error(error.stack);
    return {
      status: 0,
      data: configurations.Messages.common.error,
    };
  }
};

// const uploadCourseService = async (
//   categoryId,
//   categoryName,
//   subCourseId,
//   courseDescription,
//   courseId,
//   fileInformations,
//   courseTypeName,
//   uploadedBy
// ) => {
//   if (
//     !categoryId ||
//     !courseId ||
//     !subCourseId ||
//     !fileInformations ||
//     !courseTypeName
//   ) {
//     return {
//       status: 0,
//       data: configurations.Messages.common.provideDetails,
//     };
//   }

//   try {
//     const uploadDir = path.join(
//       uploadCoursePath,
//       "..",
//       "uploads",
//       categoryName,
//       courseTypeName
//     );
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const courseContentPromises = fileInformations.map(async (file) => {
//       console.log(file);
//       return await courseContent.create({
//         subCourseId: subCourseId,
//         contentName: file.originalname,
//         courseDescription: courseDescription,
//         contentPrefix: `${courseTypeName}_${categoryName}_${courseId}`,
//         contentPath: {
//           path: `../../uploads/${categoryName}/${courseTypeName}/${file.originalname}`,
//         },
//         contentType: file.mimetype,
//         createdBy: uploadedBy,
//         updatedBy: uploadedBy,
//       });
//     });

//     const courseContents = await Promise.all(courseContentPromises);
//     console.log("Saved content:", courseContents);

//     return {
//       status: 1,
//       data: "Course and file uploaded successfully",
//     };
//   } catch (error) {
//     console.error("Error uploading course:", error);
//     return {
//       status: 0,
//       data: "Failed to upload course",
//       error: error.message,
//     };
//   }
// };

const uploadCourseService = async (
  categoryId,
  categoryName,
  subCourseId,
  courseDescription,
  courseId,
  fileInformations,
  courseTypeName,
  uploadedBy
) => {
  if (
    !categoryId ||
    !courseId ||
    !subCourseId ||
    !fileInformations ||
    !courseTypeName
  ) {
    return {
      status: 0,
      data: configurations.Messages.common.provideDetails,
    };
  }

  try {
    // Path: uploads/<categoryName>/<courseTypeName>
    const uploadDir = path.join(
      uploadCoursePath, // This already points to the main 'uploads' folder
      categoryName, // Subfolder for the category
      courseTypeName // Nested folder for the course type
    );

    // Create the nested directory structure if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save course content entries for each file
    const courseContentPromises = fileInformations.map(async (file) => {
      const filePath = path.join(uploadDir, file.originalname); // Full path for the file
      console.log(file.buffer);

      // 👉 Actually save the file to disk
      fs.writeFileSync(filePath, file.originalname);
      // Saving the file path to the database (relative to 'uploads')
      const relativeFilePath = path.join(
        categoryName,
        courseTypeName,
        file.originalname
      );

      return await courseContent.create({
        subCourseId: subCourseId,
        contentName: file.originalname,
        courseDescription: courseDescription,
        contentPrefix: `${courseTypeName}_${categoryName}_${courseId}`,
        contentPath: {
          path: `../../uploads/${relativeFilePath}`, // Store relative path
        },
        contentType: file.mimetype,
        createdBy: uploadedBy,
        updatedBy: uploadedBy,
      });
    });

    // Wait for all the file uploads to complete
    const courseContents = await Promise.all(courseContentPromises);
    console.log("Saved content:", courseContents);

    return {
      status: 1,
      data: "Course and file uploaded successfully",
    };
  } catch (error) {
    console.error("Error uploading course:", error);
    return {
      status: 0,
      data: "Failed to upload course",
      error: error.message,
    };
  }
};

const getAllAvailableCourses = async (categoryId, userId) => {};

// const getCourseContentService = async (userId, contentId, res) => {
//   if (!contentId) {
//     return res.status(400).json({
//       status: 0,
//       data: configurations.Messages.common.provideDetails,
//     });
//   }
//   try {
//     const data = await courseContent.findOne({
//       where: { contentId },
//     });

//     if (!data) {
//       return res.status(404).json({
//         status: 0,
//         data: "Content not found",
//       });
//     }

//     // const filePath = path.join(__dirname, "..", "..", data.contentPath.path);
//     // console.log("Serving file:", filePath);
//     const relativeFilePath = data.contentPath.path.split("/uploads/")[1];
//     const filePath = path.resolve(
//       __dirname,
//       "..",
//       "..",
//       "uploads",
//       relativeFilePath
//     );
//     console.log("Serving file:", filePath);

//     return res.sendFile(filePath);
//   } catch (error) {
//     console.error(error);
//     logger.error(error.stack);
//     return res.status(500).json({
//       status: 0,
//       data: configurations.Messages.common.error,
//     });
//   }
// };

const getCourseContentService = async (userId, contentId, res) => {
  if (!contentId) {
    return res.status(400).json({
      status: 0,
      data: configurations.Messages.common.provideDetails,
    });
  }

  try {
    const data = await courseContent.findOne({
      where: { contentId },
    });

    if (!data) {
      return res.status(404).json({
        status: 0,
        data: "Content not found",
      });
    }

    // Resolving the relative path to an absolute path
    const relativeFilePath = data.contentPath.path.split("/uploads/")[1];
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "uploads",
      relativeFilePath
    );

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 0,
        data: "File not found",
      });
    }

    // Set the appropriate headers for serving the file (e.g., video)
    res.setHeader("Content-Type", "video/mp4"); // Assuming it's a video file
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${path.basename(filePath)}"`
    ); // Inline to allow viewing in browser
    res.sendFile(filePath);

    console.log(filePath);
  } catch (error) {
    console.error(error);
    logger.error(error.stack);
    return res.status(500).json({
      status: 0,
      data: configurations.Messages.common.error,
    });
  }
};
module.exports = {
  uploadCourseService,
  addNewCourseService,
  getCourseContentService,
};
