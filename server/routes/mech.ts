import { Router, Request, Response } from 'express';
import { db } from '../db/store';

const router = Router();

// GET /api/mech/presets - List saved 3D mech configurations
router.get('/presets', (_req: Request, res: Response) => {
  try {
    const presets = db.getMechPresets();
    res.json({
      success: true,
      data: presets,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/mech/presets - Save a custom 3D mech configuration
router.post('/presets', (req: Request, res: Response) => {
  try {
    const { name, materialPreset, explodedPercent, subsystems, wireframe } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Configuration name is required.' });
    }

    const saved = db.saveMechPreset({
      name,
      materialPreset: materialPreset || 'titanium',
      explodedPercent: typeof explodedPercent === 'number' ? explodedPercent : 0,
      subsystems: subsystems || {
        armorShell: true,
        gimbalRings: true,
        quantumCore: true,
        hydraulicPistons: true,
        coolingFins: true,
        particleOrbit: true,
      },
      wireframe: !!wireframe,
    });

    res.status(201).json({
      success: true,
      message: 'Mech configuration saved successfully.',
      data: saved,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
