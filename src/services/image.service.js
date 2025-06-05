
import Image from "../models/images.model.js";

export const uploadImage = async (req) => {
    try {
        const { name } = req.body;
        const image = req.file;

        if (!name || !image) {
            return {
                statusCode: 400,
                message: "Name and image are required.",
                data: null

            }
        }

        const newImage = await Image.create({
            name,
            image: image.path,
        });

        return {
            statusCode: 201,
            message: "Image uploaded successfully.",
            data: newImage
        }

    } catch (error) {
        console.log("error while uploading image", error);

        return {
            statusCode: 500,
            message: "server error",
            error: error.message
        }
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
                data: null
            }
        }

        return {
            statusCode: 200,
            message: "image found successfully",
            data: imageRecord.image
        }

        
    } catch (error) {
        console.log("server error", error);

        return {
            statusCode: 500,
            message: "server error",
            data: null
        }
    }
};


