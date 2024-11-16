import fs from 'node:fs/promises';
import express from 'express';
import getPort, { portNumbers } from 'get-port';
import dns from 'dns';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  dns.setDefaultResultOrder('ipv4first');
  const app = express();

  const prodIndexHtml = isProd
    ? await fs.readFile('./event_scheduler/dist/client/index.html', 'utf-8')
    : '';

  let vite;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const sirv = (await import('sirv')).default;
    app.use((await import('compression')).default());
    app.use('/', sirv('./event_scheduler/dist/client', { extensions: [] }));
  }

  // Middleware to parse JSON requests
  app.use(express.json());

  // Event scheduling validation logic
  app.post('/schedule-event', (req, res) => {
    const { startDatetime, endDatetime, isAllDay, isRecurring } = req.body;

    if (!startDatetime) {
      return res.status(400).json({ error: 'Start datetime is required.' });
    }

    const start = new Date(startDatetime);
    let end = endDatetime ? new Date(endDatetime) : null;

    // Validate event times
    if (end && end <= start) {
      return res.status(400).json({
        error: 'End datetime must be after start datetime.',
      });
    }

    // Handle all-day event logic
    if (isAllDay) {
      const startDate = new Date(start.toDateString());
      const endDate = new Date(start.toDateString());
      endDate.setHours(23, 59, 59);
      end = endDate;

      return res.json({
        message: 'All-day event created.',
        event: { start: startDate, end: endDate },
      });
    }

    // Handle recurring event logic
    if (isRecurring && !end) {
      return res.json({
        message: 'Recurring event created without end datetime.',
        event: { start },
      });
    }

    // Return successful response
    res.json({
      message: 'Event scheduled successfully.',
      event: { start, end },
    });
  });

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      if (url.includes('.')) {
        console.warn(`${url} is not valid router path`);
        res.status(404);
        res.end(`${url} is not valid router path`);
        return;
      }

      let viteHead = !isProd
        ? await vite.transformIndexHtml(
            url,
            `<html><head></head><body></body></html>`,
          )
        : prodIndexHtml;

      viteHead = viteHead.substring(
        viteHead.indexOf('<head>') + 6,
        viteHead.indexOf('</head>'),
      );

      const entry = await (async () => {
        if (!isProd) {
          return vite.ssrLoadModule('/src/entry-server.tsx');
        } else {
          return import('./event_scheduler/dist/server/entry-server.js');
        }
      })();

      console.log('Rendering: ', url, '...');
      entry.render({ req, res, url, head: isProd ? viteHead : '' });
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(async ({ app }) =>
    app.listen(
      await getPort({ port: portNumbers(3000, 3100) }),
      '0.0.0.0',
      () => {
        console.log('Client Server: http://localhost:3000');
      },
    ),
  );
}
