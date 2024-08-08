import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

class DynamicHeightList extends React.PureComponent {
  // As per `react-virtualized` docs, one should use a PureComponent
  // to avoid performance issues
  // We could have used a React.memo + functional component instead,
  // but relied on the class-based implementation for simplicity
  constructor(props) {
    super(props);

    this._cache = new props.reactVirtualized.CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    });

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children.length !== this.props.children.length) {
      if (this._list && this._list.forceUpdateGrid) {
        this._list.forceUpdateGrid();
      }
      this._cache.clearAll();
    }
  }

  _rowRenderer({ index, key, parent, style }) {
    const CellMeasurer = this.props.reactVirtualized.CellMeasurer;
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => (
          <div style={style} ref={registerChild}>
            {this.props.children[index]}
          </div>
        )}
      </CellMeasurer>
    );
  }

  render() {
    const List = this.props.reactVirtualized.List;

    return (
      <List
        {...this.props}
        ref={(element) => {
          this._list = element;
        }}
        deferredMeasurementCache={this._cache}
        overscanRowCount={0}
        rowCount={this.props.children?.length || 0}
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._rowRenderer}
        width={200}
        height={500}
      />
    );
  }
}

export default injectLazyLibs('reactVirtualized')(DynamicHeightList);
