import { Router, Request, Response } from 'express';
import { db } from '../db/store';

const router = Router();

// GET /api/telemetry/live - Real-time cybernetic vital statistics
router.get('/live', (_req: Request, res: Response) => {
  try {
    // Generate realistic fluctuating telemetry
    const jitter = (val: number, variance: number) => {
      return Number((val + (Math.random() * variance * 2 - variance)).toFixed(2));
    };

    const liveData = {
      timestamp: new Date().toISOString(),
      neuralSync: jitter(99.4, 0.4),
      coreTemp: jitter(41.2, 0.8), // Celsius
      hydraulicPressure: Math.floor(jitter(310, 15)), // bar
      powerDraw: jitter(18.4, 1.2), // kW
      servosActive: 64,
      reactionLatency: jitter(0.18, 0.04), // ms
      chassisIntegrity: 99.8,
      status: 'OPTIMAL_FLIGHT_READY',
      systems: {
        gyroscopeGimbals: 'ONLINE',
        quantumCore: 'SYNCHRONIZED',
        myoelectricActuators: 'CALIBRATED',
        opticalLiDAR: 'ACTIVE',
      },
    };

    db.recordTelemetry({
      timestamp: liveData.timestamp,
      neuralSync: liveData.neuralSync,
      coreTemp: liveData.coreTemp,
      hydraulicPressure: liveData.hydraulicPressure,
      activeMode: liveData.status,
    });

    res.json({
      success: true,
      data: liveData,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/telemetry/history - Recent telemetry readings
router.get('/history', (_req: Request, res: Response) => {
  try {
    const history = db.getRecentTelemetry();
    res.json({
      success: true,
      data: history,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/telemetry/checkpoint - Record Task 3 Parallax depth checkpoint
router.post('/checkpoint', (req: Request, res: Response) => {
  try {
    const { elevation, chapter, timestamp } = req.body;
    res.json({
      success: true,
      message: 'Checkpoint logged in flight recorder.',
      checkpoint: {
        elevation: elevation || 0,
        chapter: chapter || 'Atmospheric Entry',
        recordedAt: timestamp || new Date().toISOString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
