const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  del: vi.fn(),
}));
vi.mock('@plone/volto/helpers/Api/Api', () => ({
  default: class {
    get = api.get;
    post = api.post;
    put = api.put;
    patch = api.patch;
    del = api.del;
  },
}));

// The services of plone/plone.restapi#2061 the backend answers.
const DETECTION = [
  '/@content-types/Plone%20Site',
  '/@behaviors',
  '/@workflows',
];

// Each test gets a fresh module, so nothing is remembered between them.
async function load() {
  vi.resetModules();
  return (await import('./restApiDriver')).loadRestApiDriver;
}

const detections = () =>
  api.get.mock.calls.filter(([path]) => DETECTION.includes(path)).length;

describe('loadRestApiDriver', () => {
  beforeEach(() => {
    Object.values(api).forEach((method) => method.mockReset());
  });

  it("calls plone.restapi through Volto's Api", async () => {
    api.get.mockResolvedValue({});
    api.del.mockResolvedValue(undefined);
    const loadRestApiDriver = await load();

    const driver = await loadRestApiDriver();
    await driver.deleteType('Event');

    expect(api.del).toHaveBeenCalledWith('/@content-types/Event', {
      data: undefined,
      params: undefined,
    });
  });

  it('remembers what the backend has once it is clear', async () => {
    api.get.mockRejectedValue({ status: 404 });
    const loadRestApiDriver = await load();

    const driver = await loadRestApiDriver();
    await loadRestApiDriver();

    expect(driver.capabilities.workflows).toBe(false);
    expect(detections()).toBe(DETECTION.length);
  });

  it('asks again when an answer was unclear', async () => {
    api.get.mockRejectedValue({ status: 401 });
    const loadRestApiDriver = await load();

    await loadRestApiDriver();
    await loadRestApiDriver();

    expect(detections()).toBe(2 * DETECTION.length);
  });
});
