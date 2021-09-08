import express from 'express';
import routes from './infrastructure/api';
import { DbConnect } from './infrastructure/persistence/DbConnect';
import { config } from 'dotenv';

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

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});