import imagesMiddleware from './images';
import { getAPIResourceWithAuth } from '@plone/volto/helpers/Api/APIResourceWithAuth';

vi.mock('@plone/volto/helpers/Api/APIResourceWithAuth', () => ({
  getAPIResourceWithAuth: vi.fn(),
}));

describe('images middleware', () => {
  it('handles requests containing @@images and forwards headers/body', async () => {
    getAPIResourceWithAuth.mockResolvedValue({
      headers: {
        'content-type': 'image/png',
        'cache-status': 'Souin; hit; ttl=664',
      },
      body: 'OK',
    });

    const mw = imagesMiddleware();
    const layer = mw.stack.find(
      (l) => l.regexp && l.regexp.source.includes('@@images'),
    );
    expect(layer).toBeTruthy();

    const req = {
      path: '/some/@@images/image',
      method: 'GET',
      app: { locals: {} },
    };
    const res = {
      headers: {},
      set(name, val) {
        this.headers[name] = val;
      },
      send(body) {
        this.body = body;
      },
    };

    // invoke the middleware handler for that layer
    layer.handle(req, res, (err) => {
      if (err) throw err;
    });

    await new Promise(process.nextTick);

    expect(res.body).toBe('OK');
    expect(res.headers['content-type']).toBe('image/png');
    expect(res.headers['cache-status']).toBe('Souin; hit; ttl=664');
  });
});
