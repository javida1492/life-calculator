import React, { Component } from "react";
import tableData from "./tableData";
import "../styles/tableStyle.css";
import "../styles/inputStyle.css";

class TableCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData
    };
    this.onCellChange = this.onCellChange.bind(this);
  }

  handleChange(event) {
    console.log("onChange Event");
  }

  onCellChange = (index, value, tableNum, e) => {
    //console.log("index: ", index, "| value: ", value);
    if (tableNum === 1) {
      let data = [...this.state.tableData.tableData1];
      //console.log(data[index].fixedCosts);
      data[index].fixedCosts = value;

      if (index !== 10) {
        data[index].fixedCosts = value;
        //this.setState({ data }); //update fixedCost cell value at index

        let total = 0;
        data[10].fixedCosts = total;

        for (var i = 0; i < data.length - 1; i++) {
          total += data[i].fixedCosts; //Update new total
        }
        data[10].fixedCosts = total;

        this.setState({data});
      }
    }
  };

  renderTableData(table) {
    let myTable;
    switch (table) {
      case 1:
        myTable = this.state.tableData.tableData1;
        return myTable.map((data, index) => {
          const { category, fixedCosts } = data; //destructuring
          return (
            <tr key={category}>
              <td>{category}</td>
              <td>
                <input
                  type="number"
                  value={fixedCosts}
                  style={{
                    height: "1rem",
                    margin: "0 8px 0",
                    borderBottom: "none"
                  }}
                  step=".01"
                  onChange={e => this.onCellChange(index, parseFloat(e.target.value), 1)}
                />
              </td>
            </tr>
          );
        });
      case 2:
        myTable = this.state.tableData.tableData2;
        return myTable.map((data, index) => {
          const {
            monthlySpendingCategories,
            monthlySpendingGoals,
            monthlyIncome,
            personalAnnualIncome
          } = data; //destructuring
          return (
            <tr key={monthlySpendingCategories}>
              <td>{monthlySpendingCategories}</td>
              <td>{monthlySpendingGoals}</td>
              <td>{monthlyIncome}</td>
              <td>{personalAnnualIncome}</td>
            </tr>
          );
        });
      case 3:
        myTable = this.state.tableData.tableData3;
        return myTable.map((data, index) => {
          const {
            businessProfitMargins,
            annualRevenueNeeded,
            monthlyRevenueNeeded
          } = data; //destructuring
          return (
            <tr key={businessProfitMargins}>
              <td>{businessProfitMargins}</td>
              <td>{annualRevenueNeeded}</td>
              <td>{monthlyRevenueNeeded}</td>
            </tr>
          );
        });
      case 4:
        myTable = this.state.tableData.tableData4;
        return myTable.map((data, index) => {
          const { year, savings, monthlyAssetIncome, annualAssetIncome } = data; //destructuring
          return (
            <tr key={year}>
              <td>{year}</td>
              <td>{savings}</td>
              <td>{monthlyAssetIncome}</td>
              <td>{annualAssetIncome}</td>
            </tr>
          );
        });
      default:
        break;
    }
  }

  renderTableHeader(table) {
    let myTable;
    switch (table) {
      case 1:
        myTable = this.state.tableData.tableData1[0];
        break;
      case 2:
        myTable = this.state.tableData.tableData2[0];
        break;
      case 3:
        myTable = this.state.tableData.tableData3[0];
        break;
      case 4:
        myTable = this.state.tableData.tableData4[0];
        break;
      default:
        break;
    }
    let header = Object.keys(myTable);
    return header.map((key, index) => {
      return (
        <th key={index} class="white-text" style={{ backgroundColor: "black" }}>
          {key.toUpperCase()}
        </th>
      );
    });
  }

  render() {
    return (
      <div>
        <table id="fixedCosts">
          <tbody>
            <tr>{this.renderTableHeader(1)}</tr>
            {this.renderTableData(1)}
          </tbody>
        </table>
        <table id="monthlyTable">
          <tbody>
            <tr>{this.renderTableHeader(2)}</tr>
            {this.renderTableData(2)}
          </tbody>
        </table>
        <table id="profitMargins">
          <tbody>
            <tr>{this.renderTableHeader(3)}</tr>
            {this.renderTableData(3)}
          </tbody>
        </table>
        <table id="assetsTable">
          <tbody>
            <tr>{this.renderTableHeader(4)}</tr>
            {this.renderTableData(4)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableCustom;
