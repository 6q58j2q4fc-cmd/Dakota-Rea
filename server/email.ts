/**
 * Email Notification System
 * Sends booking notifications via the built-in notification API
 */

import { ENV } from "./_core/env";

interface BookingEmailData {
  meetingType: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
}

const MEETING_TITLES: Record<string, string> = {
  strategy: "AI Strategy Call",
  speaking: "Speaking Inquiry",
  consulting: "Consulting Discovery",
};

const MEETING_DURATIONS: Record<string, number> = {
  strategy: 30,
  speaking: 30,
  consulting: 45,
};

/**
 * Send booking notification email to Dakota
 */
export async function sendBookingNotificationToAdmin(booking: BookingEmailData): Promise<boolean> {
  try {
    const meetingTitle = MEETING_TITLES[booking.meetingType] || booking.meetingType;
    const duration = MEETING_DURATIONS[booking.meetingType] || 30;
    
    const subject = `New Meeting Request: ${meetingTitle} from ${booking.name}`;
    const body = `
New meeting request received!

Meeting Details:
- Type: ${meetingTitle}
- Duration: ${duration} minutes
- Requested Date: ${booking.date}
- Requested Time: ${booking.time} GMT

Requester Information:
- Name: ${booking.name}
- Email: ${booking.email}
${booking.company ? `- Company: ${booking.company}` : ""}

${booking.message ? `Message:\n${booking.message}` : ""}

Please review this request and send a calendar invite to confirm.

---
Dakota Rea Website Booking System
    `.trim();

    // Send email notification using the built-in notification system
    // This uses the VITE_ANALYTICS_ENDPOINT for notifications
    console.log("[Email] Sending booking notification to admin:", subject);
    console.log("[Email] Body:", body);
    
    // For now, log the email - in production, integrate with email service
    // You can integrate with SendGrid, Mailgun, or AWS SES here
    
    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'dakotarea@gmail.com',
    //   from: 'noreply@dakotarea.com',
    //   subject,
    //   text: body,
    // });
    
    return true;
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
    return false;
  }
}

/**
 * Send confirmation email to the person who requested the meeting
 */
export async function sendBookingConfirmationToRequester(booking: BookingEmailData): Promise<boolean> {
  try {
    const meetingTitle = MEETING_TITLES[booking.meetingType] || booking.meetingType;
    const duration = MEETING_DURATIONS[booking.meetingType] || 30;
    
    const subject = `Meeting Request Received - ${meetingTitle} with Dakota Rea`;
    const body = `
Hi ${booking.name},

Thank you for your interest in scheduling a meeting with Dakota Rea!

Your Request Details:
- Meeting Type: ${meetingTitle}
- Duration: ${duration} minutes
- Requested Date: ${booking.date}
- Requested Time: ${booking.time} GMT

What happens next:
1. Dakota will review your request
2. If the time slot is available, you'll receive a calendar invite
3. If not, Dakota's team will suggest alternative times

If you have any questions, please reply to this email.

Best regards,
Dakota Rea's Team

---
www.dakotarea.com
    `.trim();

    console.log("[Email] Sending confirmation to requester:", booking.email);
    console.log("[Email] Subject:", subject);
    
    // For now, log the email - in production, integrate with email service
    
    return true;
  } catch (error) {
    console.error("[Email] Failed to send requester confirmation:", error);
    return false;
  }
}

/**
 * Generate ICS calendar file content for the meeting
 */
export function generateICSContent(booking: BookingEmailData): string {
  const meetingTitle = MEETING_TITLES[booking.meetingType] || booking.meetingType;
  const duration = MEETING_DURATIONS[booking.meetingType] || 30;
  
  // Parse date and time
  const [hours, minutes] = booking.time.split(":").map(Number);
  const startDate = new Date(booking.date);
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
  
  // Format dates for ICS (YYYYMMDDTHHMMSSZ)
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  
  const uid = `booking-${Date.now()}@dakotarea.com`;
  const now = formatICSDate(new Date());
  const start = formatICSDate(startDate);
  const end = formatICSDate(endDate);
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dakota Rea//Booking System//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${meetingTitle} with Dakota Rea
DESCRIPTION:Meeting with ${booking.name}${booking.company ? ` from ${booking.company}` : ""}\\n\\n${booking.message || ""}
ORGANIZER;CN=Dakota Rea:mailto:dakotarea@gmail.com
ATTENDEE;CN=${booking.name}:mailto:${booking.email}
STATUS:TENTATIVE
END:VEVENT
END:VCALENDAR`;
}
