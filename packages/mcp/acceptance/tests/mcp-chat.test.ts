import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';

test.describe('MCP chat route', () => {
  test('As an editor, I can start an MCP chat session from @@mcp-chat', async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const mcpRequests: string[] = [];
    const mcpResponses: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });
    page.on('request', (request) => {
      if (request.url().includes('/@mcp/')) {
        mcpRequests.push(`${request.method()} ${request.url()}`);
      }
    });
    page.on('response', async (response) => {
      if (response.url().includes('/@mcp/')) {
        mcpResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    await login(page);
    await page.goto('/@@mcp-chat', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('heading', { name: 'Seven-native MCP chat' }),
    ).toBeVisible();

    const startButton = page.getByRole('button', {
      name: 'Start chat session',
    });
    await expect(startButton).toBeVisible();

    await startButton.click();

    await expect
      .poll(() => mcpRequests.slice())
      .toContainEqual(expect.stringContaining('POST'));

    await expect
      .poll(async () => {
        const text = await page.locator('main').textContent();
        return text ?? '';
      })
      .toContain('conv_');

    await page.waitForTimeout(1500);

    await expect
      .poll(async () => {
        const text = await page.locator('main').textContent();
        return text ?? '';
      })
      .toContain('conv_');

    const input = page.getByLabel('Chat message');
    const sendButton = page.getByRole('button', { name: 'Send' });

    await expect(input).toBeEnabled();
    await expect(sendButton).toBeEnabled();

    await input.fill('Hello MCP');
    await sendButton.click();

    await expect
      .poll(() => mcpResponses.slice())
      .toContainEqual(expect.stringContaining('/@mcp/chat'));

    await expect(page.getByText('Hello MCP')).toBeVisible();
    await expect(
      page.getByText('No MCP chat provider is configured'),
    ).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
});
