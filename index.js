process.loadEnvFile();
const express = require('express');
const helmet = require('helmet');
const { DOMAIN, NODE_ENV, PORT } = process.env;
const isProd = NODE_ENV === 'production';

// Routes
const PagesRouter = require('./routes/Pages.js');
const DocsRouter = require('./routes/Docs.js');
const APIRouter = require('./routes/Api.js');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const RenderError = require('./utils/renderError.js');

// Create an Express app
const app = express();

// Configure the app
if (isProd) app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.locals.domain = DOMAIN;

// Use middlewares
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(express.static('public'));
app.use(logger);
if (isProd) app.use(limiter);
app.use(timeout());

app.use('/', PagesRouter);
app.use('/', DocsRouter);
app.use('/api/v1', APIRouter);

// Error handling
app.use((req, res) => RenderError(res, 404));
app.use((err, req, res, _next) => RenderError(res, 500, err));

// Start the server
app.listen(PORT, () => process.send ? process.send('ready') : console.log(`Server running at ${DOMAIN}:${PORT}`));
