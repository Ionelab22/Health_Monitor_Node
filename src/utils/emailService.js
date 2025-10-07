// /* eslint-disable no-undef */

// const nodemailer = require('nodemailer');
// const { v4: uuidv4 } = require('uuid');

// require('dotenv').config();

// // console.log('SECRET_EMAIL:', process.env.SECRET_EMAIL);
// // console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD);

// const senderEmail = process.env.SECRET_EMAIL;
// const senderPass = process.env.GMAIL_APP_PASSWORD; // parola de aplicație Gmail

// // configurare nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: senderEmail,
//     pass: senderPass,
//   },
// });

// const sendVerificationEmail = async (email) => {
//   const verificationToken = uuidv4();
//   const verificationUrl = `https://health-monitor-node.onrender.com/api/users/verify/${verificationToken}`;

//   if (!senderEmail) throw new Error('Sender email is missing.');

//   const msg = {
//     to: email,
//     from: senderEmail,
//     subject: 'Account Verification Email',
//     text: `Your verification code is ${verificationToken}. Verify your account here: ${verificationUrl}`,
//     html: `<p>Your verification code is: <strong>${verificationToken}</strong></p>
//            <p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
//   };

//   try {
//     await transporter.sendMail(msg);
//     console.log('Verification email sent!');
//     return verificationToken; // Return the token for saving in the database if needed
//   } catch (error) {
//     console.error('Email not sent! Error:', error.message);
//     throw new Error(`Email not sent! The error is: ${error.message}`);
//   }
// };

// module.exports = sendVerificationEmail;

// src/utils/emailService.js

/* eslint-disable no-undef */
const { Resend } = require('resend');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email) => {
  const verificationToken = uuidv4();

  try {
    const verificationLink = `https://health-monitor-node.onrender.com/api/users/verify/${verificationToken}`;

    const { data, error } = await resend.emails.send({
      from: 'Health_Monitor App <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your Health Monitor account',
      html: `
        <h2>Welcome to Health Monitor 🩺</h2>
        <p>Click the button below to verify your email address:</p>
        <a href="${verificationLink}" 
           style="background-color:#3b82f6;color:white;padding:10px 15px;border-radius:8px;text-decoration:none;">
           Verify Email
        </a>
        <p>If the button doesn’t work, copy this link: ${verificationLink}</p>
      `,
    });

    if (error) throw new Error(`Email not sent: ${error.message}`);
    console.log('✅ Verification email sent via Resend:', data?.id);
    return verificationToken;
  } catch (err) {
    console.error('❌ Email send error:', err.message);
    throw new Error(`Email not sent! The error is: ${err.message}`);
  }
};

module.exports = sendVerificationEmail;
