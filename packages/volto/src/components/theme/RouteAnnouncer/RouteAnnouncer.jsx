import { useEffect, useState } from 'react';

function RouteAnnouncer() {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    function updatePage(title) {
      setPageTitle(title);
      document.activeElement.blur();
    }
    function handlePop(event) {
      const pageTitle = event.target.document.title;
      updatePage(pageTitle);
    }

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
              updatePage(node.textContent);
            }
          }
        }
      }
    });
    observer.observe(document.querySelector('title'), {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
    window.addEventListener('popstate', handlePop);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handlePop);
    };
  }, []);

  return (
    <p
      id="route-announcer"
      role="alert"
      // Off-screen element with 'best' browser support
      style={{
        border: 0,
        clip: 'rect(1px 1px 1px 1px)', // IE-style CSS for compatibility
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {pageTitle}
    </p>
  );
}

export default RouteAnnouncer;
