import { getImageByName, uploadImage } from "../services/image.service.js";

const imageUploadController = async (req, res) => {
  try {
    const result = await uploadImage(req);
    res.status(result.statusCode).json({
      success: result.statusCode < 400,
      message: result.message,
      data: result.data,
      ...(result.error && { error: result.error }) // Only include error if exists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected server error",
      error: error.message
    });
  }
};

const downloadController = async (req, res) => {
  try {
    const result = await getImageByName(req);
    
    if (result.statusCode === 200 && result.data?.url) {
      // For actual file download, you could use:
      // return res.download(path.join(__dirname, '../', result.data.url));
      
      // For just returning the URL:
      return res.status(result.statusCode).json({
        success: true,
        message: result.message,
        data: result.data
      });
    }
    
    res.status(result.statusCode).json({
      success: false,
      message: result.message,
      ...(result.error && { error: result.error })
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected server error",
      error: error.message
    });
  }
};

export { downloadController, imageUploadController };

