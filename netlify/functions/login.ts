/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Handler } from '@netlify/functions';

const BASE_URL = process.env.NF_BACKEND_URL;
const CLIENT_ID = process.env.NF_CLIENT_ID;
const CLIENT_SECRET = process.env.NF_CLIENT_SECRET;

const TOKEN_PATH = '/oauth/token';

export const handler: Handler = async (event: any) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!BASE_URL || !CLIENT_ID || !CLIENT_SECRET) {
      return { statusCode: 500, body: 'Missing server environment variables' };
    }

    // O body chega como string (x-www-form-urlencoded ou JSON).
    // Vamos aceitar ambos para conveniência.
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    let body: Record<string, unknown> = {};

    if (contentType.includes('application/json')) {
      body = JSON.parse(event.body || '{}');
    } else {
      // trata como x-www-form-urlencoded por padrão
      const params = new URLSearchParams(event.body || '');
      body = Object.fromEntries(params.entries());
    }

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // Constrói corpo como application/x-www-form-urlencoded
    const formData = new URLSearchParams();
    for (const [k, v] of Object.entries(body)) {
      if (v !== undefined && v !== null) {
        formData.append(k, String(v));
      }
    }

    // Faz a requisição para o backend
    const resp = await fetch(`${BASE_URL}${TOKEN_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basic}`,
      },
      body: formData,
    });

    const text = await resp.text();
    let responseBody: string;
    let responseHeaders: Record<string, string>;

    try {
      responseBody = JSON.stringify(JSON.parse(text));
      responseHeaders = { 'Content-Type': 'application/json' };
    } catch {
      // Caso não seja JSON, devolve como texto
      responseBody = text;
      responseHeaders = { 'Content-Type': 'text/plain; charset=utf-8' };
    }

    return {
      statusCode: resp.status,
      headers: responseHeaders,
      body: responseBody,
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'proxy_error', message: err?.message ?? 'unknown_error' }),
    };
  }
};