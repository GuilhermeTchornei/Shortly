import express from 'express';
import cors from 'cors';
import SignupRouter from './Routes/Signup.routes.js';
import SigninRouter from './Routes/Signin.routes.js';
import urlRouter from './Routes/Url.routes.js';
import userRouter from './Routes/User.routes.js';
import rankingRouter from './Routes/Ranking.routes.js';
import env from 'dotenv';

env.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use([SignupRouter, SigninRouter, urlRouter, userRouter, rankingRouter]);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));