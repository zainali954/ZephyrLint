import express from 'express';
const router = express.Router()
import { review , getReviewById, deleteReviewById, updateReviewById, getAllUserReviews, updateReviewTitle} from '../controllers/ai.controller.js';
import protect from '../middlewares/protect.js';

router.post("/", protect, review)
router.get("/", protect, getAllUserReviews)
router.get('/review/:id', getReviewById)
router.put("/review/:id", protect, updateReviewById)
router.patch('/review/:id', protect, updateReviewTitle)
router.delete('/review/:id', protect, deleteReviewById)

export default router;