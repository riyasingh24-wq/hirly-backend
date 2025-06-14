// ✅ server.js
import app from './src/app.js'; // default import

import dotenv from 'dotenv';
dotenv.config();

// Add uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1); // Exit with a failure code
});

// Add unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit with a failure code
});

const PORT = process.env.PORT || 3000;

console.log("Attempting to start server..."); // Added for debugging
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
