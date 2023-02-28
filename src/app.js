import express from 'express';
import cors from 'cors';
import SignupRouter from './Routes/Signup.routes.js';
import SigninRouter from './Routes/Signin.routes.js';
import urlRouter from './Routes/Url.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use([SignupRouter, SigninRouter, urlRouter]);

app.listen(5000, () => console.log("Server connected"));