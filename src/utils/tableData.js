export default {
  fixedCostsData: [
    [{ header: "Category" }, { header: "Fixed Costs $" }],
    [{ id: "Rent/Mortgages" }, { value: 20000 }],
    [{ id: "Utilities" }, { value: 5000 }],
    [{ id: "Cell Phone" }, { value: 250 }],
    [{ id: "Health Insurance" }, { value: 1250 }],
    [{ id: "Car Payments" }, { value: 4000 }],
    [{ id: "Gas" }, { value: 1000 }],
    [{ id: "Food" }, { value: 1500 }],
    [{ id: "Clothes" }, { value: 1000 }],
    [{ id: "Subscriptions" }, { value: 1000 }],
    [{ id: "Car Insurance" }, { value: 400 }],
    [{ id: "Total" }, { result: 35400 }]
  ],
  incomeData: [
    [
      { header: "Monthly Income $" },
      { header: "Recommended Monthly Income $" },
      { header: "Personal Annual Income $" }
    ],
    [{ value: 20000 }, { result: 70800 }, { result: 240000 }]
  ],
  monthlySpendingData: [
    [
      { header: "Monthly Spending Categories" },
      { header: "Monthly Spending Percentage" },
      { header: "Monthly Spending Goals $" }
    ],
    [{ id: "Fixed Costs" }, { value: 50 }, { result: 10000 }],
    [{ id: "Long Term Investments" }, { value: 10 }, { result: 2000 }],
    [{ id: "Short Term Savings" }, { value: 10 }, { result: 2000 }],
    [{ id: "Guilt Free Spending" }, { value: 10 }, { result: 2000 }],
    [{ id: "Taxes" }, { value: 20 }, { result: 4000 }]
  ],
  assetsData: [
    [
      { header: "Year" },
      { header: "Savings $" },
      { header: "Monthly Assets Income $" },
      { header: "Annual Assets Income $" },
      { header: "Percent Return %" }
    ],
    [
      { result: "1" },
      { result: 48000 },
      { result: 400 },
      { result: 4800 },
      { value: 10 }
    ],
    [{ result: "2" }, { result: 100800 }, { result: 840 }, { result: 10080 }],
    [{ result: "3" }, { result: 158880 }, { result: 1324 }, { result: 15888 }],
    [{ result: "4" }, { result: 222768 }, { result: 1856 }, { result: 22277 }],
    [{ result: "5" }, { result: 293045 }, { result: 2442 }, { result: 29304 }]
  ],
  businessData: [
    [
      { header: "Business Profit Margins %" },
      { header: "Monthly Revenue Needed $" },
      { header: "Annual Revenue Needed $" }
    ],
    [{ value: 50 }, { result: 40000 }, { result: 480000 }]
  ]
};
