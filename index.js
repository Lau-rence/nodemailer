import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.post('/send-email', (req, res) => {
    const {firstName, lastName, email, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: 
        {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
    });
  
    const mailOptions = {
      from: 'web.email2023@gmail.com',
      to: 'rencesantos14@gmail.com',
      subject: subject,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
});
  
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});