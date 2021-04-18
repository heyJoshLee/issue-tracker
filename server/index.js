import express from'express';
import bodyParser from'body-parser';
import mongoose from'mongoose';
import cors from'cors';

import organizationRoutes from './routes/organizations.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extend: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extend: true }))
app.use(cors());
app.use('/organizations', organizationRoutes)
const CONNECTION_URL = 'mongodb+srv://josh:josh123@cluster0.oiceh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }))
  .catch((error) => console.log(error.message));
  
  mongoose.set('useFindAndModify', false);