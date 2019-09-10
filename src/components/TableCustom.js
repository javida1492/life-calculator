import React, { Component } from "react";
import tableData from "./tableData";
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

  updateTable2(value, columnIndex) {
    //Update table 2 values based on monthly income
    if (columnIndex === 2) {
      let dataT2 = [...this.state.tableData.tableData2];
      dataT2[0].monthlyIncome = value;
      for (var i = 0; i < 5; i++) {
        dataT2[i].monthlySpendingGoals =
          dataT2[0].monthlyIncome * dataT2[i].monthlySpendingPercentage;
      }
      dataT2[0].personalAnnualIncome = dataT2[0].monthlyIncome * 12;
      this.setState({ dataT2 });
      this.updateTable3(value, 1);
    } else {
      //Column index = 1; Changing percentagesm
      let dataTable2;
    }
  }

  updateTable3(value, call) {
    let dataT2 = [...this.state.tableData.tableData2];
    let dataT3 = [...this.state.tableData.tableData3];
    if(!call){
      dataT3[0].businessProfitMargins = value;
    }
    dataT3[0].annualRevenueNeeded =
      dataT2[0].personalAnnualIncome / (dataT3[0].businessProfitMargins / 100);
    dataT3[0].monthlyRevenueNeeded = dataT3[0].annualRevenueNeeded / 12;
    this.setState({ dataT3 });
  }

  updateTable4() {
    let data = [...this.state.tableData.tableData4];
    let compoundTotal = 0; //Keep a running total of the annual asset income

    for (var i = 0; i < 5; i++) {
      if (i === 0) {
        data[i].savings =
          (data[1].monthlySpendingGoals + data[2].monthlySpendingGoals) * 1.2;
      } else {
        compoundTotal += data[i - 1].annualAssetIncome;
        data[i].savings = data[i - 1].savings * 2 + compoundTotal;
      }
      data[i].monthlyAssetIncome = data[i].savings / 120;
      data[i].annualAssetIncome = data[i].savings * 0.1;
    }
    this.setState({ data });
  }

  onCellChange = (index, value, tableNum, columnIndex) => {
    if (tableNum === 1) {
      this.updateTable1(index, value);
    } else if (tableNum === 2) {
      this.updateTable2(value, columnIndex);
    } else if (tableNum === 3) {
      this.updateTable3(value);
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
                    this.onCellChange(index, parseFloat(e.target.value), 2, 1)
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
                    this.onCellChange(index, parseFloat(e.target.value), 2, 2)
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
        <table id="assetsTable" class="striped">
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
