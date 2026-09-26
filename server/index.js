import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors()); app.use(express.json());
app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'folio' }));
app.post('/api/stories', (req, res) => res.status(201).json({ ...req.body, publishedAt: new Date().toISOString() }));
if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, '../build'))); app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../build/index.html'))); }
app.listen(port, () => console.log(`Folio API running on port ${port}`));
