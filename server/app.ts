import express, { Express, Request, Response, NextFunction } from 'express';
import { config } from './config';
import inquiriesRouter from './routes/inquiries';
import ideateRouter from './routes/ideate';
import mechRouter from './routes/mech';
import telemetryRouter from './routes/telemetry';
import statsRouter from './routes/stats';

export function createApp(): Express {
  const app: Express = express();

  // Standard middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS middleware (Dependency-free & universally compatible)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', config.corsOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Request logger in development
  app.use((req: Request, _res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[CYBORG API] ${timestamp} ${req.method} ${req.path}`);
    next();
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Cyborg Frontier API Server',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    });
  });

  // Mount API modular routers
  app.use('/api/stats', statsRouter);
  app.use('/api/inquiries', inquiriesRouter);
  app.use('/api/ideate', ideateRouter);
  app.use('/api/mech', mechRouter);
  app.use('/api/telemetry', telemetryRouter);

  // 404 handler for API routes
  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'API route not found on Cyborg Frontier server.',
    });
  });

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[CYBORG API ERROR]', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error occurred.',
    });
  });

  return app;
}
