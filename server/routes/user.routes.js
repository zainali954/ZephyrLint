import express from 'express'
import protect from '../middlewares/protect.js';
import { addApiKey, removeApiKey, updateName, updatePassword } from '../controllers/user.controller.js';
const router = express.Router()

router.patch('/update-name', protect, updateName);
router.patch('/update-password', protect, updatePassword);
router.post('/add-api-key', protect, addApiKey)
router.delete('/remove-api-key', protect, removeApiKey)

export default router;