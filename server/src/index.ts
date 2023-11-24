import express,{Application} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';

import mongoose from 'mongoose';
import mongoConfig from './config/dbConnect';

dotenv.config();
mongoose.connect(mongoConfig.url, mongoConfig.configs);

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    resave: false,
    secret: "somesessionsecrets",
    saveUninitialized: true
}));

const PORT = process.env.PORT || 8080;

import userRouter from './routers/userRoutes';
import employeeRouter from './routers/employeeRoutes';
app.use('/api/users', userRouter);
app.use('/api/employees', employeeRouter);
app.listen(PORT, ()=>console.log(`server started on http://localhost:${PORT}`));