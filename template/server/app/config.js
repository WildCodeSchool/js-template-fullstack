// Load the express module to create a web application

const express = require("express");

const app = express();

// Configure it

/* ************************************************************************* */

// CORS Handling: Why is the current code commented out and do I need to define specific allowed origins for my project?

// CORS (Cross-Origin Resource Sharing) is a security mechanism in web browsers that blocks requests from a different domain than the server.
// You may find the following magic line in forums:

// app.use(cors());

// You should NOT do that: such code uses the `cors` module to allow all origins, which can pose security issues.
// For this pedagogical template, the CORS code is commented out to show the need for defining specific allowed origins.

// To enable CORS and define allowed origins:
// 1. Install the `cors` module in the server directory
// 2. Uncomment the line `const cors = require("cors");`
// 3. Uncomment the section `app.use(cors({ origin: [...] }))`
// 4. Be sure to only have URLs in the array with domains from which you want to allow requests.
// For example: ["http://mysite.com", "http://another-domain.com"]

/*
const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL, // keep this one, after checking the value in `server/.env`
      "http://mysite.com",
      "http://another-domain.com",
    ]
  })
);
*/

/* ************************************************************************* */

// Request Parsing: Understanding the purpose of this part

// Request parsing is necessary to extract data sent by the client in an HTTP request.
// For example to access the body of a POST request.
// The current code contains different parsing options as comments to demonstrate different ways of extracting data.

// 1. `express.json()`: Parses requests with JSON data.
// 2. `express.urlencoded()`: Parses requests with URL-encoded data.
// 3. `express.text()`: Parses requests with raw text data.
// 4. `express.raw()`: Parses requests with raw binary data.

// Uncomment one or more of these options depending on the format of the data sent by your client:

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.text());
// app.use(express.raw());

/* ************************************************************************* */

// Cookies: Why and how to use the `cookie-parser` module?

// Cookies are small pieces of data stored in the client's browser. They are often used to store user-specific information or session data.

// The `cookie-parser` module allows us to parse and manage cookies in our Express application. It parses the `Cookie` header in incoming requests and populates `req.cookies` with an object containing the cookies.

// To use `cookie-parser`, make sure it is installed in `server/package.json` (you may need to install it separately):
// npm install cookie-parser

// Then, require the module and use it as middleware in your Express application:

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// Once `cookie-parser` is set up, you can read and set cookies in your routes.
// For example, to set a cookie named "username" with the value "john":
// res.cookie("username", "john");

// To read the value of a cookie named "username":
// const username = req.cookies.username;

/* ************************************************************************* */

// Import the API router
const apiRouter = require("./routers/api/router");

// Mount the API router under the "/api" endpoint
app.use("/api", apiRouter);

/* ************************************************************************* */

// Production-ready setup: What is it for, and when should I enable it?

// The code includes commented sections to set up a production environment where the client and server are executed from the same processus.

// What it's for:
// - Serving client static files from the server, which is useful when building a single-page application with React.
// - Redirecting unhandled requests (e.g., all requests not matching a defined API route) to the client's index.html. This allows the client to handle client-side routing.

// When to enable it:
// It depends on your project and its structure. If you are developing a single-page application, you'll enable these sections when you are ready to deploy your project to production.

// To enable production configuration:
// 1. Uncomment the lines related to serving static files and redirecting unhandled requests.
// 2. Ensure that the `reactBuildPath` points to the correct directory where your client's build artifacts are located.

/*
const path = require("path");

const reactBuildPath = path.join(__dirname, "/../../client/dist");
const publicFolderPath = path.join(__dirname, "/../public");

// Serve react resources

app.use(express.static(reactBuildPath));

// Serve server resources

app.get("*.*", express.static(publicFolderPath, { maxAge: "1y" }));

// Redirect unhandled requests to the react index file

app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "/index.html"));
});
*/

/* ************************************************************************* */

// Middleware for Error Logging (Uncomment to enable)
// Important: Error-handling middleware should be defined last, after other app.use() and routes calls.

/*
// Define a middleware function to log errors
const logErrors = (err, req, res, next) => {
  // Log the error to the console for debugging purposes
  console.error(err);
  console.error("on req:", req.method, req.path);

  // Pass the error to the next middleware in the stack
  next(err);
};

// Mount the logErrors middleware globally
app.use(logErrors);
*/

/* ************************************************************************* */

module.exports = app;
