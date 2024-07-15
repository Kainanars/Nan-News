import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do engine de renderização ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Configuração dos diretórios estáticos e de views
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Rota Home
app.get('/', (req, res) => {
    const busca = req.query.busca;

    if (!busca) {
        res.render('index');
    } else {
        res.send(`Você buscou: ${busca}`);
    }
});


// Slug texto amigavel, invés de usar id
app.get('/:slug', (req, res) => {
    req.res(req.params.slug);
})

// Start servidor
app.listen(3000, () => {
    log('Servidor rodando na porta 3000');
});
