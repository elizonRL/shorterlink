
import config from './src/utils/config.js';
import app from './src/app.js';
const port = config.PORT;
import mongoose from 'mongoose'

// Connect to MongoDB
 
mongoose.connect(config.MONGODB_URI!)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 