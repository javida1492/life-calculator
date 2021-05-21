import React, { Component } from "react";
import Table from "./Table";
import tableData from "../../utils/tableData";
import { updateInput } from "./updateTables";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = { tableData };
    this.onCellChange = this.onCellChange.bind(this);
  }

  onCellChange = (tableId, rowIdx, cellIdx) => (e) => {
    const value = parseFloat(e.target.value);
    const tableDataCopy = { ...this.state.tableData }; //Copy the state table object
    const tableTuple = { rowIdx, cellIdx, value, tableDataCopy, tableId };
    console.log(tableDataCopy);
    let newTableData = updateInput(tableTuple);
    this.setState((prevState) => ({ tableData: newTableData }));
  };

  render() {
    return (
      <div>
        <Table
          id={"fixedCostsData"}
          table={this.state.tableData.fixedCostsData}
          onChange={this.onCellChange}
        />
        <Table
          id={"incomeData"}
          table={this.state.tableData.incomeData}
          onChange={this.onCellChange}
        />
        <Table
          id={"monthlySpendingData"}
          table={this.state.tableData.monthlySpendingData}
          onChange={this.onCellChange}
        />
        <Table
          id={"assetsData"}
          table={this.state.tableData.assetsData}
          onChange={this.onCellChange}
        />
        <Table
          id={"businessData"}
          table={this.state.tableData.businessData}
          onChange={this.onCellChange}
        />
      </div>
    );
  }
}

export default Tables;
