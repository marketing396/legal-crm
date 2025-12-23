import { notifyOwner } from "./_core/notification";

/**
 * Email notification service with support for both Manus built-in notifications
 * and third-party email services (SendGrid, AWS SES, Mailgun, etc.)
 */

export type NotificationMethod = "manus" | "email";

interface EmailNotificationData {
  to: string; // Email address or user name
  subject: string;
  message: string;
  enquiryId?: string;
  clientName?: string;
}

/**
 * Send notification using Manus built-in notification system
 * This sends notifications through the Manus platform to the project owner
 */
async function sendManusNotification(data: EmailNotificationData): Promise<boolean> {
  try {
    const title = data.subject;
    const content = `
${data.message}

${data.enquiryId ? `Enquiry ID: ${data.enquiryId}` : ''}
${data.clientName ? `Client: ${data.clientName}` : ''}
    `.trim();

    const success = await notifyOwner({ title, content });
    return success;
  } catch (error) {
    console.error("[Manus Notification] Failed to send:", error);
    return false;
  }
}

/**
 * Send notification using third-party email service
 * Currently returns a placeholder - implement with your chosen email service
 * 
 * To implement:
 * 1. Choose an email service (SendGrid, AWS SES, Mailgun, etc.)
 * 2. Add the service's SDK to package.json
 * 3. Add API credentials to environment variables
 * 4. Implement the actual email sending logic below
 * 
 * Example for SendGrid:
 * ```
 * import sgMail from '@sendgrid/mail';
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
 * await sgMail.send({
 *   to: data.to,
 *   from: 'noreply@ghazzawilawfirm.com',
 *   subject: data.subject,
 *   text: data.message,
 *   html: `<p>${data.message}</p>`,
 * });
 * ```
 */
async function sendEmailNotification(data: EmailNotificationData): Promise<boolean> {
  try {
    // TODO: Implement actual email sending with your chosen service
    console.log("[Email Service] Would send email:", {
      to: data.to,
      subject: data.subject,
      message: data.message,
    });

    // For now, return true to indicate the function was called
    // Replace this with actual email sending logic
    return true;
  } catch (error) {
    console.error("[Email Service] Failed to send:", error);
    return false;
  }
}

/**
 * Main notification function that handles both methods
 * Set the method parameter to choose between "manus" or "email"
 * 
 * @param data - Notification data including recipient, subject, and message
 * @param method - Notification method: "manus" (built-in) or "email" (third-party)
 * @returns Promise<boolean> - true if notification was sent successfully
 */
export async function sendNotification(
  data: EmailNotificationData,
  method: NotificationMethod = "manus"
): Promise<boolean> {
  if (method === "manus") {
    return await sendManusNotification(data);
  } else {
    return await sendEmailNotification(data);
  }
}

/**
 * Send lawyer assignment notification
 * Notifies the assigned lawyer when they are assigned to an enquiry
 * 
 * @param lawyerEmail - Email address of the assigned lawyer
 * @param lawyerName - Name of the assigned lawyer
 * @param enquiryId - Enquiry ID (e.g., ENQ-0001)
 * @param clientName - Name of the client
 * @param serviceRequested - Type of service requested
 * @param urgency - Urgency level
 * @param method - Notification method to use
 */
export async function notifyLawyerAssignment(
  lawyerEmail: string,
  lawyerName: string,
  enquiryId: string,
  clientName: string,
  serviceRequested: string,
  urgency: string,
  method: NotificationMethod = "manus"
): Promise<boolean> {
  const subject = `New Enquiry Assigned: ${enquiryId}`;
  const message = `
Dear ${lawyerName},

You have been assigned to a new client enquiry.

Enquiry Details:
- Enquiry ID: ${enquiryId}
- Client Name: ${clientName}
- Service Requested: ${serviceRequested}
- Urgency Level: ${urgency}

Please review the enquiry details in the CRM system and take appropriate action.

Best regards,
Ghazzawi Law Firm CRM System
  `.trim();

  return await sendNotification(
    {
      to: lawyerEmail,
      subject,
      message,
      enquiryId,
      clientName,
    },
    method
  );
}

/**
 * Send enquiry status change notification
 * Notifies relevant parties when an enquiry status changes
 */
export async function notifyStatusChange(
  recipientEmail: string,
  recipientName: string,
  enquiryId: string,
  clientName: string,
  oldStatus: string,
  newStatus: string,
  method: NotificationMethod = "manus"
): Promise<boolean> {
  const subject = `Enquiry Status Updated: ${enquiryId}`;
  const message = `
Dear ${recipientName},

The status of enquiry ${enquiryId} has been updated.

Client: ${clientName}
Previous Status: ${oldStatus}
New Status: ${newStatus}

Please check the CRM system for more details.

Best regards,
Ghazzawi Law Firm CRM System
  `.trim();

  return await sendNotification(
    {
      to: recipientEmail,
      subject,
      message,
      enquiryId,
      clientName,
    },
    method
  );
}
