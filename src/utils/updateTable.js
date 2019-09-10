export function updateTable1(index, value, data) {
  if (index !== 10) {
    data[index].fixedCosts = value;

    let total = 0;
    data[10].fixedCosts = total;

    for (var i = 0; i < data.length - 1; i++) {
      total += data[i].fixedCosts; //Update new total
    }
    data[10].fixedCosts = total;

    return data;
  }
}

export function updateTable2(value, rowIdx, data) {
  //Update table 2 values based on monthly income
  if (rowIdx === 2) {
    data.tableData2[0].monthlyIncome = value;
    data.tableData2 = updateMonthlyGoals(data.tableData2);
    data.tableData3 = updateTable3(value, 1, data);
  } else {
    data.tableData2[rowIdx].monthlySpendingPercentage = value; //Update percentage
    data.tableData2 = updateMonthlyGoals(data.tableData2); //Recalculate monthly spending goals
  }
  return data;
}

export function updateMonthlyGoals(data) {
  for (var i = 0; i < 5; i++) {
    data[i].monthlySpendingGoals =
      data[0].monthlyIncome * data[i].monthlySpendingPercentage;
  }
  data[0].personalAnnualIncome = data[0].monthlyIncome * 12;
  return data;
}

export function updateTable3(value, call, data) {
  let dataT2 = data.tableData2;
  let dataT3 = data.tableData3;
  if (!call) {
    dataT3[0].businessProfitMargins = value;
  }
  dataT3[0].annualRevenueNeeded =
    dataT2[0].personalAnnualIncome / (dataT3[0].businessProfitMargins / 100);
  dataT3[0].monthlyRevenueNeeded = dataT3[0].annualRevenueNeeded / 12;
  return dataT3;
}

export function updateTable4() {
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
