import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { config } from '../config';

const router = Router();

// GET /api/stats - Aggregate stats for the 4-in-1 Showcase Hub
router.get('/', (_req: Request, res: Response) => {
  try {
    const inquiries = db.getInquiries();
    const presets = db.getMechPresets();
    const concepts = db.getConcepts();

    const totalUpvotes = concepts.reduce((acc, c) => acc + (c.upvotes || 0), 0);

    res.json({
      success: true,
      data: {
        totalInquiries: inquiries.length,
        totalMechPresets: presets.length,
        totalConcepts: concepts.length,
        totalConceptVotes: totalUpvotes,
        aiEngine: {
          provider: 'Google Gemini',
          model: 'gemini-2.5-flash',
          configured: !!config.geminiApiKey,
          status: config.geminiApiKey ? 'CONNECTED' : 'HEURISTIC_MODE',
        },
        systemStatus: 'OPERATIONAL',
        serverUptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
