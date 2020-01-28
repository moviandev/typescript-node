import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import { Messenger } from './src/controllers/createMessage';

const app = express();
const PORT: number = 3000;
const atlasUser: string = 'movian';
const atlasPassowrd: string = 'datatest';

let messages = new Messenger(3000);

const dataConnection = (user: string, password: string): string => {
  return `mongodb://${user}:${password}@linkedinproject-shard-00-00-8w1w5.mongodb.net:27017,linkedinproject-shard-00-01-8w1w5.mongodb.net:27017,linkedinproject-shard-00-02-8w1w5.mongodb.net:27017/test?ssl=true&replicaSet=linkedinProject-shard-0&authSource=admin&retryWrites=true&w=majority`;
};

const db: string = dataConnection(atlasUser, atlasPassowrd);

// mongoose connection
mongoose.connect(db, {
  useMongoClient: true,
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => res.send(messages.messagePrint()));

app.listen(PORT, () => console.log(messages.messagePrint()));
