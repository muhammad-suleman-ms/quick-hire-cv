import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: 'noreply@QuickHireCV.com', // Replace with your verified sender
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let OTP = '';
  
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  
  return OTP;
}

export function generateOTPEmailContent(otp: string): { text: string; html: string } {
  const text = `Your OTP code for password reset is: ${otp}. This code will expire in 10 minutes.`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #3b82f6; text-align: center;">Resume Builder Password Reset</h2>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">You've requested to reset your password. Please use the following OTP code to complete the process:</p>
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <h1 style="color: #1e40af; letter-spacing: 5px; font-size: 32px; margin: 0;">${otp}</h1>
      </div>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">This code will expire in <strong>10 minutes</strong>.</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333;">If you didn't request this password reset, please ignore this email.</p>
      <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 15px;">
        &copy; ${new Date().getFullYear()} Resume Builder. All rights reserved.
      </p>
    </div>
  `;
  
  return { text, html };
}
