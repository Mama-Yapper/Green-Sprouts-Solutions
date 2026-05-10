import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, system } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Website Lead <onboarding@resend.dev>', 
      to: ['victor@greensprouts.co.za'], // Green Sprouts email
      subject: `New Lead: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>System Interested In:</strong> ${system}</p>
      `
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
