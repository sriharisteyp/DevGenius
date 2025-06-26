import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getUsers } from './src/controllers/userController.js';
import authRoutes from './src/routes/auth.js';
import planRoutes from './src/routes/planRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import creditRoutes from './src/routes/creditRoutes.js';

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('Required environment variables are missing!');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:8080', 'https://dev-genius-beta.vercel.app/' ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Preflight OPTIONS handler
app.options('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:8080', 'https://dev-genius-beta.vercel.app/'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

let cachedUsers = [];

// Preload users
(async () => {
  try {
    cachedUsers = await getUsers();
  } catch (error) {
    console.error('Error loading users:', error);
  }
})();

// Root route handler with "secret place" feature
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>⚠️ RESTRICTED AREA ⚠️</title>
        <style>
          body {
            font-family: "Courier New", Courier, monospace;
            background-color: black;
            color: red;
            text-align: center;
            padding: 50px;
            margin: 0;
          }
          h1 {
            font-size: 65px;
            text-transform: uppercase;
            margin-bottom: 30px;
            color: #ff0000;
            text-shadow: 3px 3px 10px red;
          }
          h2 {
            font-size: 50px;
            color: yellow;
            margin-bottom: 20px;
          }
          p {
            font-size: 24px;
            line-height: 1.8;
          }
          .warning {
            background: yellow;
            color: black;
            font-weight: bold;
            display: inline-block;
            padding: 15px 25px;
            border: 5px solid red;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 20px;
            animation: blink 1s infinite;
          }
          .ip-address {
            color: cyan;
            font-size: 20px;
            margin-top: 15px;
          }
          footer {
            margin-top: 50px;
            font-size: 16px;
            color: #555;
          }
          #hidden-login {
            display: none;
            margin-top: 30px;
            animation: fadeIn 2s ease-in;
          }
          form {
            background: #222;
            padding: 20px;
            border-radius: 8px;
            color: white;
            text-align: left;
          }
          label {
            display: block;
            margin-top: 10px;
          }
          input {
            margin-top: 5px;
            padding: 10px;
            width: 100%;
            border: 1px solid #444;
            border-radius: 5px;
          }
          input[type="submit"] {
            background: green;
            color: white;
            border: none;
            cursor: pointer;
            margin-top: 10px;
          }
          .secret {
            font-size: 18px;
            color: cyan;
            text-decoration: underline;
            cursor: pointer;
          }
          @keyframes blink {
            0%, 100% { background: yellow; }
            50% { background: red; color: yellow; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <h1>⚠️ Unauthorized Access Detected ⚠️</h1>
        <h2>THIS AREA IS RESTRICTED</h2>
        <p>Unauthorized attempts are being <strong>tracked and logged</strong>.</p>
        <p>Your IP address:</p>
        <p class="ip-address"><strong>${req.ip}</strong></p>
        <p class="warning">Proceeding further is strictly forbidden!</p>
        <p><span class="secret" onclick="revealSecret()">⚠️⚠️</span></p>
        <div id="hidden-login">
          <form method="POST" action="/">
            <h2>DANGER</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <input type="submit" value="Login" />
          </form>
        </div>
        <script>
          function revealSecret() {
            document.getElementById('hidden-login').style.display = 'block';
          }
        </script>
      </body>
    </html>
  `);
});

// Handle login form submission
app.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    res.send(`
      <html>
        <head>
          <title>Admin Panel</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid #ddd;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            th {
              background: #007BFF;
              color: white;
            }
            h1 {
              text-align: center;
              color: #333;
            }
          </style>
        </head>
        <body>
          <h1>Admin Panel</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${cachedUsers.map(user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p><a href="/">Logout</a></p>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <head>
          <title>🚨 WARNING 🚨</title>
          <style>
            body {
              font-family: "Courier New", monospace;
              background: black;
              color: red;
              text-align: center;
              padding: 50px;
              animation: shake 0.5s infinite;
            }
            h1 {
              font-size: 70px;
              text-shadow: 0 0 10px red, 0 0 20px yellow;
            }
            p {
              font-size: 30px;
              margin: 20px 0;
            }
            .alert {
              color: yellow;
              background: red;
              padding: 20px;
              font-size: 25px;
              border: 3px dashed white;
              animation: blink 1s infinite;
            }
            .emojis {
              font-size: 50px;
              margin: 20px 0;
            }
            @keyframes blink {
              0%, 100% { background: red; color: yellow; }
              50% { background: yellow; color: red; }
            }
            @keyframes shake {
              0% { transform: translate(1px, 1px) rotate(0deg); }
              10% { transform: translate(-1px, -2px) rotate(-1deg); }
              20% { transform: translate(-3px, 0px) rotate(1deg); }
              30% { transform: translate(3px, 2px) rotate(0deg); }
              40% { transform: translate(1px, -1px) rotate(1deg); }
              50% { transform: translate(-1px, 2px) rotate(-1deg); }
              60% { transform: translate(-3px, 1px) rotate(0deg); }
              70% { transform: translate(3px, 1px) rotate(-1deg); }
              80% { transform: translate(-1px, -1px) rotate(1deg); }
              90% { transform: translate(1px, 2px) rotate(0deg); }
              100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
          </style>
        </head>
        <body>
          <h1>🚨 WARNING 🚨</h1>
          <p class="emojis">🚨⚠️🚨</p>
          <p>Unauthorized login attempt detected!</p>
          <p>Your actions have been <strong>logged</strong> and reported to the authorities! ⚠️</p>
          <div class="alert">⚠️ THIS IS YOUR FINAL WARNING ⚠️</div>
        </body>
      </html>
    `);
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
//app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
//app.use('/api/credits', creditRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
