import mongoose from "mongoose";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import aiService from "../services/ai.service.js";
import User from "../models/user.model.js";
import { decrypt } from "../utils/secureApiKeys.js";
import ReviewHistory from "../models/reviewHistory.model.js";

export const review = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { title, language, mode } = req.body

    if (!user) {
        throw new apiError(404, "User not found")
    }

    if (!user.hasKey) {
        throw new apiError(403, "To use this feature, please add your Gemini API key. This key allows us to securely perform AI-powered code reviews on your behalf.")

    }
    if (!user || !user.apiKey) {
        throw new apiError(404, "No API key found. Please add one.");
    }

    // Decrypt the API key
    const decryptedApiKey = decrypt(user.apiKey);
    const code = req.body.code
    if (!code) {
        throw new apiError(400, "Oops! Looks like the editor is empty. You need to enter code to generate a review.")
    }

    try {
        const response = await aiService(code, decryptedApiKey, mode);

        //  Important: Check for errors from the AI service.  aiService could return null, undefined, or an object with an error property.
        if (!response) {
            throw new apiError(500, 'AI service unavailable or returned an empty response.');
        }

        // Example: Checking for an error property in the response from the AI service.
        if (response.error) {
            console.error("AI Service Error:", response.error); // Log the AI service error for debugging.
            throw new apiError(500, `AI service encountered an error: ${response.error}`);
        }


        const newSession = await ReviewHistory.create({
            user: req.user._id,
            title: title || "Code review",
            code,
            language,
            review: response,
            mode,
            timestamp: Date.now()
        })

        apiResponse.success(res, 'Success', { response, newSession }, 200);
    } catch (error) {
        // Handle errors from the AI service. This is crucial!
        console.error("Error in review endpoint:", error); // Log the error for debugging.

        //  Re-throw the error if it's already an apiError so the global error handler can deal with it.
        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(500, 'Failed to generate code review. Please try again later.'); // Generic error message for the user.
    }
})

export const getReviewById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new apiError(400, "id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid review ID");
  }

  const review = await ReviewHistory.findById(id);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  apiResponse.success(res, "Fetched review", review, 200);
});

export const deleteReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new apiError(400, "Review ID is required");
    }

    const review = await ReviewHistory.findById(id);

    if (!review) {
        throw new apiError(404, "Review not found");
    }

    if (String(review.user) !== String(req.user._id)) {
        throw new apiError(403, "You don't have permission to delete this review");
    }

    await review.deleteOne(); 

    return apiResponse.success(res, "Review deleted successfully");
});


export const updateReviewById = async (req, res) => {
    const reviewId = req.params.id;
    const { title, language, mode } = req.body
    const user = await User.findById(req.user._id)


    if (!user.hasKey) {
        throw new apiError(403, "To use this feature, please add your Gemini API key. This key allows us to securely perform AI-powered code reviews on your behalf.")

    }
    if (!user || !user.apiKey) {
        throw new apiError(404, "No API key found. Please add one.");
    }


    const review = await ReviewHistory.findById(reviewId);
    if (!review) throw new apiError(404, "Review not found");

    if (!review.user.equals(user._id)) {
        throw new apiError(403, "Not authorized to update this review");
    }


    // Decrypt the API key
    const decryptedApiKey = decrypt(user.apiKey);
    const code = req.body.code
    if (!code) {
        throw new apiError(400, "Oops! Looks like the editor is empty. You need to enter code to generate a review.")
    }

    try {
        const response = await aiService(code, decryptedApiKey, mode);

        //  Important: Check for errors from the AI service.  aiService could return null, undefined, or an object with an error property.
        if (!response) {
            throw new apiError(500, 'AI service unavailable or returned an empty response.');
        }

        // Example: Checking for an error property in the response from the AI service.
        if (response.error) {
            console.error("AI Service Error:", response.error); // Log the AI service error for debugging.
            throw new apiError(500, `AI service encountered an error: ${response.error}`);
        }


        // update logic
        review.code = code;
        review.mode = mode;
        review.language = language;
        review.title = title;
        review.review = response;
        review.timestamp = Date.now()
        await review.save();

        apiResponse.success(res, 'Success', {review, response}, 200);
    } catch (error) {
        // Handle errors from the AI service. This is crucial!
        console.error("Error in review endpoint:", error); // Log the error for debugging.

        //  Re-throw the error if it's already an apiError so the global error handler can deal with it.
        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(500, 'Failed to generate code review. Please try again later.'); // Generic error message for the user.
    }
};

export const getAllUserReviews = async (req, res) => {
  try {

    const reviews = await ReviewHistory.find({ user: req.user._id })
      .select("_id title") 
      .sort({ updatedAt: -1 }); 

    apiResponse.success(res, "Review sessions fetched successfully", reviews, 200);
  } catch (error) {
    console.error("Error fetching review sessions:", error);
    throw new apiError(500, "Failed to fetch reviews");
  }
};

export const updateReviewTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {title} = req.body;

  if (!id) {
    throw new apiError(400, "id is required");
  }
  if (!title) {
    throw new apiError(400, "title is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid review ID");
  }

  const review = await ReviewHistory.findById(id);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  review.title = title;
  review.timestamp = Date.now()

  await review.save()
  apiResponse.success(res, "Updated", {title: review.title}, 200);
});