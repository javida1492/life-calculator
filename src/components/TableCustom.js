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
      this.updateTable5(value, 1);
    }
  }

  updateTable2(index, value) {
    //Update table 2 values based on monthly income
    let dataT2 = [...this.state.tableData.tableData2];
    //Update monthly percentage
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
    this.updateTable5(value, 1);
  }

  updateMonthlyGoals() {
    let dataT2 = [...this.state.tableData.tableData2];
    let dataT5 = [...this.state.tableData.tableData5];
    for (var i = 0; i < 5; i++) {
      dataT2[i].monthlySpendingGoals =
        dataT5[0].monthlyIncome * (dataT2[i].monthlySpendingPercentage / 100);
    }
    this.setState({ dataT2 });
  }

  updateTable3(value, call) {
    let dataT5 = [...this.state.tableData.tableData5];
    let dataT3 = [...this.state.tableData.tableData3];
    if (!call) {
      dataT3[0].businessProfitMargins = value;
    }
    dataT3[0].annualRevenueNeeded =
      dataT5[0].personalAnnualIncome / (dataT3[0].businessProfitMargins / 100);
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
        dataT4[i].savings = dataT4[0].savings * (i + 1) + compoundTotal;
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

  updateTable5(value, call) {
    let data = [...this.state.tableData.tableData5];
    let dataT1 = [...this.state.tableData.tableData1];
    let dataT2 = [...this.state.tableData.tableData2];
    if (call) {
      data[0].recommendedMonthlyIncome =
        dataT1[10].fixedCosts / (dataT2[0].monthlySpendingPercentage / 100);
      this.setState({ data });
    } else {
      data[0].monthlyIncome = value;
      data[0].personalAnnualIncome = data[0].monthlyIncome * 12;
      this.setState({ data });
      this.updateMonthlyGoals();
      this.updateTable3(value, 1);
    }
  }

  // TODO - Fix the updateTable functions
  onCellChange = (index, value, tableNum) => {
    if (tableNum === 1) {
      this.updateTable1(index, value);
    } else if (tableNum === 2) {
      this.updateTable2(index, value);
    } else if (tableNum === 3) {
      this.updateTable3(value);
    } else if (tableNum === 4) {
      let data = [...this.state.tableData.tableData4];
      data[0].percentReturn = value;
      this.setState({ data });
      this.updateTable4();
    } else if (tableNum === 5) {
      this.updateTable5(value);
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
            <tr
              key={category}
              style={{ backgroundColor: "black" }}
              class="white-text"
            >
              <td>{category}</td>
              <td>
                <input
                  type="number"
                  value={fixedCosts}
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
            monthlySpendingGoals
          } = data; //destructuring
          return (
            <tr key={monthlySpendingCategories}>
              <td>{monthlySpendingCategories}</td>
              <td>
                <input
                  type="number"
                  value={monthlySpendingPercentage}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 2)
                  }
                />
              </td>
              <td>{monthlySpendingGoals}</td>
            </tr>
          );
        });
      case 3:
        myTable = this.state.tableData.tableData3;
        return myTable.map((data, index) => {
          const {
            businessProfitMargins,
            monthlyRevenueNeeded,
            annualRevenueNeeded
          } = data; //destructuring
          return (
            <tr key={businessProfitMargins}>
              <td>
                <input
                  type="number"
                  value={businessProfitMargins}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 3)
                  }
                />
              </td>
              <td>{monthlyRevenueNeeded}</td>
              <td>{annualRevenueNeeded}</td>
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
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 4)
                  }
                />
              </td>
            </tr>
          );
        });
      case 5:
        myTable = this.state.tableData.tableData5;
        return myTable.map((data, index) => {
          const {
            monthlyIncome,
            recommendedMonthlyIncome,
            personalAnnualIncome
          } = data; //destructuring
          return (
            <tr>
              <td>
                <input
                  type="number"
                  value={monthlyIncome}
                  step=".01"
                  onChange={e =>
                    this.onCellChange(index, parseFloat(e.target.value), 5)
                  }
                />
              </td>
              <td>{recommendedMonthlyIncome}</td>
              <td>{personalAnnualIncome}</td>
            </tr>
          );
        });
      default:
        break;
    }
  }

  renderTableHeaders(table){
    let myTable;
    switch (table) {
      case 1:
        myTable = this.state.tableData.headerTable[0];
        break;
      case 2:
        myTable = this.state.tableData.headerTable[1];
        break;
      case 3:
        myTable = this.state.tableData.headerTable[2];
        break;
      case 4:
        myTable = this.state.tableData.headerTable[3];
        break;
      case 5:
        myTable = this.state.tableData.headerTable[4];
        break;
      default:
        break;
  }
  return myTable.map((key,index) => {
    return <th key={index}>{key}</th>;
  }) 
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
      case 5:
        myTable = this.state.tableData.tableData5[0];
        break;
      default:
        break;
    }
    let header = Object.keys(myTable);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <table id="fixedCosts">
          <thead>
            <tr>{this.renderTableHeaders(1)}</tr>
          </thead>
          {this.renderTableData(1)}
        </table>
        <table id="incomeTable">
          <thead>
            <tr>{this.renderTableHeaders(5)}</tr>
          </thead>
          {this.renderTableData(5)}
        </table>
        <table id="monthlyTable">
          <thead>
            <tr>{this.renderTableHeaders(2)}</tr>
          </thead>
          {this.renderTableData(2)}
        </table>
        <table id="assetsTable">
          <thead>
            <tr>{this.renderTableHeaders(4)}</tr>
          </thead>
          {this.renderTableData(4)}
        </table>
        <table id="profitMargins">
          <thead>
            <tr>{this.renderTableHeaders(3)}</tr>
          </thead>
          {this.renderTableData(3)}
        </table>
      </div>
    );
  }
}

export default TableCustom;
