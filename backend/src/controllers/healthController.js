// HEALTH CHECK
// GET /healthz
export const healthCheckController = (req, res) => {
  const healthInfo = {
    ok: true,
    version: '1.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };

  return res.status(200).json(healthInfo);
};
