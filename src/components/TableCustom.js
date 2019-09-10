import React, { Component } from "react";
import tableData from "./tableData";
import * as updateTable from "../utils/updateTable";
import "../styles/tableStyle.css";
import "../styles/inputStyle.css";

class TableCustom extends Component {
  constructor(props) {
    super(props);
    this.state = { tableData };
    this.onCellChange = this.onCellChange.bind(this);
  }

  updateTable1(index, value) {
    let data = [...this.state.tableData.tableData1];
    if (index !== 10) {
      data[index].fixedCosts = value;

      let total = 0;
      data[10].fixedCosts = total;

      for (var i = 0; i < data.length - 1; i++) {
        total += data[i].fixedCosts; //Update new total
      }
      data[10].fixedCosts = total;
      this.setState({ data });
    }
  }

  updateTable2(index, value, columnIndex) {
    //Update table 2 values based on monthly income
    let dataT2 = [...this.state.tableData.tableData2];
    if (columnIndex === 4) {
      //Update monthly income
      dataT2[0].monthlyIncome = value;
      this.setState({ dataT2 });
      this.updateMonthlyGoals();
      this.updateTable3(value, 1);
    } else {
      //Update monthly percentage
      console.log(index);
      dataT2[index].monthlySpendingPercentage = value; //Update percentage
      let percentageTotal = 0;
      for (var i = 0; i < 5; i++) {
        percentageTotal += dataT2[i].monthlySpendingPercentage;
      }
      if (percentageTotal > 100) {
        alert("Monthly Spending Percentage must not exceed 100%!");
      }

      this.setState({ dataT2 });
      this.updateMonthlyGoals(); //Recalculate monthly spending goals
      this.updateTable4();
    }
  }

  updateMonthlyGoals() {
    let data = [...this.state.tableData.tableData2];
    for (var i = 0; i < 5; i++) {
      data[i].monthlySpendingGoals =
        data[0].monthlyIncome * (data[i].monthlySpendingPercentage/100);
    }
    data[0].personalAnnualIncome = data[0].monthlyIncome * 12;
    this.setState({ data });
  }

  updateTable3(value, call) {
    let dataT2 = [...this.state.tableData.tableData2];
    let dataT3 = [...this.state.tableData.tableData3];
    if (!call) {
      dataT3[0].businessProfitMargins = value;
    }
    dataT3[0].annualRevenueNeeded =
      dataT2[0].personalAnnualIncome / (dataT3[0].businessProfitMargins / 100);
    dataT3[0].monthlyRevenueNeeded = dataT3[0].annualRevenueNeeded / 12;
    this.setState({ dataT3 });
  }

  updateTable4() {
    let dataT2 = [...this.state.tableData.tableData2];
    let dataT4 = [...this.state.tableData.tableData4];
    let compoundTotal = 0; //Keep a running total of the annual asset income

    for (var i = 0; i < 5; i++) {
      if (i === 0) {
        dataT4[i].savings =
          (dataT2[1].monthlySpendingGoals + dataT2[2].monthlySpendingGoals) *
          12;
      } else {
        compoundTotal += dataT4[i - 1].annualAssetIncome;
        dataT4[i].savings = dataT4[0].savings * (i+1) + compoundTotal;
      }
      console.log(dataT4[0].percentReturn);
      dataT4[i].monthlyAssetIncome =
        dataT4[i].savings * (dataT4[0].percentReturn / 100 / 12);
      //dataT4[i].monthlyAssetIncome = parseFloat(dataT4[i].monthlyAssetIncome.toFixed(2));
      dataT4[i].annualAssetIncome =
        dataT4[i].savings * (dataT4[0].percentReturn / 100);
      //dataT4[i].annualAssetIncome = parseFloat(dataT4[i].annualAssetIncome.toFixed(2));
    }
    this.setState({ dataT4 });
  }

  // TODO - Fix the updateTable functions
  onCellChange = (index, value, tableNum, columnIndex) => {
    if (tableNum === 1) {
      this.updateTable1(index, value);
    } else if (tableNum === 2) {
      this.updateTable2(index, value, columnIndex);
    } else if (tableNum === 3) {
      this.updateTable3(value);
    } else if (tableNum === 4) {
      let data = [...this.state.tableData.tableData4];
      data[0].percentReturn = value;
      this.setState({ data });
      this.updateTable4();
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
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 1)
                  }
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
            monthlySpendingPercentage,
            monthlySpendingGoals,
            monthlyIncome,
            recommendedMonthlyIncome,
            personalAnnualIncome
          } = data; //destructuring
          return (
            <tr key={monthlySpendingCategories}>
              <td>{monthlySpendingCategories}</td>
              <td>
                <input
                  type="number"
                  value={monthlySpendingPercentage}
                  style={{
                    height: "1rem",
                    margin: "0 8px 0",
                    borderBottom: "none"
                  }}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 2)
                  }
                />
              </td>
              <td>{monthlySpendingGoals}</td>
              <td>
                <input
                  type="number"
                  value={monthlyIncome}
                  style={{
                    height: "1rem",
                    margin: "0 8px 0",
                    borderBottom: "none"
                  }}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 2, 4)
                  }
                />
              </td>
              <td>{recommendedMonthlyIncome}</td>
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
              <td>
                <input
                  type="number"
                  value={businessProfitMargins}
                  style={{
                    height: "1rem",
                    margin: "0 8px 0",
                    borderBottom: "none"
                  }}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 3)
                  }
                />
              </td>
              <td>{annualRevenueNeeded}</td>
              <td>{monthlyRevenueNeeded}</td>
            </tr>
          );
        });
      case 4:
        myTable = this.state.tableData.tableData4;
        return myTable.map((data, index) => {
          const {
            year,
            savings,
            monthlyAssetIncome,
            annualAssetIncome,
            percentReturn
          } = data; //destructuring
          return (
            <tr
              key={year}
              style={{ backgroundColor: "black" }}
              class="white-text"
            >
              <td>{year}</td>
              <td>{savings}</td>
              <td>{monthlyAssetIncome}</td>
              <td>{annualAssetIncome}</td>
              <td>
                <input
                  type="number"
                  value={percentReturn}
                  style={{
                    height: "1rem",
                    margin: "0 8px 0",
                    borderBottom: "none",
                    backgroundColor: "white"
                  }}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 4)
                  }
                />
              </td>
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
        <th
          key={index}
          class="white-text"
          style={{ backgroundColor: "black", borderColor: "white" }}
        >
          {key.toUpperCase()}
        </th>
      );
    });
  }

  render() {
    return (
      <div>
        <table id="fixedCosts" class="striped">
          <tbody>
            <tr>{this.renderTableHeader(1)}</tr>
            {this.renderTableData(1)}
          </tbody>
        </table>
        <table id="monthlyTable" class="striped">
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
