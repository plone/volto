# Email send

To send an email to an arbitrary email address use the /@email-send endpoint.

## Send email

### Mutation function

Use the `emailSendMutation` function to get the mutation for sending an email to an arbitrary email address.

### Hook

Use the `useEmailSend` hook to send an email to an arbitrary email address.

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `name: string`

    - **Required:** Yes

    `from: string`

    - **Required:** Yes

    `to: string`

    - **Required:** Yes

    `subject: string`

    - **Required:** Yes

    `message: string`

    - **Required:** Yes
