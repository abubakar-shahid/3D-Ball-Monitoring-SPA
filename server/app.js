import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ball-tracker", router);

const PORT = 8080;
app.listen(PORT, () => { console.log(`server is running at port: ${PORT}`); });
