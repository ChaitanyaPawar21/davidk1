// server.js - Run this as your backend: node server.js
// Install deps: npm install express cors mailgun.js form-data dotenv

import express from 'express';
import cors from 'cors';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Update to your frontend URL in production
app.use(express.json());

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY, // Loaded from .env — never hardcode this
});

const DOMAIN = 'sandboxda356be370f84b8cb0bb1e1f85794487.mailgun.org';

app.post('/api/contact', async (req, res) => {
    const { name, email, service, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailContent = `
New Inquiry from editz.by.david website:

Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}
    `.trim();

    try {
        await mg.messages.create(DOMAIN, {
            from: `Contact Form <postmaster@${DOMAIN}>`,
            to: ['david khan <zeenatkhan.nazz1951@gmail.com>'],
            subject: `New Inquiry from ${name} - ${service}`,
            text: emailContent,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Mailgun error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));