import linkifyIt from 'linkify-it';

const linkify = linkifyIt();

export const getUrlFromString = (text) => {
  const matchLinkList = linkify.match(text);
  return matchLinkList && matchLinkList[0].url;
};

export const isURL = (text) => {
  return !!linkify.match(text);
};
