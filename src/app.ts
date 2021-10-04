import express from 'express';
import routes from './infrastructure/api';
import { DbConnect } from './infrastructure/persistence/DbConnect';
import { config } from 'dotenv';
import cors from "cors"

const app = express();
config()

const port = process.env["PORT"]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept, Authorization"),
    next()
})

DbConnect.connect()
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/webhook')) {
      next();
    } else {
      express.json()(req, res, next);
    }
});

app.use(cors({origin: "*"}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(routes);

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});