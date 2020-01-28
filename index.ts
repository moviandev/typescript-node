import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import { Messenger } from './src/controllers/createMessage';
import { Settings } from './settings';

const app = express();
const PORT: number = Settings.PORT;
const atlasUser: string = Settings.atlasUser;
const atlasPassowrd: string = Settings.atlasPass;

let messages = new Messenger(Settings.PORT);

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

// generics

function nameCreator<T>(name: T): T {
  return name;
}

let myName = nameCreator<string>('Matheus');

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => res.send(messages.messagePrint()));

app.listen(PORT, () => console.log(myName, messages.messagePrint()));
