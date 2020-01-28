import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://movian:datatest@linkedinproject-shard-00-00-8w1w5.mongodb.net:27017,linkedinproject-shard-00-01-8w1w5.mongodb.net:27017,linkedinproject-shard-00-02-8w1w5.mongodb.net:27017/test?ssl=true&replicaSet=linkedinProject-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useMongoClient: true,
  },
);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`),
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
