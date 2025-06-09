import path from "path";
import Image from "../models/images.model.js";

export const uploadImage = async (req) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name || !image) {
      return {
        statusCode: 400,
        message: "Name and image are required.",
        data: null,
      };
    }

    // Validate file type (example for images)
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(image.originalname).toLowerCase();
    if (!validExtensions.includes(ext)) {
      return {
        statusCode: 400,
        message: "Invalid file type. Only images are allowed.",
        data: null,
      };
    }

    // Store consistent path
    const relativeImagePath = path.posix.join('uploads', path.basename(image.path));

    const newImage = await Image.create({
      name,
      image: relativeImagePath,
    });

    return {
      statusCode: 201,
      message: "Image uploaded successfully.",
      data: newImage,
    };
  } catch (error) {
    console.error("Error while uploading image", error);
    return {
      statusCode: 500,
      message: "Server error",
      error: error.message,
    };
  }
};

export const getImageByName = async (req) => {
  try {
    const { name } = req.params;
    const imageRecord = await Image.findOne({ name });

    if (!imageRecord) {
      return {
        statusCode: 404,
        message: "Image not found",
        data: null,
      };
    }

    // Ensure consistent forward slashes
    const imageUrl = imageRecord.image.replace(/\\/g, '/');

    return {
      statusCode: 200,
      message: "Image found successfully",
      data: {
        url: imageUrl,
        name: imageRecord.name,
        // Add additional metadata if needed
        size: imageRecord.size,
        createdAt: imageRecord.createdAt
      },
    };
  } catch (error) {
    console.error("Server error", error);
    return {
      statusCode: 500,
      message: "Server error",
      data: null,
      error: error.message // Include error message for debugging
    };
  }
};