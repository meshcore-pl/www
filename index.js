process.loadEnvFile();
const express = require('express');
const helmet = require('helmet');

// Routes
const PagesRouter = require('./routes/Pages.js');
const APIRouter = require('./routes/Api.js');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const RenderError = require('./utils/renderError.js');

// Create an Express app
const app = express();

// Configure the app
app.set('trust proxy', 1);
app.set('view engine', 'ejs');

// Use middlewares
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(express.static('public'));
app.use(logger);
if (process.env.NODE_ENV === 'production') app.use(limiter);
app.use(timeout());

app.use('/', PagesRouter);
app.use('/api/v1', APIRouter);


// Error handling
app.use((req, res) => RenderError(res, 404));
app.use((err, req, res, _next) => {
	console.error(err);
	RenderError(res, 500);
});

// Start the server
const { DOMAIN, PORT } = process.env;
app.listen(PORT, () => process.send ? process.send('ready') : console.log(`Server running at ${DOMAIN}:${PORT}`));
