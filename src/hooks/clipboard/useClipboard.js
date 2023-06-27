import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

export default function useClipboard(clipboardText = '') {
  const stringToCopy = useRef(clipboardText);
  const [copied, setCopied] = useState(false);
  const action = useSelector((state) => state.clipboard.action);
  const source = useSelector((state) => state.clipboard.source, shallowEqual);
  //synchronous: window.clipboardData.setData(options.format || "text", text);
  const copyToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const copyAction = useCallback(() => {
    const copiedString = copyToClipboard(stringToCopy.current);
    setCopied(copiedString);
  }, [stringToCopy]);

  useEffect(() => {
    stringToCopy.current = clipboardText;
  }, [clipboardText]);

  return [copied, copyAction, setCopied, action, source];
}
