# Email notification

## Contact site owner (contact form)

Plone allows the user to contact the site owner via a form on the website.
This makes sure the site owner doesn't have to expose their email addresses publicly.
At the same time, it allows the users to reach out to the site owners.

## Send email notification

### Mutation function

Use the `emailNotificationQuery` function to get the mutation for sending an email notification to the site owner or the specified user.

### Hook

Use the `useEmailNotification` hook to send an email notification to the site owner or the specified user.

### Parameters

- **user**: string

  - **Required:** No
  - The user who is receiving the email notification. If not specified the site owner will receive the email notification.

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `name: string`

    - **Required:** Yes

    `from: string`

    - **Required:** Yes

    `subject: string`

    - **Required:** Yes

    `message: string`

    - **Required:** Yes
