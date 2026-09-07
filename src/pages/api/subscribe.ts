import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    const env = (locals as any)?.runtime?.env ?? import.meta.env;
    const apiKey = env.BREVO_API_KEY;
    const listId = Number(env.BREVO_LIST_ID);

    if (!apiKey || !listId) {
      return Response.json({ error: 'Signup is not configured yet.' }, { status: 503 });
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (!response.ok && response.status !== 204) {
      const detail = await response.text();
      console.error('Brevo subscribe failed', response.status, detail);
      return Response.json({ error: 'Unable to subscribe right now.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Subscribe route error', error);
    return Response.json({ error: 'Unable to subscribe right now.' }, { status: 500 });
  }
};
