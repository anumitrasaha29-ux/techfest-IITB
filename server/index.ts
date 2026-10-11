import { createApp } from './app';
import { config } from './config';

const app = createApp();

const server = app.listen(config.port, config.host, () => {
  console.log(`
======================================================
  CYBORG FRONTIER - BACKEND API SERVER ONLINE
======================================================
  Port:        ${config.port}
  Host:        ${config.host}
  Health:      http://localhost:${config.port}/api/health
  API Stats:   http://localhost:${config.port}/api/stats
  Gemini AI:   ${config.geminiApiKey ? 'Enabled (API Key Detected)' : 'Fallback Heuristics Mode'}
======================================================
  `);
});

process.on('SIGTERM', () => {
  console.log('[CYBORG SERVER] Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

export default app;
