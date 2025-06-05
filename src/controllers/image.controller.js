import path from "path";
import { getImageByName, uploadImage } from "../services/image.service.js";

const imageUploadController = async (req, res) => {
    const result = await uploadImage(req);
    res.status(result.statusCode).json(result);
}

const downloadController = async (req, res) => {
    const result = await getImageByName(req);
    if (result.statusCode == 200) {
        res.sendFile(path.resolve(result.data));
    }
    else {
        res.status(result.statusCode).json(result);
    }
}

export { downloadController, imageUploadController };
