import nodemailer from 'nodemailer';
import { CompetitionRegistration } from '../types';
import { EVENT_CONFIG } from './config';

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Generate the high-impact HTML email body
function generateEmailHTML(reg: CompetitionRegistration, domain: string): string {
  const ticketUrl = `${domain}/ticket/${reg.id}`;
  
  const memberRows = [reg.leader, ...reg.members].map((m, idx) => `
    <tr style="border-bottom: 1px solid rgba(16, 185, 129, 0.15);">
      <td style="padding: 10px; font-weight: bold; color: #10b981; font-family: monospace;">#${idx + 1}</td>
      <td style="padding: 10px; color: #ffffff; font-weight: 600;">${m.name} ${idx === 0 ? '<span style="font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">Leader</span>' : ''}</td>
      <td style="padding: 10px; color: #d1d5db; font-size: 13px;">${m.branchAndYear}</td>
      <td style="padding: 10px; color: #9ca3af; font-size: 13px;">${m.college}</td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${EVENT_CONFIG.name} Registration Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #02130c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #02130c; padding: 30px 15px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #031a11; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.6);">
            
            <!-- HEADER -->
            <tr>
              <td style="background: linear-gradient(135deg, #059669 0%, #10b981 50%, #0d9488 100%); padding: 35px 25px; text-align: center;">
                <span style="display: inline-block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #02130c; background: #a7f3d0; padding: 4px 12px; border-radius: 20px; font-weight: bold; margin-bottom: 12px;">
                  Official Registration Confirmed
                </span>
                <h1 style="margin: 0; color: #02130c; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">
                  ${EVENT_CONFIG.name}
                </h1>
                <p style="margin: 6px 0 0 0; color: #032b1b; font-size: 14px; font-weight: 700;">
                  2 & 3 December • College Campus
                </p>
              </td>
            </tr>

            <!-- BODY CONTENT -->
            <tr>
              <td style="padding: 30px 25px;">
                <p style="font-size: 16px; margin: 0 0 15px 0; color: #ffffff;">
                  Hello <strong>${reg.leader.name}</strong>,
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #d1d5db; margin: 0 0 25px 0;">
                  Congratulations! Your team registration for <strong style="color: #34d399;">${reg.competitionName}</strong> at <strong>${EVENT_CONFIG.name}</strong> has been successfully received and recorded.
                </p>

                <!-- TICKET PASS BOX -->
                <div style="background-color: #021009; border: 1px dashed rgba(16, 185, 129, 0.4); border-radius: 14px; padding: 20px; margin-bottom: 25px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size: 12px; color: #9ca3af; text-transform: uppercase; font-family: monospace;">Pass ID</td>
                      <td align="right" style="font-size: 12px; color: #9ca3af; text-transform: uppercase; font-family: monospace;">Fee Status</td>
                    </tr>
                    <tr>
                      <td style="font-size: 18px; font-weight: 900; color: #34d399; font-family: monospace; padding-top: 4px;">${reg.id}</td>
                      <td align="right" style="font-size: 16px; font-weight: 900; color: #10b981; font-family: monospace; padding-top: 4px;">₹${reg.fee}/- PAID</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 15px;">
                        <span style="font-size: 12px; color: #9ca3af;">Team Name:</span> <strong style="color: #ffffff; font-size: 14px;">${reg.teamName}</strong><br>
                        <span style="font-size: 12px; color: #9ca3af;">UPI UTR / Ref:</span> <code style="color: #6ee7b7; font-family: monospace;">${reg.payment.transactionId}</code>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- BUTTON TO PASS -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                  <tr>
                    <td align="center">
                      <a href="${ticketUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #02130c; font-weight: 800; font-size: 15px; text-decoration: none; padding: 14px 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
                        🎟️ View & Download Your Digital Pass
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- REGISTERED MEMBERS TABLE -->
                <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #34d399; margin: 0 0 12px 0;">
                  Registered Team Members (${1 + reg.members.length} Total)
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #021009; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.15); margin-bottom: 25px; font-size: 13px;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.08);">
                      <th align="left" style="padding: 8px 10px; color: #9ca3af; font-family: monospace;">#</th>
                      <th align="left" style="padding: 8px 10px; color: #9ca3af;">Name</th>
                      <th align="left" style="padding: 8px 10px; color: #9ca3af;">Branch / Yr</th>
                      <th align="left" style="padding: 8px 10px; color: #9ca3af;">College</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${memberRows}
                  </tbody>
                </table>

                <!-- IMPORTANT EVENT REMINDERS -->
                <div style="background-color: rgba(16, 185, 129, 0.05); border-left: 3px solid #10b981; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                  <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #34d399; text-transform: uppercase;">Important Guidelines:</h4>
                  <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.6; color: #d1d5db;">
                    <li><strong>Dates:</strong> 2 & 3 December. Please report to the campus registration desk by 08:30 AM.</li>
                    <li><strong>Hackathon:</strong> 6 Hours Sprint. Problem statement will be revealed live at 10:00 AM kickoff on Day 1.</li>
                    <li><strong>Ideathon:</strong> Problem statements will be released 5 days before the event on WhatsApp. 3 members total, 5-7 min pitch, 7-8 slides limit.</li>
                    <li><strong>Reel Making:</strong> 2 members total, 60 seconds duration (9:16 vertical reel).</li>
                    <li>Bring your College ID Card and keep this digital pass ready on your phone.</li>
                  </ul>
                </div>

                <!-- COORDINATOR CONTACTS -->
                <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 12px; color: #9ca3af;">
                  <p style="margin: 0 0 8px 0; font-weight: bold; color: #ffffff;">Need any assistance? Contact Student Coordinators:</p>
                  <p style="margin: 3px 0;">• <strong>Yash Jadhav</strong> (Lead Coordinator): <a href="tel:+919518562840" style="color: #34d399; text-decoration: none;">95185 62840</a></p>
                  <p style="margin: 3px 0;">• <strong>Arpit Dambhare</strong> (Technical): <a href="tel:+919421934932" style="color: #34d399; text-decoration: none;">94219 34932</a></p>
                  <p style="margin: 3px 0;">• <strong>Shravan Yadav</strong> (Registrations): <a href="tel:+918275467373" style="color: #34d399; text-decoration: none;">82754 67373</a></p>
                  <p style="margin: 3px 0;">• <strong>Tejas Dhanvij</strong>: <a href="tel:+917507112190" style="color: #34d399; text-decoration: none;">75071 12190</a></p>
                  <p style="margin: 3px 0;">• <strong>Soumya Pounikar</strong>: <a href="tel:+919356406119" style="color: #34d399; text-decoration: none;">93564 06119</a></p>
                </div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #010a06; padding: 20px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid rgba(255,255,255,0.05);">
                <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} ${EVENT_CONFIG.name}. All rights reserved.</p>
                <p style="margin: 0;">This is an automated confirmation message sent to registered participants.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Send automated confirmation email to Team Leader and Teammates.
 * Supports standard SMTP (Gmail App Password / SendGrid / Brevo) or Resend API.
 * Gracefully falls back to mock logging if no SMTP credentials are configured yet.
 */
export async function sendRegistrationConfirmationEmail(
  registration: CompetitionRegistration,
  originDomain: string
): Promise<EmailResult> {
  const domain = originDomain || process.env.NEXT_PUBLIC_APP_URL || 'https://el-nino-synapse.vercel.app';
  const htmlContent = generateEmailHTML(registration, domain);

  // Collect all unique student email addresses (Leader + all Teammates)
  const allEmails = [
    registration.leader.email,
    ...registration.members.map(m => m.email)
  ].filter((email): email is string => Boolean(email && email.includes('@')));

  const uniqueRecipients = Array.from(new Set(allEmails));

  if (uniqueRecipients.length === 0) {
    return { success: false, error: 'No valid recipient email address' };
  }

  // Check if SMTP is configured
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const fromAddress = process.env.SMTP_FROM || `"${EVENT_CONFIG.name}" <${smtpUser || 'noreply@elnino.fest'}>`;

  // 1. If SMTP credentials exist, send via Nodemailer
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: registration.leader.email,
        cc: registration.members.map(m => m.email).filter(e => e && e !== registration.leader.email),
        subject: `🎟️ Pass Confirmed: ${registration.competitionName} (${registration.id}) — ${EVENT_CONFIG.name}`,
        html: htmlContent,
      });

      console.log(`[Email Sent] Successfully delivered confirmation to ${uniqueRecipients.join(', ')} (Message ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.error('[Email Error] Failed to send via SMTP:', err);
      return { success: false, error: err.message };
    }
  }

  // 2. Fallback / Mock mode when no SMTP credentials are set yet
  console.log(`[Email Mock Simulator] Automatic email generated for ${registration.leader.email} and teammates:`);
  console.log(` -> Subject: 🎟️ Pass Confirmed: ${registration.competitionName} (${registration.id})`);
  console.log(` -> Direct Pass Link: ${domain}/ticket/${registration.id}`);
  console.log(` -> To activate live sending, configure SMTP_USER & SMTP_PASS in Vercel Environment Variables.`);

  return { success: true, messageId: 'simulated_mock_id' };
}
