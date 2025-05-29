export const getSevenBlockIdFromHandler = (api: any): string =>
  // Find the first node above the current node which has an id which is an uuid.
  // Unfortunately, the sub-nodes in the tree can also have ids, which are not
  // Seven ids, so we need to filter them out.k
  api.above({
    match: (node: any) =>
      node.id?.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      ),
  })[0]?.id;
