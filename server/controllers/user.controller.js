import Session from "../models/session.model.js"
import User from "../models/user.model.js"
import verifyGeminiApiKey from "../services/validateApiKey.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { encrypt } from "../utils/secureApiKeys.js"
import { updateNameSchema, updatePasswordSchema } from "../validators/user.validator.js"

export const updateName = asyncHandler(async (req, res) => {
    const { error } = updateNameSchema.validate(req.body)
    if (error) {
        const cleanMessage = error.details[0].message.replace(/"/g, '');
        throw new apiError(400, cleanMessage);
    }

    const { name } = req.body

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found")
    }

    user.name = name;
    await user.save();
    apiResponse.success(res, "Name updated successfully", null, 200)
})

export const updatePassword = asyncHandler(async (req, res) => {
    const { error } = updatePasswordSchema.validate(req.body)
    if (error) {
        const cleanMessage = error.details[0].replace(/"/g, '')
        throw new apiError(400, cleanMessage)
    }
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found")
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new apiError(400, "Current password is incorrect")
    }
    user.password = newPassword
    await user.save();

    await Session.updateMany({ user: user._id }, { isValid: false })

    apiResponse.success(res, "Password updated successfully", null, 200)
})





export const addApiKey = asyncHandler(async (req, res) => {
    const { key } = req.body;

    if (!key) {
        throw new apiError(400, "API key is required in order to review the code.");
    }

    const user = await User.findById(req.user._id); 
    if (!user) {
        throw new apiError(404, "User not found.");
    }

    try {
        const isValid = await verifyGeminiApiKey(key);

        if (isValid) {
            const encryptedApiKey = encrypt(key);
            user.apiKey = encryptedApiKey;
            user.hasKey = true;
            await user.save();
            return apiResponse.success(res, "API key added successfully.");
        } else {
             throw new apiError(400, "Invalid API key. Please check and try again.");
        }
    } catch (err) {
        throw new apiError(400, "Invalid API key. Please check and try again. " + err.message);
    }
});

export const removeApiKey = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new apiError(404, "User not found")
    }

    user.apiKey = undefined
    user.hasKey = false
    await user.save()

    apiResponse.success(res, "Removed successfully.",)
})

