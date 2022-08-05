/* MIHIR SHETH | 23-07-2022 */

// main reference => https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#step-2-creating-a-token-api
const express = require("express");
const app = express();
const cors = require("cors"); // npm install --save-dev express cors
const mysql = require("mysql2"); // npm install --save mysql2 => "npm install mysql" does not work
const md5 = require("md5"); // npm i md5 => hashes password entered by user

const crypto = require("crypto");
// TODO --> ADD LATER
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// databse USERS created in mysql workbench =>
// one table => Cred; four columns => "id", "email", "password", "token"
const db = mysql.createPool({
  host: "10.0.1.16",
  user: "react",
  password: "React@123",
  database: "USERS",
});

db.getConnection((err) => {
  if (!err) console.log("database connection established");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.use(cors());
app.use(express.json());

// reference => https://www.youtube.com/watch?v=W-sZo6Gtx_E
app.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const password = md5(pass); // hashed password

  db.query(
    "SELECT * FROM Cred WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // only allows login when email and password exist in database
      if (result.length > 0) {
        res.send({
          // token can be changed to anything
          token: "fd16827d00f9d8af894221e3bc2f169f", // "Bilav Information Services LLP" in md5 hash form
        });
      } else {
        res.send({ message: "Please try again!" });
      }
    }
  );
});

app.post("/reset", (req, res) => {
  const email = req.body.email;
  if (email === "") {
    res.send("email is required");
  }
  console.error(email);

  db.query("SELECT * FROM Cred WHERE email = ?", [email], (err, result) => {
    if (result.length === 0) {
      console.error("not registered");
      res.send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      const today = new Date();
      const expiry =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        (today.getHours() + 2) +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
      db.query(
        "UPDATE Cred SET token = ?, expiry = ? WHERE email = ?",
        [token, expiry, email],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            res.send(`http://localhost:3000/reset-password/${token}`);
          }
        }
      );

      // TODO /* ---------- ADD LATER ---------- */
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   host: "http://localhost:8080/login",
      //   auth: {
      //     type: "OAuth2",
      //     user: "mihir5.ns@gmail.com",
      //     refreshToken:
      //       "1//04pQ1d9ZGI-t-CgYIARAAGAQSNwF-L9IrRSqW9bRPL4kXKUYizsmDcdAuKOnj2MnoG9DQdqWP8fRxPuuaqL_EXcc-X6Y4PJrki2A",
      //     clientId:
      //       "310180383069-p6i6aaqmqb0a9tsoet4t3cc0ubqfidn5.apps.googleusercontent.com",
      //     clientSecret: "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",
      //   },
      // });

      // const mailOptions = {
      //   from: "mihir5.ns@gmail.com",
      //   to: `${email}`,
      //   subject: "Link to reset password",
      //   text:
      //     "Your are receiving this beacause you (or someone else) have requested a password reset for your Bilav account.\n\n" +
      //     "Please click on the following link to reset your password:\n\n" +
      //     `http://localhost:8080/reset/${token}\n\n` +
      //     "If this was not requested by you, please ignore this email and your password will remain unaltered.\n",
      // };

      // transporter.sendMail(mailOptions, (err, response) => {
      //   if (err) {
      //     console.error("there was an error -->", err);
      //   } else {
      //     console.log("mail sent -->", response);
      //     res.send("recovery email sent");
      //   }
      // });

      // console.log("sending mail");
      // TODO /* ---------- ADD LATER END ---------- */
    }
  });
});

app.get("/reset-password", (req, res) => {
  const tokenCheck = req.query.resToken;
  const today = new Date();
  const expiryCheck =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  db.query(
    "SELECT * FROM Cred WHERE token = ? AND expiry > ?",
    [tokenCheck, expiryCheck],
    (err, result) => {
      if (result.length === 0) {
        console.error("password reset link invalid -->", err);
        res.send(
          `invalid reset link --> checked token: ${tokenCheck} | checked expiry: ${expiryCheck}`
        );
      } else {
        res.send({
          email: result[0].email,
          message: "reset link valid",
        });
        console.log("result -->", result);
      }
      if (err) {
        console.log("link error -->", err);
      }
    }
  );
});

app.put("/update-password", (req, res) => {
  const emailCheck = req.body.email;
  const tokenCheck = req.body.resToken;
  const today = new Date();
  const expiryCheck =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  db.query(
    "SELECT * FROM Cred WHERE email = ? AND token = ? AND expiry > ?",
    [emailCheck, tokenCheck, expiryCheck],
    (err, result) => {
      if (result.length > 0) {
        console.log("user in db");
        const newPassword = req.body.password;
        const hashedPassword = md5(newPassword);
        const tokenReset = null;
        const expiryReset = null;
        db.query(
          "UPDATE Cred SET password = ?, token = ?, expiry = ? WHERE email = ?",
          [hashedPassword, tokenReset, expiryReset, emailCheck],
          (err, result) => {
            if (err) {
              console.log("please try again -->", err);
              res.send("no such user in db");
            } else {
              console.log("password updated");
              res.send({ message: "password updated" });
            }
          }
        );
      }
    }
  );
});

app.listen(8080, () =>
  console.log("server is up and running on http://localhost:8080/login")
);
