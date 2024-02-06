
# JWT Authentication Note with Sign and Verify Coding Example

JWT (JSON Web Tokens) authentication is a popular method for securing web applications by generating and verifying tokens. It provides a compact and self-contained way to transmit information between parties as a JSON object.
### What is the JSON Web Token structure?
In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
```
Header
Payload
Signature
```


## Installation:
Ensure you have the required libraries installed. For Node.js, you can use npm or yarn to install jsonwebtoken:

```
npm install jsonwebtoken
```
## Token Signing:
To create a JWT token, you first need to sign it with a secret key. This secret key is known only to the server, ensuring that the token cannot be tampered with or forged.

```
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";

const payload = { username: "exampleUser" };
const token = jwt.sign(payload, secretKey);
```
## Token Verification:
On subsequent requests, the client sends the token in the request header. The server verifies the token using the same secret key.

```
const tokenFromClient = "tokenReceivedFromClient";

jwt.verify(tokenFromClient, secretKey, (err, decoded) => {
  if (err) {
    // Token verification failed
    console.error("Token verification failed");
  } else {
    // Token verified successfully
    console.log("Token verified successfully");
    console.log(decoded); // Contains the decoded payload
  }
});
```
## Integration with Express:
You can integrate JWT authentication with an Express.js server by creating middleware to handle token verification.

```
const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";
const app = express();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token verification failed" });
    }
    req.user = decoded;
    next();
  });
};

// Example route requiring authentication
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
