
import config from './src/utils/config.js';
import app from './src/app.js';
const port = config.PORT;

// Connect to MongoDB
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 