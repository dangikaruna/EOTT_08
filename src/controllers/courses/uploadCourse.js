const asyncWrapper = require("../../middleware/async");
const { StatusCodes } = require("http-status-codes");
const { uploadCourseService } = require("../../services/coursesServices");

exports.uploadCourse = asyncWrapper(async (req, res) => {
  const {
    categoryId,
    categoryName,
    courseId,
    courseDescription,
    subCourseId,
    courseTypeName,
    uploadedBy,
  } = req.body;

  const fileInformation = req.file;

  if (!fileInformation) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 0,
      message: "No file uploaded",
    });
  }

  // Wrap single file in array to keep service consistent
  const fileInformations = [fileInformation];

  const result = await uploadCourseService(
    categoryId,
    categoryName,
    subCourseId,
    courseId,
    courseDescription,
    fileInformations,
    courseTypeName,
    uploadedBy
  );

  res.status(StatusCodes.OK).json(result);
});
