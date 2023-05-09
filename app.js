import express from 'express';
import mainRoutes from './routes/main.routes.js';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

app.use('/api', mainRoutes);

app.listen(PORT, () => console.log('Server is running on port :-', PORT));
