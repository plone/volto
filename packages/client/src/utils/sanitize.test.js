import request from 'supertest';
import { createServer } from '../server'; // Path to your server.js file

describe('POST /schedule-event', () => {
  let app;

  beforeAll(async () => {
    // Create the app with your server function
    const server = await createServer();
    app = server.app;
  });

  it('should remove "@" from request body', async () => {
    const response = await request(app)
      .post('/schedule-event')
      .send({
        startDatetime: '2024-12-25T10:00:00Z',
        endDatetime: '2024-12-25T12:00:00Z',
        isAllDay: false,
        isRecurring: false,
        email: 'test@example@domain.com', // This contains '@' to be removed
      });

    // Ensure no "@" is present in the email field after sanitization
    expect(response.body.event).toBeDefined();
    expect(response.body.message).toBe('Event scheduled successfully.');
    expect(response.body.event.email).not.toContain('@'); // Ensure no @ in the email
  });

  it('should handle "@" in query params correctly', async () => {
    const response = await request(app)
      .get('/schedule-event?email=test@example@domain.com') // This contains '@' to be removed
      .send();

    // Ensure no "@" is present in the query parameter after sanitization
    expect(response.status).toBe(200); // Adjust as per the response you expect
    expect(response.body.email).not.toContain('@'); // Ensure no @ in the email
  });
});
