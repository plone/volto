export function setHashLink(hash, data = {}) {
  return {
    type: 'SET_HASH_LINK',
    hash,
    data,
  };
}

export function resetHashLink() {
  return {
    type: 'RESET_HASH_LINK',
  };
}
