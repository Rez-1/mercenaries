import express from 'express';
import path from 'path';
import cors from 'cors';
import { existsSync } from 'fs';
import { getDirectories, getFileNames } from './service/file.js';

const app = express();
const dirname = (path.dirname(import.meta.url)).replace('file:///', '');
const LOCALES_SOURCE = path.resolve(dirname, '../../locales/');
app.use(cors());

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
    res.status(404).json({error: 'application does not exist'});
  }
});

app.get('/api/application/:appname/:language', async (req, res) => {
  const source = path.join(LOCALES_SOURCE, req.params.appname, `${req.params.language}.json`);
  if (existsSync(source)) {
    res.sendFile(source);
  } else {
    res.status(404).json({error: 'application/language combination does not exist'});
  }
});

app.put('/api/application/:appname/:language', async (req, res) => {
  const source = path.join(LOCALES_SOURCE, req.params.appname, `${req.params.language}.json`);
  if (existsSync(source)) {
    res.sendFile(source);
  } else {
    res.status(404).json({error: 'application/language combination does not exist'});
  }
});

export { app };
