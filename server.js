const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const { connectDB } = require('./src/Database/db');
const routes = require('./src/Routes/allRoutes');
// const cronController = require('./src/Controllers/cronController'); // add when ready

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb", parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "100mb" }));

// ✅ Routes
app.use('/v1', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ DB connection
connectDB(app);

// ✅ Cron Jobs
const initCronJobs = () => {
  try {
    const dailyJob = cron.schedule('0 0 * * *', async () => {
      console.log('⏰ Daily cron ran at 00:00 hrs');
      // await cronController.deactivateUserCronJob();
      // await cronController.deleteLogFiles();
    });
    dailyJob.start();
  } catch (err) {
    console.error('❌ Error starting cron jobs', err);
  }
};

// ✅ Graceful Shutdown
const stopServer = () => {
  console.log('🚦 Starting graceful shutdown...');
  app.set('HEALTH_STATUS', 'SHUTTING_DOWN');
  setTimeout(() => {
    server.close(() => {
      console.log('✅ Shutdown Complete.');
      process.exit(0);
    });
  }, 3000);
};

// ✅ Server start
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', async (err) => {
  if (err) {
    app.set('HEALTH_STATUS', 'SERVER_LISTEN_FAILED');
    throw err;
  }
  console.log(`🚀 Server started on http://localhost:${PORT} [${NODE_ENV}]`);
  initCronJobs();
  app.set('HEALTH_STATUS', 'READY');
  console.log('✅ Initialization successful. Service is Ready.');
});

// ✅ Shutdown hooks
process.on('SIGTERM', stopServer);
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err.message, err.stack);
});
