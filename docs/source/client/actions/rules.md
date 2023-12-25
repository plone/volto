# Rules

## Get rules

### Query function

Use the `getRulesQuery` function to get the query for fetching the content-rules for a page.

### Hook

Use the `useGetRules` hook to get the content-rules for a page.

### Parameters

- **path**: string

  - **Required:** Yes

## Add rule

### Mutation function

Use the `createRuleMutation` function to get the mutation for adding a content-rule to a page.

### Hook

Use the `useCreateRule` hook to add a content-rule to a page.

### Parameters

- **`ruleId`**: string

  - **Required:** Yes

## Update rules

### Mutation function

Use the `updateRulesMutation` function to get the mutation for updating content-rules for the given rule ids.

### Hook

Use the `useUpdateRules` hook to update content-rules for the given rule ids.

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `form.button.Bubble: boolean`

    - **Required:** No

    `form.button.NoBubble: boolean`

    - **Required:** No

    `form.button.Enable: boolean`

    - **Required:** No

    `form.button.Disable: boolean`

    - **Required:** No

    `rules_ids: string[]`

    - **Required:** No

    `operation: string`

    - **Required:** No

## Delete rule

### Mutation function

Use the `deleteRulesMutation` function to get the mutation for deleting a content-rule for the given rule ids.

### Hook

Use the `useDeleteRules` hook to delete a content-rule for the given rule ids.

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `rules_ids: string[]`

    - **Required:** Yes
