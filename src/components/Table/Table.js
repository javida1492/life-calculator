import React, { Component } from "react";
import "./tableStyles.css";
import "../Input/inputStyles.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
    this.renderRowData = this.renderRowData.bind(this);
  }

  //=====================================================//
  // Function receives an array of table row data and    //
  // returns an array of row data created from the array //
  //=====================================================//
  renderRowData(rowData, rowIdx, tableId) {
    return rowData.map((cell, cellIdx) => {
      const { id, result, value, header } = cell;
      const cellId = tableId + "Row_" + rowIdx + cellIdx;
      if (id !== undefined) {
        return <td key={cellId}>{id}</td>;
      } else if (value !== undefined) {
        return (
          <td key={cellId}>
            <input
              value={value}
              type="number"
              placeholder="0"
              onChange={this.props.onChange(tableId, rowIdx, cellIdx)}
            />
          </td>
        );
      } else if (result !== undefined) {
        return <td key={cellId}>{result}</td>;
      } else if (header !== undefined) {
        return <th key={cellId}>{header}</th>;
      } else {
        return null;
      }
    });
  }

  //=====================================================//
  // Function receives a table object, iterates over the //
  // the table rows, and returns a table body of rows    //
  //=====================================================//
  renderTableData(table, tableId) {
    return table.map((rowData, rowIdx) => {
      if (!Array.isArray(rowData)) {
        rowData = [rowData];
      }
      const rowId = tableId + "Row_" + rowIdx;
      return (
        <tr key={rowId}>{this.renderRowData(rowData, rowIdx, tableId)}</tr>
      );
    });
  }

  render() {
    const { table, id } = this.props;
    return (
      <div>
        <table key={id}>
          <tbody key={id + "body"}>{this.renderTableData(table, id)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
