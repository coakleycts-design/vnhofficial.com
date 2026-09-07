import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const orderNumber = String(body?.orderNumber ?? '').trim();
    const subject = String(body?.subject ?? '').trim();
    const message = String(body?.message ?? '').trim();

    if (!name || !email.includes('@') || !subject || !message) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    const env = (locals as any)?.runtime?.env ?? import.meta.env;
    const apiKey = env.BREVO_API_KEY;
    const toEmail = env.CONTACT_TO_EMAIL;
    const senderEmail = env.BREVO_SENDER_EMAIL;
    const senderName = env.BREVO_SENDER_NAME || 'VNH Website';

    if (!apiKey || !toEmail || !senderEmail) {
      return Response.json({ error: 'Contact form is not configured yet.' }, { status: 503 });
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      orderNumber ? `Order: ${orderNumber}` : '',
      `Topic: ${subject}`,
      '',
      message
    ].filter(Boolean).join('\n');

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail }],
        replyTo: { email, name },
        subject: `[VNH Website] ${subject}`,
        textContent: text
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Brevo contact email failed', response.status, detail);
      return Response.json({ error: 'Unable to send your message right now.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact route error', error);
    return Response.json({ error: 'Unable to send your message right now.' }, { status: 500 });
  }
};
