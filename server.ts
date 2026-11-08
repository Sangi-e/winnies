import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent appointment storage in data directory
const DATA_DIR = path.resolve(__dirname, 'data');
const APPOINTMENTS_FILE = path.resolve(DATA_DIR, 'appointments.json');

// Ensure data storage directory and ledger file exist
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
} catch (err) {
  console.error('[Storage Init Error]:', err);
}

function getAppointmentsList(): any[] {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const content = fs.readFileSync(APPOINTMENTS_FILE, 'utf-8');
      return JSON.parse(content);
    }
    return [];
  } catch (err) {
    console.error('[Error reading appointments]:', err);
    return [];
  }
}

function saveAppointmentsList(list: any[]): boolean {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Error saving appointments]:', err);
    return false;
  }
}

// Valid public frontend routes in Winnie's Clinic application
export const VALID_FRONTEND_ROUTES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/book-consultation',
  '/book',
  '/booking',
];

// -------------------------------------------------------------
// POST /api/appointments — Receive new appointment request
// -------------------------------------------------------------
app.post('/api/appointments', (req, res) => {
  try {
    const {
      patientName,
      patientPhone,
      patientEmail,
      preferredDate,
      preferredTime,
      visitReason,
      additionalMessage,
    } = req.body;

    // Field 1: Patient Full Name (Required)
    if (!patientName || typeof patientName !== 'string' || patientName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter the patient’s full legal name.',
        field: 'patientName',
      });
    }

    // Field 2: Phone Number (Required)
    if (!patientPhone || typeof patientPhone !== 'string' || patientPhone.trim().length < 7) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid contact telephone number so the clinic can call or SMS you.',
        field: 'patientPhone',
      });
    }

    // Field 3: Email Address (Optional, but validated if provided)
    if (patientEmail && typeof patientEmail === 'string' && patientEmail.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(patientEmail.trim())) {
        return res.status(400).json({
          success: false,
          error: 'If provided, please enter a valid email address.',
          field: 'patientEmail',
        });
      }
    }

    // Field 4: Preferred Appointment Date (Required, cannot be past)
    if (!preferredDate || typeof preferredDate !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Please select a preferred appointment date.',
        field: 'preferredDate',
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (preferredDate < todayStr) {
      return res.status(400).json({
        success: false,
        error: 'The requested appointment date cannot be in the past. Please select today or a future date.',
        field: 'preferredDate',
      });
    }

    // Field 5: Preferred Appointment Time (Required)
    if (!preferredTime || typeof preferredTime !== 'string' || !preferredTime.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please select a preferred appointment time.',
        field: 'preferredTime',
      });
    }

    // Field 6: Reason for Visit / Medical Concern (Required)
    if (!visitReason || typeof visitReason !== 'string' || visitReason.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Please describe the reason for your visit or type of medical concern.',
        field: 'visitReason',
      });
    }

    // Generate unique verifiable reference number
    const uniqueHash = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceNumber = `WN-${new Date().getFullYear()}-${uniqueHash}`;

    const newRecord = {
      id: `apt_${Date.now()}_${uniqueHash}`,
      referenceNumber,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail && typeof patientEmail === 'string' && patientEmail.trim() ? patientEmail.trim() : null,
      preferredDate,
      preferredTime: preferredTime.trim(),
      visitReason: visitReason.trim(),
      additionalMessage: additionalMessage && typeof additionalMessage === 'string' && additionalMessage.trim() ? additionalMessage.trim() : null,
      status: 'awaiting_clinic_confirmation',
      submittedAt: new Date().toISOString(),
      facilityDetails: {
        name: "Winnie's Clinic",
        location: 'Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State',
        directLine: '+234-8037-3927-30',
        emergencyHotline: '+234-8037-3927-30',
      },
    };

    // Save to clinic records
    const list = getAppointmentsList();
    list.unshift(newRecord);
    saveAppointmentsList(list);

    // Formatted delivery dispatch for clinic reception desk
    console.log(`\n================================================================`);
    console.log(`[WINNIE'S CLINIC — NEW APPOINTMENT REQUEST RECEIVED]`);
    console.log(`Reference No:    ${referenceNumber}`);
    console.log(`Patient Name:    ${newRecord.patientName}`);
    console.log(`Contact Phone:   ${newRecord.patientPhone}`);
    if (newRecord.patientEmail) {
      console.log(`Contact Email:   ${newRecord.patientEmail}`);
    }
    console.log(`Requested Date:  ${newRecord.preferredDate}`);
    console.log(`Requested Time:  ${newRecord.preferredTime}`);
    console.log(`Medical Concern: ${newRecord.visitReason}`);
    if (newRecord.additionalMessage) {
      console.log(`Notes / Message: ${newRecord.additionalMessage}`);
    }
    console.log(`Status:          AWAITING CLINIC REVIEW & DIRECT TELEPHONE CONFIRMATION`);
    console.log(`Delivered At:    ${newRecord.submittedAt}`);
    console.log(`================================================================\n`);

    return res.status(201).json({
      success: true,
      referenceNumber,
      status: 'awaiting_clinic_confirmation',
      message: 'Your appointment request has been securely delivered to Winnie’s Clinic. Our clinical desk will review schedule availability and call or SMS your provided phone number to confirm your booking.',
      appointment: newRecord,
    });
  } catch (err: any) {
    console.error('[Appointment Submission Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your request. Please try again or call the clinic directly at +234-8037-3927-30.',
    });
  }
});

// -------------------------------------------------------------
// GET /api/appointments — Review submitted appointment requests
// -------------------------------------------------------------
app.get('/api/appointments', (_req, res) => {
  const list = getAppointmentsList();
  res.json({
    success: true,
    count: list.length,
    appointments: list,
  });
});

// -------------------------------------------------------------
// GET /api/health — System health check
// -------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    clinic: "Winnie's Clinic",
    location: 'Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State',
    phone: '+234-8037-3927-30',
    backendStatus: 'active',
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// Dev & Prod Server Lifecycle with Robust Route Handling
// -------------------------------------------------------------
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const distDir = path.resolve(__dirname, 'dist');
  const indexHtmlPath = path.resolve(distDir, 'index.html');

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // 1. Serve static assets from dist folder with MIME recognition
    app.use(express.static(distDir, { index: false }));

    // 2. Explicitly serve index.html for root route
    app.get('/', (_req, res) => {
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.sendFile(indexHtmlPath);
    });

    // 3. Explicitly serve index.html for all valid frontend routes with HTTP 200
    VALID_FRONTEND_ROUTES.forEach((route) => {
      if (route === '/') return;
      app.get([route, `${route}/`], (_req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.sendFile(indexHtmlPath);
      });
    });
  }

  // 4. Preserve API routes: return JSON 404 for any unhandled /api/* call
  app.all('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: `API route not found: ${req.method} ${req.originalUrl}`,
      status: 404,
    });
  });

  // 5. Genuinely missing routes: return proper HTTP 404 status
  app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      if (fs.existsSync(indexHtmlPath)) {
        res.sendFile(indexHtmlPath);
      } else {
        res.send('<!doctype html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested URL was not found on this server.</p></body></html>');
      }
    } else if (req.accepts('json')) {
      res.json({ success: false, error: 'Resource not found', status: 404 });
    } else {
      res.type('txt').send('404 Not Found');
    }
  });

  // 6. Hostinger Node.js Port & Unix Domain Socket handling
  const isSocket = typeof PORT === 'string' && (PORT.startsWith('/') || PORT.startsWith('\\\\.\\pipe\\'));

  if (isSocket) {
    app.listen(PORT, () => {
      console.log(`[Winnie's Clinic Server] Listening on Unix socket: ${PORT} (mode: ${isDev ? 'development' : 'production'})`);
    });
  } else {
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`[Winnie's Clinic Server] Listening on http://0.0.0.0:${PORT} (mode: ${isDev ? 'development' : 'production'})`);
    });
  }
}

startServer();
