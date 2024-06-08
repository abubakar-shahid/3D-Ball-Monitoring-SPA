import express from 'express';
import router from './routes.js';

const app = express();

app.use(express.json());

app.use("/api/ball-tracker", router);

const PORT = 8080;
app.listen(PORT, () => { console.log(`server is running at port: ${PORT}`); });