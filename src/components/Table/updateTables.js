///////////////////////////////////////////////////////////////
//Main table update function which determines which table to
//update based on the tableId
///////////////////////////////////////////////////////////////
export function updateInput(tableTuple) {
  const { value, tableId } = tableTuple;
  if (tableId === "fixedCostsData")
    return updateFixedCostsData(tableTuple, value);
  else if (tableId === "incomeData") return updateIncomeData(tableTuple, value);
  else if (tableId === "monthlySpendingData")
    return updateMonthlySpendingData(tableTuple, value);
  else if (tableId === "assetsData")
    return updatePercentReturn(tableTuple, value);
  return updateBusinessProfitMargins(tableTuple, value);
}

//==================================================================//
//                        PRIMARY FUNCTIONS                         //
// These functions should only be called once and are the main      //
// entry point to updating a table and secondary table updates      //
//==================================================================//

///////////////////////////////////////////////////////////////
//Function updates a specific cell's value in the Fixed Costs
//table and calls the updateRecommendedIncome() function to
//recalculate the total fixed cost.
///////////////////////////////////////////////////////////////
function updateFixedCostsData(tableTuple, newValue) {
  let { rowIdx, cellIdx, tableDataCopy, tableId } = tableTuple;
  let fixedCostsTable = tableDataCopy[tableId];

  //Update cell value based on row index + cell index.
  fixedCostsTable[rowIdx][cellIdx].value = checkValue(newValue);
  //Update table new result value
  fixedCostsTable[fixedCostsTable.length - 1][1].result = calculateNewResult(
    fixedCostsTable
  );
  //Update Recommended Monthly Income
  tableDataCopy["incomeData"] = updateRecommendedIncome(tableDataCopy);
  tableDataCopy["fixedCostsData"] = fixedCostsTable;

  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function updates the monthly income cell's value in the
//Income data table and calls the updateBusinessRevenue()
//function to recalculate the monthly and annual revenue needed
///////////////////////////////////////////////////////////////
function updateIncomeData(tableTuple, newValue) {
  let { rowIdx, cellIdx, tableDataCopy, tableId } = tableTuple;
  let incomeDataTable = tableDataCopy[tableId];
  //Update cell value based on row index + cell index.
  incomeDataTable[rowIdx][cellIdx].value = checkValue(newValue);
  //Update Personnal Annual Income
  incomeDataTable[1][2].result = incomeDataTable[1][0].value * 12;
  tableDataCopy["incomeData"] = incomeDataTable;
  tableDataCopy = updateBusinessRevenue(tableDataCopy);
  tableDataCopy = updateMonthlyGoals(tableDataCopy);
  tableDataCopy = updateAssetsData(tableDataCopy);

  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function updates a specific monthly spending percentage cell
//in the Monthly Spending Data table and calls the
//updateMonthlyGoals() and updateAssetsData() functions which
//update the Monthly Spending Goals $ value and assets table
//data respectively
///////////////////////////////////////////////////////////////
function updateMonthlySpendingData(tableTuple, newValue) {
  console.log("Update Monthly Data");
  let { rowIdx, cellIdx, tableDataCopy } = tableTuple;
  let monthlySpendingData = tableDataCopy["monthlySpendingData"];
  //Update monthly spending percentage value
  monthlySpendingData[rowIdx][cellIdx].value = checkValue(newValue);
  //Check if monthly spending percentage does not exceed 100%
  checkMonthlyPercentage(monthlySpendingData);
  //Assign data table to table
  tableDataCopy["monthlySpendingData"] = monthlySpendingData;
  //Update monthly goals based on new percentage values
  tableDataCopy = updateMonthlyGoals(tableDataCopy);
  tableDataCopy = updateAssetsData(tableDataCopy);

  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function updates the Percent Return cell's value and calls
//the updateAssetsData() function to update the Assets data
//information using the new percentage.
///////////////////////////////////////////////////////////////
function updatePercentReturn(tableTuple, newValue) {
  let { tableDataCopy } = tableTuple;
  let assetsDataTable = tableDataCopy["assetsData"];
  assetsDataTable[1][4].value = checkValue(newValue);
  tableDataCopy["assetsData"] = assetsDataTable;
  //Update asset data
  tableDataCopy = updateAssetsData(tableDataCopy);

  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function updates the business profit margin cell and calls
//the updateBusinessRevenue() function which updates the
//monthly and annual revenue needed based on the new profit
//margin value
///////////////////////////////////////////////////////////////
function updateBusinessProfitMargins(tableTuple, newValue) {
  console.log("Update Business Data Table");
  let { rowIdx, cellIdx, tableDataCopy } = tableTuple;
  let businessDataTable = tableDataCopy["businessData"];
  businessDataTable[rowIdx][cellIdx].value = checkValue(newValue);
  tableDataCopy["businessData"] = businessDataTable;
  tableDataCopy = updateBusinessRevenue(tableDataCopy);
  return tableDataCopy;
}

//==================================================================//
//                         HELPER FUNCTIONS                         //
// These are secondary functions called by the main table update    //
// functions and can be called by multiple other functions.         //
//==================================================================//

///////////////////////////////////////////////////////////////
//Function returns sums up all the fixed cost items and results
///////////////////////////////////////////////////////////////
function calculateNewResult(fixedCostsTable) {
  let newResult = 0;

  //TODO: There has to be a better way of doing this?
  //Iterate over table and sum values for new result
  const newTable = fixedCostsTable.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (cell.value !== undefined) newResult += cell.value;
    });
  });
  return newResult;
}

///////////////////////////////////////////////////////////////
//Function sums monthly percentage values and alerts user if
//it exceeds 100%
///////////////////////////////////////////////////////////////
function checkMonthlyPercentage(monthlySpendingData) {
  let percentageTotal = 0;
  for (var i = 1; i < monthlySpendingData.length; i++) {
    percentageTotal += monthlySpendingData[i][1].value;
  }
  if (percentageTotal > 100) {
    alert("Monthly Spending Percentage must not exceed 100%!");
  }
}

///////////////////////////////////////////////////////////////
//This function updates the recommended income based on the
//total fixed costs and the monthly spending percentage
///////////////////////////////////////////////////////////////
function updateRecommendedIncome(tableDataCopy) {
  const fixedCostsTable = tableDataCopy["fixedCostsData"];
  const fixedCostsTotal = fixedCostsTable[fixedCostsTable.length - 1][1].result;

  //const monthlySpendingData = tableDataCopy["monthlySpendingData"];
  //const monthlySpendingPercentage = monthlySpendingData[1][1].value / 100;

  const incomeDataTable = tableDataCopy["incomeData"];
  incomeDataTable[1][1].result = fixedCostsTotal * 2;/// monthlySpendingPercentage;
  return incomeDataTable;
}

///////////////////////////////////////////////////////////////
//Update monthly goals
//This logic has been made a separate function as it multiple
//tables affect the value of the monthly goals.
///////////////////////////////////////////////////////////////
function updateMonthlyGoals(tableDataCopy) {
  let monthlySpendingData = tableDataCopy["monthlySpendingData"];
  let incomeDataTable = tableDataCopy["incomeData"];
  for (var i = 1; i < monthlySpendingData.length; i++) {
    monthlySpendingData[i][2].result =
      incomeDataTable[1][0].value * (monthlySpendingData[i][1].value / 100);
  }
  tableDataCopy["monthlySpendingData"] = monthlySpendingData;
  tableDataCopy["incomeData"] = incomeDataTable;
  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function updates annual and monthly business revenue needed
//Based on either changes to business profit margins or
//changes to personal annual income
///////////////////////////////////////////////////////////////
function updateBusinessRevenue(tableDataCopy) {
  //Update monthly and annual revenue
  let businessDataTable = tableDataCopy["businessData"];
  let incomeDataTable = tableDataCopy["incomeData"];
  //Update annual revenue needed
  businessDataTable[1][2].result =
    incomeDataTable[1][2].result / (businessDataTable[1][0].value / 100);
  //Update monthly revenue needed
  businessDataTable[1][1].result = businessDataTable[1][2].result / 12;
  //Update table object
  tableDataCopy["businessData"] = businessDataTable;
  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function recalculates the monthly and annunal income assets
//values as well as the yearly savings amount.
///////////////////////////////////////////////////////////////
function updateAssetsData(tableDataCopy) {
  console.log("Update Assets Data");
  let monthlySpendingTable = tableDataCopy["monthlySpendingData"];
  let assetsDataTable = tableDataCopy["assetsData"];
  let percentReturn = assetsDataTable[1][4].value / 100;

  //Keep a running total of the annual asset income
  let compoundTotal = 0;

  //Update annual savings data
  for (let i = 1; i < assetsDataTable.length; i++) {
    if (i === 1) {
      assetsDataTable[i][1].result =
        (monthlySpendingTable[2][2].result +
          monthlySpendingTable[3][2].result) *
        12;
        console.log("Assets Data Table[1][1]:" + assetsDataTable[i][1].result);

    } else {
      console.log("Compound total:" + compoundTotal);
      console.log("Assets Data Table[1][1]:" + assetsDataTable[1][1].result);
      compoundTotal += assetsDataTable[i-1][3].result;
      assetsDataTable[i][1].result =
        assetsDataTable[1][1].result * i + compoundTotal;
      console.log("Assets Data Table[i][1]:" + assetsDataTable[i][1].result);
    }
    
    //Update monthly asset income
    assetsDataTable[i][2].result =
      assetsDataTable[i][1].result * (percentReturn / 12);
    console.log("Assets Data Table[i][2]:" + assetsDataTable[i][2].result);
      
    //Update annual asset income
    assetsDataTable[i][3].result = assetsDataTable[i][1].result * percentReturn;
    console.log("Assets Data Table[i][3]:" + assetsDataTable[i][3].result);

  }
  tableDataCopy["assetsData"] = assetsDataTable;
  return tableDataCopy;
}

///////////////////////////////////////////////////////////////
//Function checks if value is NaN and returns 0, otherwise it
//returns the value
///////////////////////////////////////////////////////////////
function checkValue(value) {
  if (isNaN(value)) return 0;
  return value;
}
