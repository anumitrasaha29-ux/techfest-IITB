import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { geminiService } from '../services/geminiService';

const router = Router();

// POST /api/ideate/generate - Real AI Generation with Gemini
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { domain, powerEfficiency, torque, latency, userPrompt } = req.body;

    const result = await geminiService.generateConcept({
      domain: domain || 'Bionic Prosthetics',
      powerEfficiency: Number(powerEfficiency) || 92,
      torque: Number(torque) || 380,
      latency: Number(latency) || 0.24,
      userPrompt,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/ideate/concepts - List community ideated concepts
router.get('/concepts', (_req: Request, res: Response) => {
  try {
    const concepts = db.getConcepts();
    res.json({
      success: true,
      data: concepts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ideate/concepts - Submit a community concept
router.post('/concepts', (req: Request, res: Response) => {
  try {
    const { title, domain, description, torque, latency, compatibility, bomEstimate, thermalOutput, feasibility } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Concept title is required.' });
    }

    const created = db.addConcept({
      title,
      domain: domain || 'General Cybernetics',
      description: description || 'Community submitted cybernetic concept.',
      torque: Number(torque) || 300,
      latency: Number(latency) || 0.2,
      compatibility: Number(compatibility) || 95,
      status: 'Proposed',
      bomEstimate,
      thermalOutput,
      feasibility,
    });

    res.status(201).json({
      success: true,
      message: 'Concept added to registry.',
      data: created,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ideate/concepts/:id/vote - Upvote a concept
router.post('/concepts/:id/vote', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = db.voteConcept(id);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Concept not found.' });
    }

    res.json({
      success: true,
      message: 'Upvote recorded.',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
