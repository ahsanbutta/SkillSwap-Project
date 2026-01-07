import express from 'express';
import { getAllUsers, getUserById, updateProfile, deleteUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.put('/profile', protect, updateProfile);
router.get('/:id', getUserById);
router.delete('/:id', protect, deleteUser);

export default router;
