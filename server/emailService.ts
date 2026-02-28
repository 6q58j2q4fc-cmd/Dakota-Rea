/**
 * Email Service for Dakota Rea Website
 * Uses Manus built-in notification API to send emails to owner
 * and uses a custom email template system for user-facing emails
 * 
 * NOTE: This does NOT require users to have Manus accounts.
 * Owner notifications go through Manus built-in API.
 * User emails are sent via the Forge API email endpoint.
 */

import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";

// ==================== EMAIL TEMPLATES ====================

export function getWelcomeEmailTemplate(firstName: string, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Dakota Rea's Insights</title>
  <style>
    body { font-family: Georgia, serif; background: #f9f7f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; }
    .header { background: #1a1a2e; padding: 40px; text-align: center; }
    .header h1 { color: #c9a84c; font-size: 28px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .body h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 16px; }
    .body p { color: #444; line-height: 1.7; margin-bottom: 16px; }
    .cta { display: block; background: #c9a84c; color: #1a1a2e; text-decoration: none; padding: 14px 28px; text-align: center; font-weight: bold; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 24px 0; }
    .footer { background: #f5f5f0; padding: 24px 40px; text-align: center; }
    .footer p { color: #888; font-size: 12px; margin: 0; }
    .credentials { background: #f9f7f4; border-left: 3px solid #c9a84c; padding: 16px 20px; margin: 20px 0; }
    .credentials p { margin: 4px 0; color: #555; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DAKOTA REA</h1>
      <p>AI Researcher · Scholar · Strategist</p>
    </div>
    <div class="body">
      <h2>Welcome, ${firstName || "Friend"}!</h2>
      <p>Thank you for joining Dakota Rea's exclusive insights community. You're now part of a select group of forward-thinking professionals who receive cutting-edge perspectives on AI strategy, ethics, and enterprise transformation.</p>
      
      <div class="credentials">
        <p>🎓 <strong>Harvard Business School Graduate</strong></p>
        <p>🎓 <strong>Oxford Jeremy Bentham Scholar 2025</strong></p>
        <p>⚖️ <strong>UK Solicitor Trainee at Slaughter & May</strong></p>
        <p>🌍 <strong>AI Ethics Researcher & Enterprise Strategist</strong></p>
      </div>
      
      <p>As a subscriber, you'll receive:</p>
      <ul>
        <li>Daily AI strategy insights and analysis</li>
        <li>Exclusive research on AI ethics and governance</li>
        <li>Early access to new publications and frameworks</li>
        <li>Invitations to exclusive events and webinars</li>
      </ul>
      
      <a href="https://dakotarea.com/blog" class="cta">Read Latest Insights →</a>
      
      <p>If you have any questions or would like to discuss how AI strategy can transform your organization, don't hesitate to reach out.</p>
      
      <p>Best regards,<br><strong>Dakota Rea</strong><br><em>AI Researcher & Enterprise Strategist</em></p>
    </div>
    <div class="footer">
      <p>You're receiving this because you subscribed at dakotarea.com</p>
      <p>© ${new Date().getFullYear()} Dakota Rea. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getBookingConfirmationTemplate(data: {
  name: string;
  meetingType: string;
  date: string;
  time: string;
  company?: string;
}): string {
  const meetingLabels: Record<string, string> = {
    strategy: "AI Strategy Call (30 minutes)",
    speaking: "Speaking Inquiry",
    consulting: "Consulting Discovery Call",
  };
  const meetingLabel = meetingLabels[data.meetingType] || data.meetingType;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Meeting Request Received</title>
  <style>
    body { font-family: Georgia, serif; background: #f9f7f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; }
    .header { background: #1a1a2e; padding: 40px; text-align: center; }
    .header h1 { color: #c9a84c; font-size: 28px; margin: 0; letter-spacing: 2px; }
    .body { padding: 40px; }
    .body h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 16px; }
    .body p { color: #444; line-height: 1.7; margin-bottom: 16px; }
    .booking-details { background: #f9f7f4; border: 1px solid #e5e0d8; padding: 24px; margin: 20px 0; }
    .booking-details h3 { color: #1a1a2e; margin: 0 0 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
    .detail-row { display: flex; gap: 12px; margin-bottom: 10px; }
    .detail-label { color: #888; font-size: 14px; min-width: 100px; }
    .detail-value { color: #1a1a2e; font-size: 14px; font-weight: bold; }
    .footer { background: #f5f5f0; padding: 24px 40px; text-align: center; }
    .footer p { color: #888; font-size: 12px; margin: 0; }
    .status-badge { display: inline-block; background: #c9a84c; color: #1a1a2e; padding: 6px 16px; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DAKOTA REA</h1>
    </div>
    <div class="body">
      <h2>Meeting Request Received</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for your interest in connecting with Dakota Rea. Your meeting request has been received and is currently under review.</p>
      
      <div class="booking-details">
        <h3>Booking Summary</h3>
        <div class="detail-row">
          <span class="detail-label">Meeting Type:</span>
          <span class="detail-value">${meetingLabel}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Requested Date:</span>
          <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Requested Time:</span>
          <span class="detail-value">${data.time}</span>
        </div>
        ${data.company ? `<div class="detail-row"><span class="detail-label">Company:</span><span class="detail-value">${data.company}</span></div>` : ""}
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="status-badge">Pending Review</span>
        </div>
      </div>
      
      <p>Dakota will personally review your request and respond within 1-2 business days with a calendar invitation or alternative timing options.</p>
      
      <p>In the meantime, feel free to explore Dakota's latest insights on AI strategy and ethics at <a href="https://dakotarea.com/blog" style="color: #c9a84c;">dakotarea.com/blog</a>.</p>
      
      <p>Best regards,<br><strong>Dakota Rea's Team</strong></p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Dakota Rea. All rights reserved. | contact@dakotarea.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getNewsletterTemplate(data: {
  subject: string;
  previewText: string;
  content: string;
  articleTitle?: string;
  articleUrl?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.subject}</title>
  <style>
    body { font-family: Georgia, serif; background: #f9f7f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; }
    .header { background: #1a1a2e; padding: 40px; text-align: center; }
    .header h1 { color: #c9a84c; font-size: 28px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0; }
    .body { padding: 40px; }
    .body h2 { color: #1a1a2e; font-size: 22px; margin-bottom: 16px; }
    .body p { color: #444; line-height: 1.7; margin-bottom: 16px; }
    .article-card { border: 1px solid #e5e0d8; padding: 24px; margin: 20px 0; }
    .article-card h3 { color: #1a1a2e; margin: 0 0 12px; font-size: 18px; }
    .cta { display: block; background: #c9a84c; color: #1a1a2e; text-decoration: none; padding: 14px 28px; text-align: center; font-weight: bold; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 24px 0; }
    .footer { background: #f5f5f0; padding: 24px 40px; text-align: center; }
    .footer p { color: #888; font-size: 12px; margin: 4px 0; }
    .footer a { color: #c9a84c; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DAKOTA REA</h1>
      <p>AI Strategy · Ethics · Enterprise Innovation</p>
    </div>
    <div class="body">
      <h2>${data.subject}</h2>
      <div>${data.content}</div>
      
      ${data.articleTitle && data.articleUrl ? `
      <div class="article-card">
        <h3>${data.articleTitle}</h3>
        <a href="${data.articleUrl}" class="cta">Read Full Article →</a>
      </div>
      ` : ""}
      
      <a href="https://dakotarea.com/blog" class="cta">Explore All Insights →</a>
      
      <p style="color: #888; font-size: 13px;">Want to discuss AI strategy for your organization? <a href="https://dakotarea.com/consulting" style="color: #c9a84c;">Book a consultation →</a></p>
    </div>
    <div class="footer">
      <p>You're receiving this because you subscribed to Dakota Rea's insights.</p>
      <p><a href="https://dakotarea.com">dakotarea.com</a> | <a href="mailto:contact@dakotarea.com">contact@dakotarea.com</a></p>
      <p>© ${new Date().getFullYear()} Dakota Rea. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ==================== EMAIL SENDING VIA MANUS FORGE API ====================

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  emailType: string;
  referenceId?: number;
  referenceType?: string;
}

/**
 * Send email using Manus Forge API email endpoint
 * This does NOT require the recipient to have a Manus account
 */
export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  const { to, subject, html, fromName = "Dakota Rea", emailType, referenceId, referenceType } = params;
  
  // Log the email attempt
  const db = await getDb();
  let logId: number | undefined;
  
  if (db) {
    const { emailLogs } = await import("../drizzle/schema");
    try {
      const result = await db.insert(emailLogs).values({
        toEmail: to,
        fromEmail: "contact@dakotarea.com",
        subject,
        emailType,
        status: "pending",
        referenceId: referenceId || null,
        referenceType: referenceType || null,
      });
      logId = result[0].insertId;
    } catch (err) {
      console.warn("[Email] Failed to log email:", err);
    }
  }

  // Try to send via Manus Forge API email service
  try {
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      throw new Error("Forge API not configured");
    }

    const emailEndpoint = new URL(
      "webdevtoken.v1.WebDevService/SendEmail",
      ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
    ).toString();

    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        fromName,
      }),
    });

    if (response.ok) {
      // Update log to sent
      if (db && logId) {
        const { emailLogs } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        await db.update(emailLogs)
          .set({ status: "sent", sentAt: new Date() })
          .where(eq(emailLogs.id, logId));
      }
      console.log(`[Email] Successfully sent to ${to}: ${subject}`);
      return true;
    } else {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Email API responded with ${response.status}: ${errorText}`);
    }
  } catch (error: any) {
    console.warn(`[Email] Failed to send via Forge API: ${error.message}`);
    
    // Fallback: Use owner notification to alert about the email
    try {
      await notifyOwner({
        title: `📧 Email to ${to}: ${subject}`,
        content: `Email Type: ${emailType}\nTo: ${to}\nSubject: ${subject}\n\nNote: Direct email delivery failed. Please follow up manually.`,
      });
    } catch (notifyErr) {
      console.warn("[Email] Owner notification also failed:", notifyErr);
    }

    // Update log to failed
    if (db && logId) {
      const { emailLogs } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(emailLogs)
        .set({ status: "failed", errorMessage: error.message })
        .where(eq(emailLogs.id, logId));
    }
    
    return false;
  }
}

// ==================== SPECIFIC EMAIL FUNCTIONS ====================

/**
 * Send welcome email to new subscriber
 */
export async function sendWelcomeEmail(subscriber: { email: string; firstName?: string }): Promise<boolean> {
  const html = getWelcomeEmailTemplate(subscriber.firstName || "", subscriber.email);
  
  return sendEmail({
    to: subscriber.email,
    subject: "Welcome to Dakota Rea's AI Strategy Insights",
    html,
    emailType: "welcome",
    referenceType: "subscriber",
  });
}

/**
 * Send booking confirmation to requester
 */
export async function sendBookingConfirmationToRequester(data: {
  name: string;
  email: string;
  meetingType: string;
  date: string;
  time: string;
  company?: string;
  message?: string;
}): Promise<boolean> {
  const html = getBookingConfirmationTemplate(data);
  
  return sendEmail({
    to: data.email,
    subject: `Meeting Request Received - ${data.meetingType === "strategy" ? "AI Strategy Call" : data.meetingType === "speaking" ? "Speaking Inquiry" : "Consulting Discovery"} with Dakota Rea`,
    html,
    emailType: "booking_confirmation",
    referenceType: "booking",
  });
}

/**
 * Send booking notification to admin (Dakota)
 */
export async function sendBookingNotificationToAdmin(data: {
  name: string;
  email: string;
  meetingType: string;
  date: string;
  time: string;
  company?: string;
  message?: string;
}): Promise<boolean> {
  const meetingLabels: Record<string, string> = {
    strategy: "AI Strategy Call",
    speaking: "Speaking Inquiry",
    consulting: "Consulting Discovery",
  };
  
  const content = `
New Meeting Request Received!

Meeting Type: ${meetingLabels[data.meetingType] || data.meetingType}
Date: ${data.date}
Time: ${data.time}
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ""}
${data.message ? `\nMessage:\n${data.message}` : ""}

Reply to ${data.email} to confirm or reschedule.
  `.trim();

  // Notify owner via Manus notification system
  try {
    await notifyOwner({
      title: `📅 New Booking: ${data.name} - ${meetingLabels[data.meetingType] || data.meetingType}`,
      content,
    });
  } catch (err) {
    console.warn("[Email] Failed to send owner notification:", err);
  }

  // Also send email to dakotarea@gmail.com
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Booking Request</title>
<style>body{font-family:Georgia,serif;background:#f9f7f4;margin:0;padding:0;}.container{max-width:600px;margin:40px auto;background:white;}.header{background:#1a1a2e;padding:30px;}.header h1{color:#c9a84c;margin:0;font-size:22px;}.body{padding:30px;}.detail{margin:8px 0;color:#444;}.label{font-weight:bold;color:#1a1a2e;}</style>
</head>
<body><div class="container">
<div class="header"><h1>🗓️ New Meeting Request</h1></div>
<div class="body">
<p><span class="label">Meeting Type:</span> ${meetingLabels[data.meetingType] || data.meetingType}</p>
<p><span class="label">Date:</span> ${data.date}</p>
<p><span class="label">Time:</span> ${data.time}</p>
<p><span class="label">Name:</span> ${data.name}</p>
<p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>
${data.company ? `<p><span class="label">Company:</span> ${data.company}</p>` : ""}
${data.message ? `<p><span class="label">Message:</span><br>${data.message}</p>` : ""}
<hr>
<p><a href="mailto:${data.email}?subject=Re: Meeting Request - ${data.date}">Reply to ${data.name}</a></p>
</div></div></body></html>
  `.trim();

  return sendEmail({
    to: "dakotarea@gmail.com",
    subject: `New Booking: ${data.name} - ${meetingLabels[data.meetingType] || data.meetingType} on ${data.date}`,
    html: adminHtml,
    fromName: "Dakota Rea Website",
    emailType: "booking_admin",
    referenceType: "booking",
  });
}

/**
 * Send newsletter to all active subscribers
 */
export async function sendNewsletterToSubscribers(data: {
  subject: string;
  content: string;
  articleTitle?: string;
  articleUrl?: string;
}): Promise<{ sent: number; failed: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0 };

  const { subscribers } = await import("../drizzle/schema");
  const { eq, and } = await import("drizzle-orm");
  
  const activeSubscribers = await db.select()
    .from(subscribers)
    .where(and(eq(subscribers.isActive, 1), eq(subscribers.isVerified, 1)));

  let sent = 0;
  let failed = 0;

  for (const subscriber of activeSubscribers) {
    const html = getNewsletterTemplate({
      subject: data.subject,
      previewText: data.content.substring(0, 150),
      content: `<p>Dear ${subscriber.firstName || "Subscriber"},</p>${data.content}`,
      articleTitle: data.articleTitle,
      articleUrl: data.articleUrl,
    });

    const success = await sendEmail({
      to: subscriber.email,
      subject: data.subject,
      html,
      emailType: "newsletter",
      referenceType: "subscriber",
      referenceId: subscriber.id,
    });

    if (success) sent++;
    else failed++;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { sent, failed };
}

/**
 * Send subscriber verification email
 */
export async function sendVerificationEmail(subscriber: {
  email: string;
  firstName?: string;
  verificationToken: string;
}): Promise<boolean> {
  const verifyUrl = `https://dakotarea.com/verify-email?token=${subscriber.verificationToken}`;
  
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Verify Your Email</title>
<style>body{font-family:Georgia,serif;background:#f9f7f4;margin:0;padding:0;}.container{max-width:600px;margin:40px auto;background:white;}.header{background:#1a1a2e;padding:40px;text-align:center;}.header h1{color:#c9a84c;font-size:28px;margin:0;letter-spacing:2px;}.body{padding:40px;}.cta{display:block;background:#c9a84c;color:#1a1a2e;text-decoration:none;padding:14px 28px;text-align:center;font-weight:bold;font-size:14px;letter-spacing:1px;text-transform:uppercase;margin:24px 0;}.footer{background:#f5f5f0;padding:24px;text-align:center;}.footer p{color:#888;font-size:12px;margin:0;}</style>
</head>
<body><div class="container">
<div class="header"><h1>DAKOTA REA</h1></div>
<div class="body">
<h2 style="color:#1a1a2e;">Verify Your Email</h2>
<p style="color:#444;line-height:1.7;">Hi ${subscriber.firstName || "there"},</p>
<p style="color:#444;line-height:1.7;">Please verify your email address to complete your subscription and access exclusive AI strategy insights from Dakota Rea.</p>
<a href="${verifyUrl}" class="cta">Verify My Email →</a>
<p style="color:#888;font-size:13px;">If you didn't subscribe, you can safely ignore this email. This link expires in 24 hours.</p>
</div>
<div class="footer"><p>© ${new Date().getFullYear()} Dakota Rea. All rights reserved.</p></div>
</div></body></html>
  `.trim();

  return sendEmail({
    to: subscriber.email,
    subject: "Verify your email - Dakota Rea Insights",
    html,
    emailType: "verification",
    referenceType: "subscriber",
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(subscriber: {
  email: string;
  firstName?: string;
  resetToken: string;
}): Promise<boolean> {
  const resetUrl = `https://dakotarea.com/reset-password?token=${subscriber.resetToken}`;
  
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Reset Your Password</title>
<style>body{font-family:Georgia,serif;background:#f9f7f4;margin:0;padding:0;}.container{max-width:600px;margin:40px auto;background:white;}.header{background:#1a1a2e;padding:40px;text-align:center;}.header h1{color:#c9a84c;font-size:28px;margin:0;letter-spacing:2px;}.body{padding:40px;}.cta{display:block;background:#c9a84c;color:#1a1a2e;text-decoration:none;padding:14px 28px;text-align:center;font-weight:bold;font-size:14px;letter-spacing:1px;text-transform:uppercase;margin:24px 0;}.footer{background:#f5f5f0;padding:24px;text-align:center;}.footer p{color:#888;font-size:12px;margin:0;}</style>
</head>
<body><div class="container">
<div class="header"><h1>DAKOTA REA</h1></div>
<div class="body">
<h2 style="color:#1a1a2e;">Reset Your Password</h2>
<p style="color:#444;line-height:1.7;">Hi ${subscriber.firstName || "there"},</p>
<p style="color:#444;line-height:1.7;">We received a request to reset your password for your Dakota Rea Insights account.</p>
<a href="${resetUrl}" class="cta">Reset My Password →</a>
<p style="color:#888;font-size:13px;">If you didn't request this, you can safely ignore this email. This link expires in 1 hour.</p>
</div>
<div class="footer"><p>© ${new Date().getFullYear()} Dakota Rea. All rights reserved.</p></div>
</div></body></html>
  `.trim();

  return sendEmail({
    to: subscriber.email,
    subject: "Reset your password - Dakota Rea Insights",
    html,
    emailType: "password_reset",
    referenceType: "subscriber",
  });
}
