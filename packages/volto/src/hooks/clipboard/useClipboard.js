import { useState, useRef, useEffect, useCallback } from 'react';

export default function useClipboard(clipboardText = '') {
  const stringToCopy = useRef(clipboardText);
  const [copied, setCopied] = useState(false);

  //synchronous: window.clipboardData.setData(options.format || "text", text);
  const copyToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const copyAction = useCallback(async () => {
    try {
      await copyToClipboard(stringToCopy.current);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  }, [stringToCopy]);

  useEffect(() => {
    stringToCopy.current = clipboardText;
  }, [clipboardText]);

  return [copied, copyAction, setCopied];
}
