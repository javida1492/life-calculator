import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData1: [
        { category: "Rent/Mortgages", fixedCosts: "$20,000.00" },
        { category: "Utilities", fixedCosts: "$5,000.00" },
        { category: "Cell Phone", fixedCosts: "$250.00" },
        { category: "Health Insurance", fixedCosts: "$1,250.00" },
        { category: "Car Payments", fixedCosts: "$4,000.00" },
        { category: "Gas", fixedCosts: "$1,000.00" },
        { category: "Food", fixedCosts: "$1,500.00" },
        { category: "Clothes", fixedCosts: "$1,000.00" },
        { category: "Subscriptions", fixedCosts: "$1,000.00" },
        { category: "Car Insurance", fixedCosts: "$400.00" },
        { category: "Total", fixedCosts: "$---.--" }
      ],
      tableData2: [
        {
          monthlySpendingCategories: "Fixed Costs",
          monthlySpendingGoals: "$10,000.00",
          monthlyIncome: "$20,000.00",
          personalAnnualIncome: "$240,000"
        },
        {
          monthlySpendingCategories: "Long Term Investments",
          monthlySpendingGoals: "$2,000.00",
          recommendedMonthlyIncome: "$72,800.00"
        },
        {
          monthlySpendingCategories: "Savings Short Term",
          monthlySpendingGoals: "$2,000.00"
        },
        {
          monthlySpendingCategories: "Guilt Free Spending",
          monthlySpendingGoals: "$2,000.00" 
        },
        {
          monthlySpendingCategories: "Taxes",
          monthlySpendingGoals: "$4,000.00"
        }
      ],
      tableData3: [
        {
          businessProfitMargins: "50%",
          annualRevenueNeeded: "$480,000",
          monthlyRevenueNeeded: "$40,000"
        }
      ],
      tableData4: [
        {
          year: "1",
          savings: "$48,000",
          monthlyAssetIncome: "$400",
          annualAssetIncome: "$4,800"
        },
        {
          year: "2",
          savings: "$100,800",
          monthlyAssetIncome: "$840",
          annualAssetIncome: "$10,080"
        },
        {
          year: "3",
          savings: "$158,880",
          monthlyAssetIncome: "$1,324",
          annualAssetIncome: "$15,888"
        },
        {
          year: "4",
          savings: "$222,768",
          monthlyAssetIncome: "$1,856",
          annualAssetIncome: "$22,277"
        },
        {
          year: "5",
          savings: "$293,045",
          monthlyAssetIncome: "$2,442",
          annualAssetIncome: "$29,304"
        }
      ]
    };
  }

  renderTableData(table) {
    let myTable;
    switch (table) {
      case 1:
        myTable = this.state.tableData1;
        return myTable.map((data, index) => {
          const { category, fixedCosts } = data; //destructuring
          return (
            <tr key={category}>
              <td>{category}</td>
              <td>{fixedCosts}</td>
            </tr>
          );
        });
        break;
      case 2:
        myTable = this.state.tableData2;
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
        break;
      case 3:
        myTable = this.state.tableData3;
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
        break;
      case 4:
        myTable = this.state.tableData4;
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
        break;
    }
    /*return myTable.map((data, index) => {
      const { category, fixedCosts } = data; //destructuring
      return (
        <tr key={category}>
          <td>{category}</td>
          <td>{fixedCosts}</td>
        </tr>
      );
    });*/
  }

  renderTableHeader(table) {
    let myTable;
    switch (table) {
      case 1:
        myTable = this.state.tableData1[0];
        break;
      case 2:
        myTable = this.state.tableData2[0];
        break;
      case 3:
        myTable = this.state.tableData3[0];
        break;
      case 4:
        myTable = this.state.tableData4[0];
        break;
    }
    let header = Object.keys(myTable);
    return header.map((key, index) => {
      return <th key={index} class="white-text" style={{backgroundColor: "black"}}>{key.toUpperCase()}</th>;
    });
  }

  /*editColumn(p,k,e){
      let inputValue = e.target.innerText;
      let obj = p.p;
      let objId = obj.id;
      let position = k.k;
      let values = Object.values(obj);

      if(values.indexOf(inputValue) == -1){
          obj[position] = inputValue;
          let stateCopy = this.state.tableData1;
          stateCopy.map((object, index) => {
              if(object.id == objId){
                  object = obj[position];
              }
          });
          this.setState(stateCopy);
          this.setState({errorInput: ""});
          console.log(stateCopy, "stateCopystateCopy");
      } else {
          this.setState({
              errorInput: "This period is also available in your list"
          });
          return false;
      }
  }*/

  render() {
    return (
      <div>
        <table
          id="fixedCosts"
          style={{
            display: "inline-block",
            border: "1px solid",
            float: "left",
            width: "220px",
            marginLeft: "50px"
          }}
        >
          <tbody>
            <tr>{this.renderTableHeader(1)}</tr>
            {this.renderTableData(1)}
          </tbody>
        </table>
        <table
          id="monthlyTable"
          style={{
            display: "inline-block",
            border: "1px solid",
            width: "812px",
            marginLeft: "50px"
          }}
        >
          <tbody>
            <tr>{this.renderTableHeader(2)}</tr>
            {this.renderTableData(2)}
          </tbody>
        </table>
        <table
          id="profitMargins"
          style={{
            display: "inline-block",
            border: "1px solid",
            width: "612px",
            marginLeft: "50px",
            position: "absolute"
          }}
        >
          <tbody>
            <tr>{this.renderTableHeader(3)}</tr>
            {this.renderTableData(3)}
          </tbody>
        </table>
        <table
          id="assetsTable"
          style={{
            display: "table-caption",
            border: "1px solid",
            width: "489px",
            marginLeft: "50px",
            marginTop: "17px"
          }}
        >
          <tbody>
            <tr>{this.renderTableHeader(4)}</tr>
            {this.renderTableData(4)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
