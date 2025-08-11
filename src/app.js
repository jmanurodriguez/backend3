import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.get('/', (req, res) => {
    const style = `
        <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            p { color: #555; }
        </style>
    `;
    const content = `
        <h1>Welcome to the AdoptMe API</h1>
        <p>Use the endpoints to manage users, pets, adoptions, and sessions.</p>
    `;
    res.send(`${style}${content}`);
});

app.get('/health', (req, res) => {
    res.send({status:'ok'});
});

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/db_example?directConnection=true');
    } catch (err) {
        console.log('Mongo connection error:', err.message);
    }
    app.listen(PORT,()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};

if (process.env.NODE_ENV !== 'test') {
    start();
}

export default app;
