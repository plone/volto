# Transactions

The `@transactions` endpoint exposes transactions that have been made through the Plone website.
Each change through the Plone website is listed.
It also allows to revert transactions so that the Plone website can be reverted to a previous state.

## Get Transactions

### Query function

Use the `getTransactionsQuery` function to get the query for fetching the list of all transactions in the portal.

### Hook

Use the `useGetTransactions` hook to get the list of all transactions in the portal.

## Revert Transactions

### Mutation function

Use the `revertTransactionsMutation` function to get the mutation for reverting transactions in the portal.

### Hook

Use the `useRevertTransactions` hook to revert transactions in the portal.

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    - **transactionIds**: string[]

      - **Required**: Yes
