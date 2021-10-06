import express from 'express';
import routes from './infrastructure/api';
import { DbConnect } from './infrastructure/persistence/DbConnect';
import config from '../config';
import cors from "cors"
import path from "path";

const app = express();
const resolve = path.resolve;

const port = config.PORT

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept, Authorization"),
    next()
})

app.use(express.static(config.STATIC_DIR));
DbConnect.connect()
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/webhook')) {
      next();
    } else {
      express.json()(req, res, next);
    }
});

/*app.get("/", (_: express.Request, res: express.Response): void => {
    // Serve checkout page.
    console.log("page checkout")
    const indexPath = resolve(config.STATIC_DIR + "/index.html");
    res.sendFile(indexPath);
});*/

app.get("/config", (_: express.Request, res: express.Response): void => {
    // Serve checkout page.
    res.send({publishableKey: config.STRIPE_PUBLIC_KEY});
});

app.use(cors({origin: "*"}))

app.use(routes);

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});