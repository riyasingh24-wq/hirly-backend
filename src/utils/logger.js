import fs from 'fs';
import path from 'path';

const logsPath = path.resolve('logs');
const logFile = path.join(logsPath, 'ai_logs.json');

// Ensure logs directory exists
if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}

// Append a log to ai_logs.json
export const logAIAction = (logData) => {
  const entry = {
    timestamp: new Date().toISOString(),
    ...logData,
  };

  const currentLogs = fs.existsSync(logFile)
    ? JSON.parse(fs.readFileSync(logFile))
    : [];

  currentLogs.push(entry);

  fs.writeFileSync(logFile, JSON.stringify(currentLogs, null, 2));
};
