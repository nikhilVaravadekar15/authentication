
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express';
import router from './src/routes/router';


const CORS: CorsOptions = {
    origin: [process.env.CORS_ORIGIN! || "*"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT!)


// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors(CORS))

// HTTP request logger middleware [https://www.npmjs.com/package/morgan]
app.use(morgan("tiny"))

// body parsing middleware [https://expressjs.com/en/4x/api.html#express.json]
app.use(express.json())

// load routers 
app.use("/", router)


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
