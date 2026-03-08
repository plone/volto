# Comments

Plone offers to users a feature to post comments on any content object with `plone.app.discussion`.

Commenting can be enabled globally for specific content types and for single content objects.

When commenting is enabled on your content object, you can retrieve a list of all existing comments, add new comments, reply to existing comments, or delete a comment.

## Get comments list

### Query function

Use the `getCommentsListQuery` function to get the query for fetching the comments list for a page.

### Hook

Use the `useGetCommentsList` hook to get the comments list for a page.

### Parameters

- **path**: string

  - **Required:** Yes

## Add comment

### Mutation function

Use the `createCommentMutation` function to get the mutation for adding a comment for a page.

### Hook

Use the `useCreateComment` hook to add a comment for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **`reply_id`**: string

  - **Required:** No
  - The id of the comment to which you want to reply

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `text: string`

    - **Required:** Yes
    - The content of the comment.

## Update comment

### Mutation function

Use the `updateCommentMutation` function to get the mutation for updating a comment for the given id and path.

### Hook

Use the `useUpdateComment` hook to update a comment for the given id and path.

### Parameters

- **path**: string

  - **Required:** Yes

- **`comment_id`**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `text: string`

    - **Required:** Yes
    - The content of the comment.

## Delete comment

### Mutation function

Use the `deleteCommentMutation` function to get the mutation for deleting a comment for the given id and path.

### Hook

Use the `useDeleteComment` hook to delete a comment for the given id and path.

### Parameters

- **path**: string

  - **Required:** Yes

- **`comment_id`**: string

  - **Required:** Yes
