import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Initialize Resend with the API key from env
  const resend = new Resend(process.env.RESEND_API_KEY || 're_fallback');
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json(
        { error: 'Server configuration error: TO_EMAIL is not set.' },
        { status: 500 }
      );
    }

    // Beautiful HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
          .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0B132B 0%, #10B981 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; }
          .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
          .field { margin-bottom: 24px; }
          .field-label { font-size: 12px; text-transform: uppercase; color: #888888; font-weight: bold; letter-spacing: 1px; margin-bottom: 8px; }
          .field-value { font-size: 16px; color: #222222; background: #f9fbfb; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #10B981; }
          .message-box { font-size: 15px; color: #444444; background: #f9fbfb; padding: 20px; border-radius: 8px; white-space: pre-wrap; border: 1px solid #eeeeee; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #aaaaaa; border-top: 1px solid #eeeeee; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>New Portfolio Message</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">Sender Email</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${subject}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Sent securely via your Next.js Portfolio.
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const data = await resend.emails.send({
      from: 'Barathan S Portfolio <onboarding@resend.dev>',
      to: [toEmail],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: htmlTemplate,
    });

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending the message.' },
      { status: 500 }
    );
  }
}
