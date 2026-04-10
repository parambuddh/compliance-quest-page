import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, source_url } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Invalid email address' });
    }

    // SMTP Configuration from environment variables
    const smtpUser = process.env.SMTP_USER || 'zeon6080@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'jtwb crev jxzb vvoe';

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const logoUrl = 'https://compliance-quest-page.vercel.app/ComplianceVista-logo.svg';
    const currentUrl = source_url || req.headers.referer || 'Direct';

    // Sales Email HTML Template
    const salesEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>New Inquiry</title>
          <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0;">
          <table width="650" align="center" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e2e2; font-family: Arial, sans-serif; font-size: 12px; color: #333;">
            <!-- Logo Header -->
            <tr>
              <td align="center" bgcolor="#f4f9fb" style="padding: 20px 0; border-bottom: 1px solid #e2e2e2;">
                <img src="${logoUrl}" width="200" alt="ComplianceVista Logo" style="display: block; max-width: 100%;" />
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td align="center" style="padding: 20px 10px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="padding-bottom: 15px;">
                      <strong style="font-size: 18px;">New Inquiry Received</strong>
                      <p style="margin: 5px 0 0 0; color: #666;">Following message received via contact form</p>
                    </td>
                  </tr>

                  <!-- Details Table -->
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse; border: 1px solid #ccc;">
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 12px; width: 30%; font-weight: bold; border: 1px solid #ccc;">Name:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc;">Email:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc;">Phone:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;"><a href="tel:${phone}">${phone}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc; vertical-align: top;">Message:</td>
                          <td style="padding: 12px; border: 1px solid #ccc; word-wrap: break-word;">${message.replace(/\n/g, '<br>')}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc;">Form Submitted From:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;"><a href="${currentUrl}">${currentUrl}</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#f4f9fb" style="padding: 15px; border-top: 1px solid #e2e2e2; text-align: center; font-size: 11px; color: #666;">
                <strong>Thanks & Regards</strong><br>
                <strong>ComplianceVista Team</strong><br><br>
                <strong>Address:</strong> 2040 Martin Ave, Santa Clara, CA 95050, United States<br>
                <strong>Phone:</strong> 1.669.777.6838<br>
                <strong>Email:</strong> info@surveyvista.com
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Prospect Auto-Response Email HTML Template
    const prospectEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Thank You</title>
          <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0;">
          <table width="650" align="center" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e2e2; font-family: Arial, sans-serif; font-size: 12px; color: #333;">
            <!-- Logo Header -->
            <tr>
              <td align="center" bgcolor="#f4f9fb" style="padding: 20px 0; border-bottom: 1px solid #e2e2e2;">
                <img src="${logoUrl}" width="200" alt="ComplianceVista Logo" style="display: block; max-width: 100%;" />
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td align="center" style="padding: 20px 10px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="padding-bottom: 15px;">
                      <strong style="font-size: 18px;">Thank You for Contacting ComplianceVista</strong>
                      <p style="margin: 5px 0 0 0; color: #666;">We have received your inquiry and will get back to you shortly.</p>
                    </td>
                  </tr>

                  <!-- Confirmation Details -->
                  <tr>
                    <td>
                      <p style="margin: 15px 0; color: #333;">Hi ${name},</p>
                      <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
                        Thank you for reaching out to us. We have successfully received your message and one of our representatives will contact you shortly to discuss your compliance needs.
                      </p>

                      <p style="margin: 15px 0 10px 0; font-weight: bold; color: #333;">Here's a summary of your submission:</p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse; border: 1px solid #ccc;">
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 12px; width: 30%; font-weight: bold; border: 1px solid #ccc;">Name:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc;">Email:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;">${email}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc;">Phone:</td>
                          <td style="padding: 12px; border: 1px solid #ccc;">${phone}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; font-weight: bold; border: 1px solid #ccc; vertical-align: top;">Message:</td>
                          <td style="padding: 12px; border: 1px solid #ccc; word-wrap: break-word;">${message.replace(/\n/g, '<br>')}</td>
                        </tr>
                      </table>

                      <p style="margin: 20px 0 10px 0; color: #666; line-height: 1.6;">
                        If you have any urgent questions in the meantime, please don't hesitate to reach out to our support team.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td bgcolor="#f4f9fb" style="padding: 15px; border-top: 1px solid #e2e2e2; text-align: center; font-size: 11px; color: #666;">
                <strong>ComplianceVista Team</strong><br><br>
                <strong>Address:</strong> 2040 Martin Ave, Santa Clara, CA 95050, United States<br>
                <strong>Phone:</strong> 1.669.777.6838<br>
                <strong>Email:</strong> info@surveyvista.com<br>
                <strong>Support:</strong> support@ardira.com
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send Sales Email
    const salesMailOptions = {
      from: `ComplianceVista <${smtpUser}>`,
      to: 'parambuddh26@gmail.com',
      cc: 'gajeramilan518@gmail.com',
      subject: 'New Inquiry from ComplianceVista Website',
      html: salesEmailHTML,
      replyTo: email,
    };

    // Send Prospect Email
    const prospectMailOptions = {
      from: `ComplianceVista <${smtpUser}>`,
      to: email,
      subject: 'Thank You for Contacting ComplianceVista',
      html: prospectEmailHTML,
    };

    // Send both emails
    const [salesResult, prospectResult] = await Promise.allSettled([
      transporter.sendMail(salesMailOptions),
      transporter.sendMail(prospectMailOptions),
    ]);

    // Check results
    const errors = [];
    if (salesResult.status === 'rejected') {
      errors.push(`Sales email failed: ${salesResult.reason.message}`);
    }
    if (prospectResult.status === 'rejected') {
      errors.push(`Prospect email failed: ${prospectResult.reason.message}`);
    }

    if (errors.length > 0) {
      console.error('Email errors:', errors);
      return res.status(500).json({ status: 'error', message: 'Failed to send emails', errors });
    }

    return res.status(200).json({ status: 'success', message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
  }
}
