import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import '../config/database.js';
import { registerRoutes } from './api.js';

const routes = ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'];

test('registerRoutes exposes the required API endpoints', async () => {
  const app = express();
  registerRoutes(app);

  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Expected a TCP server address');
    }

    const baseUrl = `http://127.0.0.1:${address.port}`;

    const expectedBaseUrl = process.env.CODESPACE_NAME
      ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000';

    for (const route of routes) {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200);

      const body = await response.json();
      assert.equal(body.endpoint, route);
      assert.ok(Array.isArray(body.data));
      assert.equal(body.baseUrl, expectedBaseUrl);
    }
  } finally {
    server.close();
  }
});
