'use server'

import { writeClient } from "@/sanity/lib/write";

export const fileUpload = async (file) => {

    console.log("File : ", file)

    try {
        const uploadedImage = await writeClient.assets.upload('image', file); // Upload the image
        return {
            _key: uploadedImage._id,
            _type: "image",
            asset: {
                _type: "reference",
                _ref: uploadedImage._id // Returns the reference to the uploaded image asset
            }
        };
        
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
}