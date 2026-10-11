import { Router, Request, Response } from 'express';
import { db } from '../db/store';

const router = Router();

// GET /api/inquiries - Retrieve all submitted clinical inquiries
router.get('/', (_req: Request, res: Response) => {
  try {
    const inquiries = db.getInquiries();
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/inquiries - Submit a new inquiry from Task 1 Landing page
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, organization, tier, selectedFinish, sensorColor, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields.',
      });
    }

    const newInquiry = db.addInquiry({
      name,
      email,
      organization: organization || 'Independent Researcher',
      tier: tier || 'Clinical Research',
      selectedFinish,
      sensorColor,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Clinical inquiry registered successfully.',
      data: newInquiry,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
