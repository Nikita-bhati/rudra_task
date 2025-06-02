import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
)

const Image = mongoose.model("Images", imageSchema, "images");

export default Image;