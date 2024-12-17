// Package Imports
const express = require("express");
const cors = require("cors");
const factoryRoutes = require("factory-curd-no-otp")
const { globalError, responser, apiFeatures, logger ,upload} = require("database-connection-function-com")
const authRoutes = require("auth-curd-api-com-otp-and-password")
const { catchError } = require("./utils/catchError")
// const passwordAuthRoutes = require("auth-curd-api-com-password");
// const otpAuthRoutes = require("auth-curd-api2-otp");

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }))
app.use(cors());

// CORS Configuration
app.use(cors({
    origin: ['https://carbasketapi.rpnlogistics.com', 'https://admin.carbasket.in', 'https://partner.carbasket.in', 'https://www.carbasket.in',
    'https://carbasket.in', 'https://staff.carbasket.in',
    'https://admin.zulukk.com', 'https://www.zulukk.com', 'https://zulukk.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

app.use(express.static(__dirname + "/images"));
app.use("/images", express.static("images"));

// routes
factoryRoutes.routes(app);
authRoutes.authRoutes(app)

// Auth routes (for both password and OTP logins)
// app.use("/auth", async (req, res, next) => {
//     const { loginMethod } = req.body; 
  
//     if (loginMethod === "password") {
//       const data = await passwordAuthRoutes.authRoutes(app);
//     } else if (loginMethod === "otp") {
//       const data = await otpAuthRoutes.authRoutes(app);
//     } else {
//       return responser.send(400, "Invalid login method", req, res);
//     }
  
//     next();
//   });

// health
app.get("/health", catchError(async (req, res) => {
    const healthPayload = {
        projectName: 'Zulukk Project',
        frontEnd: 'Angular',
        backEnd: 'NodeJs',
        dataBase: 'MongoDB',
        container: 'Docker Container'
    }
    return responser.send(200, `${healthPayload.projectName} Health Check Up`, req, res, healthPayload)
}))


// global error
app.use(globalError.errorHandler)

module.exports = app
