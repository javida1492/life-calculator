(window["webpackJsonplife-calculator"]=window["webpackJsonplife-calculator"]||[]).push([[0],{11:function(e,t,a){e.exports=a.p+"static/media/image1.b1c312d4.png"},12:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},18:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(9),s=a.n(r),o=a(2),i=a(3),c=a(6),u=a(5),d=a(7),m=a(1),h=a(4),b={tableData1:[{category:"Rent/Mortgages",fixedCosts:2e4},{category:"Utilities",fixedCosts:5e3},{category:"Cell Phone",fixedCosts:250},{category:"Health Insurance",fixedCosts:1250},{category:"Car Payments",fixedCosts:4e3},{category:"Gas",fixedCosts:1e3},{category:"Food",fixedCosts:1500},{category:"Clothes",fixedCosts:1e3},{category:"Subscriptions",fixedCosts:1e3},{category:"Car Insurance",fixedCosts:400},{category:"Total",fixedCosts:35400}],tableData2:[{monthlySpendingCategories:"Fixed Costs",monthlySpendingPercentage:50,monthlySpendingGoals:1e4},{monthlySpendingPercentage:10,monthlySpendingCategories:"Long Term Investments",monthlySpendingGoals:2e3},{monthlySpendingPercentage:10,monthlySpendingCategories:"Savings Short Term",monthlySpendingGoals:2e3},{monthlySpendingPercentage:10,monthlySpendingCategories:"Guilt Free Spending",monthlySpendingGoals:2e3},{monthlySpendingPercentage:20,monthlySpendingCategories:"Taxes",monthlySpendingGoals:4e3}],tableData3:[{businessProfitMargins:50,monthlyRevenueNeeded:4e4,annualRevenueNeeded:48e4}],tableData4:[{year:1,savings:48e3,monthlyAssetIncome:400,annualAssetIncome:4800,percentReturn:10},{year:2,savings:100800,monthlyAssetIncome:840,annualAssetIncome:10080},{year:3,savings:158880,monthlyAssetIncome:1324,annualAssetIncome:15888},{year:4,savings:222768,monthlyAssetIncome:1856,annualAssetIncome:22277},{year:5,savings:293045,monthlyAssetIncome:2442,annualAssetIncome:29304}],tableData5:[{monthlyIncome:2e4,recommendedMonthlyIncome:70800,personalAnnualIncome:24e4}]},g=(a(17),a(18),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onCellChange=function(e,t,n){if(1===n)a.updateTable1(e,t);else if(2===n)a.updateTable2(e,t);else if(3===n)a.updateTable3(t);else if(4===n){var l=Object(m.a)(a.state.tableData.tableData4);l[0].percentReturn=t,a.setState({data:l}),a.updateTable4()}else 5===n&&a.updateTable5(t)},a.state={tableData:b},a.onCellChange=a.onCellChange.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"updateTable1",value:function(e,t){var a=Object(m.a)(this.state.tableData.tableData1);if(10!==e){a[e].fixedCosts=t;var n=0;a[10].fixedCosts=n;for(var l=0;l<a.length-1;l++)n+=a[l].fixedCosts;a[10].fixedCosts=n,this.setState({data:a})}}},{key:"updateTable2",value:function(e,t){var a=Object(m.a)(this.state.tableData.tableData2);a[e].monthlySpendingPercentage=t;for(var n=0,l=0;l<5;l++)n+=a[l].monthlySpendingPercentage;n>100&&alert("Monthly Spending Percentage must not exceed 100%!"),this.setState({dataT2:a}),this.updateMonthlyGoals(),this.updateTable4(),this.updateTable5(t,1)}},{key:"updateMonthlyGoals",value:function(){for(var e=Object(m.a)(this.state.tableData.tableData2),t=Object(m.a)(this.state.tableData.tableData5),a=0;a<5;a++)e[a].monthlySpendingGoals=t[0].monthlyIncome*(e[a].monthlySpendingPercentage/100);this.setState({data:e})}},{key:"updateTable3",value:function(e,t){var a=Object(m.a)(this.state.tableData.tableData5),n=Object(m.a)(this.state.tableData.tableData3);t||(n[0].businessProfitMargins=e),n[0].annualRevenueNeeded=a[0].personalAnnualIncome/(n[0].businessProfitMargins/100),n[0].monthlyRevenueNeeded=n[0].annualRevenueNeeded/12,this.setState({dataT3:n})}},{key:"updateTable4",value:function(){for(var e=Object(m.a)(this.state.tableData.tableData2),t=Object(m.a)(this.state.tableData.tableData4),a=0,n=0;n<5;n++)0===n?t[n].savings=12*(e[1].monthlySpendingGoals+e[2].monthlySpendingGoals):(a+=t[n-1].annualAssetIncome,t[n].savings=t[0].savings*(n+1)+a),console.log(t[0].percentReturn),t[n].monthlyAssetIncome=t[n].savings*(t[0].percentReturn/100/12),t[n].annualAssetIncome=t[n].savings*(t[0].percentReturn/100);this.setState({dataT4:t})}},{key:"updateTable5",value:function(e,t){var a=Object(m.a)(this.state.tableData.tableData5),n=Object(m.a)(this.state.tableData.tableData1),l=Object(m.a)(this.state.tableData.tableData2);t?(a[0].recommendedMonthlyIncome=n[10].fixedCosts/(l[0].monthlySpendingPercentage/100),this.setState({data:a})):(a[0].monthlyIncome=e,a[0].personalAnnualIncome=12*a[0].monthlyIncome,this.setState({data:a}),this.updateMonthlyGoals(),this.updateTable3(e,1))}},{key:"renderTableData",value:function(e){var t=this;switch(e){case 1:return this.state.tableData.tableData1.map((function(e,a){var n=e.category,r=e.fixedCosts;return l.a.createElement("tr",{key:n,style:{backgroundColor:"black"},class:"white-text"},l.a.createElement("td",null,n),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:r,step:".01",onChange:function(e){return t.onCellChange(a,parseFloat(e.target.value),1)}})))}));case 2:return this.state.tableData.tableData2.map((function(e,a){var n=e.monthlySpendingCategories,r=e.monthlySpendingPercentage,s=e.monthlySpendingGoals;return l.a.createElement("tr",{key:n},l.a.createElement("td",null,n),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:r,step:".01",onChange:function(e){return t.onCellChange(a,parseFloat(e.target.value),2)}})),l.a.createElement("td",null,s))}));case 3:return this.state.tableData.tableData3.map((function(e,a){var n=e.businessProfitMargins,r=e.monthlyRevenueNeeded,s=e.annualRevenueNeeded;return l.a.createElement("tr",{key:n},l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:n,step:".01",onChange:function(e){return t.onCellChange(a,parseFloat(e.target.value),3)}})),l.a.createElement("td",null,r),l.a.createElement("td",null,s))}));case 4:return this.state.tableData.tableData4.map((function(e,a){var n=e.year,r=e.savings,s=e.monthlyAssetIncome,o=e.annualAssetIncome,i=e.percentReturn;return l.a.createElement("tr",{key:n,style:{backgroundColor:"black"},class:"white-text"},l.a.createElement("td",null,n),l.a.createElement("td",null,r),l.a.createElement("td",null,s),l.a.createElement("td",null,o),l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:i,step:".01",onChange:function(e){return t.onCellChange(a,parseFloat(e.target.value),4)}})))}));case 5:return this.state.tableData.tableData5.map((function(e,a){var n=e.monthlyIncome,r=e.recommendedMonthlyIncome,s=e.personalAnnualIncome;return l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("input",{type:"number",value:n,step:".01",onChange:function(e){return t.onCellChange(a,parseFloat(e.target.value),5)}})),l.a.createElement("td",null,r),l.a.createElement("td",null,s))}))}}},{key:"renderTableHeader",value:function(e){var t;switch(e){case 1:t=this.state.tableData.tableData1[0];break;case 2:t=this.state.tableData.tableData2[0];break;case 3:t=this.state.tableData.tableData3[0];break;case 4:t=this.state.tableData.tableData4[0];break;case 5:t=this.state.tableData.tableData5[0]}return Object.keys(t).map((function(e,t){return l.a.createElement("th",{key:t},e.toUpperCase())}))}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("table",{id:"fixedCosts"},l.a.createElement("thead",null,l.a.createElement("tr",null,this.renderTableHeader(1))),this.renderTableData(1)),l.a.createElement("table",{id:"incomeTable"},l.a.createElement("thead",null,l.a.createElement("tr",null,this.renderTableHeader(5))),this.renderTableData(5)),l.a.createElement("table",{id:"monthlyTable"},l.a.createElement("thead",null,l.a.createElement("tr",null,this.renderTableHeader(2))),this.renderTableData(2)),l.a.createElement("table",{id:"assetsTable"},l.a.createElement("thead",null,l.a.createElement("tr",null,this.renderTableHeader(4))),this.renderTableData(4)),l.a.createElement("table",{id:"profitMargins"},l.a.createElement("thead",null,l.a.createElement("tr",null,this.renderTableHeader(3))),this.renderTableData(3)))}}]),t}(n.Component)),p=a(10),y=a.n(p),f=a(11),v=a.n(f),C=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"Logo"},l.a.createElement(y.a,{height:120,width:750,src:v.a,alt:"logo",style:{marginLeft:"auto",marginRight:"auto"}}),l.a.createElement("h1",{id:"title",align:"center",style:{margin:"0 0 2rem 0",fontWeight:"550",fontSize:"50px"}},"Ideal Life Calculator"),l.a.createElement(g,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.f606c581.chunk.js.map