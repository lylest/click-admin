import nodemailer, { type Transporter } from 'nodemailer'

/*
 * Outgoing email through the server's own mail server (Exim on the Docker
 * bridge, like the Click Meter app). Configured by environment:
 *   SMTP_HOST            e.g. 172.28.0.1; when unset, email is switched off
 *   SMTP_PORT            default 587 (STARTTLS); 465 uses implicit TLS
 *   SMTP_USER/SMTP_PASS  optional; the bridge relay needs no login
 *   SMTP_TLS_SERVERNAME  name on the mail server's certificate, needed when
 *                        SMTP_HOST is an IP (e.g. mx.clickgroup.co.tz)
 *   SMTP_HELO            name we greet the server with; default
 *                        website.clickgroup.co.tz (Exim rejects the container's
 *                        default "[127.0.0.1]" greeting)
 *   MAIL_FROM            sender; must be a real mailbox (Exim verifies it)
 */

let transport: Transporter | null = null

export const mailEnabled = () => Boolean(process.env.SMTP_HOST)

export const mailFrom = () =>
  process.env.MAIL_FROM || 'Click Group Customer Care <support@clickgroup.co.tz>'

function getTransport() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 587)
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      name: process.env.SMTP_HELO || 'website.clickgroup.co.tz',
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? '' }
        : undefined,
      tls: process.env.SMTP_TLS_SERVERNAME
        ? { servername: process.env.SMTP_TLS_SERVERNAME }
        : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    })
  }
  return transport
}

export async function sendMail(msg: {
  to: string
  subject: string
  text: string
  replyTo?: string
}) {
  if (!mailEnabled()) throw new Error('SMTP_HOST is not set')
  await getTransport().sendMail({ from: mailFrom(), ...msg })
}
