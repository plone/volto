import filesMiddleware from './files';
import { getAPIResourceWithAuth } from '@plone/volto/helpers/Api/APIResourceWithAuth';

vi.mock('@plone/volto/helpers/Api/APIResourceWithAuth', () => ({
  getAPIResourceWithAuth: vi.fn(),
}));

describe('files middleware', () => {
  it('handles requests containing @@download and forwards headers/body', async () => {
    getAPIResourceWithAuth.mockResolvedValue({
      headers: {
        'content-type': 'text/plain',
        'cache-status': 'Souin; hit; ttl=664',
      },
      body: 'OK',
      get(name) {
        return this.headers[name];
      },
      statusCode: 200,
    });

    const mw = filesMiddleware();
    const layer = mw.stack.find(
      (l) => l.regexp && l.regexp.source.includes('@@download'),
    );
    expect(layer).toBeTruthy();

    const req = {
      path: '/some/@@download',
      method: 'GET',
      app: { locals: {} },
    };
    const res = {
      headers: {},
      set(name, val) {
        this.headers[name] = val;
      },
      status(code) {
        this.statusCode = code;
        return this;
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
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('text/plain');
    expect(res.headers['cache-status']).toBe('Souin; hit; ttl=664');
  });
});
