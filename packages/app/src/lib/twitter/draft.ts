export function draftMessage() {
  // Pre-draft message
  const message = '';

  // URL-encode the message
  const encodedMessage = encodeURIComponent(message);

  // Twitter URL for creating a new tweet with the pre-drafted message
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
  return twitterLink;
}
