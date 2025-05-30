import { useDragLayer } from 'react-dnd';

export function CustomDragLayer() {
  const { isDragging, item, currentOffset, itemType } = useDragLayer(
    (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem() as {
        element?: {
          type?: string;
          children?: Array<
            { type?: string; children?: any[]; text?: string } | string
          >;
        };
        width?: number;
        height?: number;
      } | null,
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
    }),
  );

  if (!isDragging || !currentOffset || !item) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: currentOffset.y - 48,
    left: currentOffset.x - 62,
    transform: 'none',
    pointerEvents: 'none',
    zIndex: 1000,
    border: '2px solid #c4c4c4',
    borderRadius: '4px',
    padding: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    background: 'white',
  };

  function renderElement(element: any): React.ReactNode {
    if (!element) return null;

    if (typeof element.text === 'string') {
      let content: React.ReactNode = element.text;
      if (element.bold) content = <strong>{content}</strong>;
      if (element.italic) content = <em>{content}</em>;
      if (element.underline) content = <u>{content}</u>;
      if (element.code)
        content = <code className="rounded bg-gray-100 px-1">{content}</code>;
      return content;
    }

    const children = (element.children || []).map((child: any, i: number) =>
      renderElement(child),
    );

    switch (element.type) {
      case 'h1':
      case 'title':
        return <h1 className="m-0 p-0 text-3xl font-bold">{children}</h1>;
      case 'h2':
        return <h2 className="m-0 p-0 text-2xl font-semibold">{children}</h2>;
      case 'h3':
        return <h3 className="m-0 p-0 text-xl font-semibold">{children}</h3>;
      case 'ul':
        return <ul className="m-0 list-disc p-0 pl-6">{children}</ul>;
      case 'ol':
        return <ol className="m-0 list-decimal p-0 pl-6">{children}</ol>;
      case 'li':
        return <li>{children}</li>;
      case 'blockquote':
        return (
          <blockquote className="m-0 border-l-4 p-0 pl-4 text-gray-600 italic">
            {children}
          </blockquote>
        );
      case 'p':
      default:
        return <p className="m-0 p-0">{children}</p>;
    }
  }

  return (
    <div style={style}>
      {item && item.element ? (
        renderElement(item.element)
      ) : (
        <span>Moving element...</span>
      )}
    </div>
  );
}
