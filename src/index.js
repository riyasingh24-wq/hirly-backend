// import app from './src/app.js';
// app.listen(3000, () => console.log('Server running'));

import app from './app.js';

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});