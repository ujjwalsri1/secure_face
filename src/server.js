import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ujjwalsri1@gmail.com',
    pass: 'pnkjcbodsplpbzmm' // Use app password or enable less secure apps
  },
});

// Store pending confirmations
const pendingConfirmations = {};

app.post('/signup', (req, res) => {
  const { username, password, email, address } = req.body;

  // Validate inputs
  if (!username || !password || !email || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create a unique confirmation token
  const confirmationToken = crypto.randomBytes(16).toString('hex');
  pendingConfirmations[confirmationToken] = { username, email, address };

  // Send email to admin for confirmation
  const adminEmail = 'ujjwalsri1@gmail.com'; // Admin email
  const confirmLink = `http://localhost:3000/confirm/${confirmationToken}`; // Adjust to your domain
  const mailOptions = {
    from: 'ujjwalsri1@gmail.com',
    to: adminEmail,
    subject: 'New Signup Request',
    text: `New user signup:\n\nUsername: ${username}\nEmail: ${email}\nEthereum Address: ${address}\n\nPlease confirm this signup by clicking the link: ${confirmLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email." });
    }

    // If email sent successfully, respond to the client
    res.status(200).json({ message: "Signup request sent to admin." });
  });
});

// Confirmation endpoint
app.get('/confirm/:token', (req, res) => {
  const token = req.params.token;
  const userData = pendingConfirmations[token];

  if (!userData) {
    return res.status(400).send("Invalid or expired confirmation link.");
  }

  const { username, email, address } = userData;

  // Send confirmation email to the user
  const userMailOptions = {
    from: 'ujjwalsri1@gmail.com',
    to: email,
    subject: 'Signup Confirmation',
    text: `Signup successful! Your Ethereum address is: ${address}`,
  };

  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending confirmation email to user.");
    }

    // Optionally remove the confirmed user from pending confirmations
    delete pendingConfirmations[token];

    res.status(200).send("Signup confirmed! A confirmation email has been sent to the user.");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
