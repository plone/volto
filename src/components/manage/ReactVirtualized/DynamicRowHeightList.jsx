import React from 'react';
import { CellMeasurerCache, List, CellMeasurer } from 'react-virtualized';

export default class DynamicHeightList extends React.PureComponent {
  // As per `react-virtualized` docs, one should use a PureComponent
  // to avoid performance issues
  // We could have used a React.memo + functional component instead,
  // but relied on the class-based implementation for simplicity
  constructor(props) {
    super(props);

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    });

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  _rowRenderer({ index, key, parent, style }) {
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div style={style}>
            <div className="item">{this.props.children[index]}</div>
          </div>
        )}
      </CellMeasurer>
    );
  }

  render() {
    return (
      <List
        {...this.props}
        ref={(element) => {
          this._list = element;
        }}
        deferredMeasurementCache={this._cache}
        overscanRowCount={0}
        rowCount={this.props.children.length}
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._rowRenderer}
        width={200}
        height={500}
      />
    );
  }
}
