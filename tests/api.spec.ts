import { test, expect } from '@playwright/test';

/**
 * API route tests — these call the live Next.js server endpoints directly.
 * We only test error-path validation (fast, deterministic).
 * Gemini success-path is covered via E2E assistant tests.
 */

const BASE = 'http://localhost:3005';

test.describe('POST /api/chat — input validation', () => {
  test('returns 415 when Content-Type is not application/json', async ({ request }) => {
    const res = await request.post(`${BASE}/api/chat`, {
      headers: { 'Content-Type': 'text/plain' },
      data: 'hello',
    });
    expect(res.status()).toBe(415);
    const body = await res.json() as { error: string };
    expect(body.error).toBeTruthy();
  });

  test('returns 400 when messages field is missing', async ({ request }) => {
    const res = await request.post(`${BASE}/api/chat`, {
      headers: { 'Content-Type': 'application/json' },
      data: {},
    });
    expect(res.status()).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toMatch(/invalid|empty|messages/i);
  });

  test('returns 400 when messages array is empty', async ({ request }) => {
    const res = await request.post(`${BASE}/api/chat`, {
      headers: { 'Content-Type': 'application/json' },
      data: { messages: [] },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 when all messages have blank content', async ({ request }) => {
    const res = await request.post(`${BASE}/api/chat`, {
      headers: { 'Content-Type': 'application/json' },
      data: { messages: [{ role: 'user', content: '   ' }] },
    });
    // blank-only content is stripped → no valid messages → 400
    expect(res.status()).toBe(400);
  });
});

test.describe('POST /api/learn/generate — input validation', () => {
  test('returns 400 when title is missing', async ({ request }) => {
    const res = await request.post(`${BASE}/api/learn/generate`, {
      headers: { 'Content-Type': 'application/json' },
      data: { guideId: 'test', contentPrompt: 'test prompt' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 when guideId is missing', async ({ request }) => {
    const res = await request.post(`${BASE}/api/learn/generate`, {
      headers: { 'Content-Type': 'application/json' },
      data: { title: 'Test', contentPrompt: 'test prompt' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 when contentPrompt is missing', async ({ request }) => {
    const res = await request.post(`${BASE}/api/learn/generate`, {
      headers: { 'Content-Type': 'application/json' },
      data: { guideId: 'test', title: 'Test' },
    });
    expect(res.status()).toBe(400);
  });
});
