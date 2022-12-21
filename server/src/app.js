import express from 'express';
import path from 'path';
import cors from 'cors';
import { existsSync } from 'fs';
import { getDirectories, getFileNames, updateJson } from './service/file.js';
import { expressionStatement } from '@babel/types';

const app = express();

let dirname = path.dirname(import.meta.url);
dirname = (process.platform === 'win32') ? dirname.replace('file:///', '') : dirname.replace('file://', '');
const LOCALES_SOURCE = path.resolve(dirname, '../../locales/');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('template/home.html', { root: dirname });
})

app.get('/api', (req, res) => {
  res.send('Nothing to see here, move along please...')
})

app.get('/api/application', async (req, res) => {
  const list = await getDirectories(LOCALES_SOURCE);
  res.json({ applicationList: list });
});

app.get('/api/application/:appname', async (req, res) => {
  const source = path.join(LOCALES_SOURCE, req.params.appname);
  if (existsSync(source)) {
    const list = (await getFileNames(source)).map((name) => name.replace('\.json', ''));
    res.json({ languages: list });
  } else {
    res.status(404).json({ error: 'application does not exist' });
  }
});

app.get('/api/application/:appname/:language', async (req, res) => {
  const source = path.join(LOCALES_SOURCE, req.params.appname, `${req.params.language}.json`);
  if (existsSync(source)) {
    res.sendFile(source);
  } else {
    res.status(404).json({ error: 'application/language combination does not exist' });
  }
});

app.put('/api/application/:appname/:language', async (req, res) => {
  const source = path.join(LOCALES_SOURCE, req.params.appname, `${req.params.language}.json`);
  if (existsSync(source)) {
    const result = updateJson(source, JSON.stringify(req.body));
    res.status(result ? 200 : 500).json({ 'success': result, error: !result });
  } else {
    res.status(404).json({ error: 'application/language combination does not exist' });
  }
});

export { app };
