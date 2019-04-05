'use strict';

var table = document.getElementById('shell');

function Stores (name,minNumCust,maxNumCust,avgCookieSale){
  this.name = name,
  this.minNumCust = minNumCust,
  this.maxNumCust = maxNumCust,
  this.avgCookieSale = avgCookieSale;
}
var stores = [];
var rowData = [];
var hourTotal = [];

var westlake = new Stores('westlake',18,72,6.3);
var pike_pine = new Stores('pike and pine',11,38,3.7);
var newcastle = new Stores('New Castle',20,38,2.3);
stores.push(westlake,pike_pine,newcastle);

function getCustCount(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

var storetime;
var numCust;
var numCookies;
// var storeCount =0;

function makeRow(store,totCookieStore) {
  totCookieStore = 0;
  for (var i = 11; i <= 17; i++) {
    numCust = getCustCount(store.minNumCust,store.maxNumCust);
    numCookies = Math.ceil(numCust * store.avgCookieSale);
    totCookieStore = totCookieStore + numCookies;
    rowData.push('<td>' + numCookies + '</td>');
    if (isNaN(hourTotal[i])) {
      hourTotal[i] = numCookies ;
    }
    else {
      hourTotal[i] = hourTotal[i] + numCookies ;
    }
  }
  return totCookieStore;
  // console.log(rowData);
}
function render(tableRow) {
  for (var j=0; j < tableRow.length; j++) {
    var newRow = document.createElement('td');
    newRow.innerHTML = tableRow[j];
    table.appendChild(newRow);
  }
}

rowData = [];
rowData.push('<td>' + 'Store'+ '</td>');
for (var i = 11; i <= 17; i++) {
  if (i < 12) {
    storetime = i + ' am';
  }
  else if (i===12) {
    storetime = i + ' pm';
  }
  else if (i > 12) {
    storetime = (i-12) + ' pm';
  }
  rowData.push('<td>' + storetime + '<td>');
}
rowData.push('<td>' + 'Daily Location Total'+ '<td>');
render(rowData);
var newRow = document.createElement('tr');
newRow.innerHTML = ' ';
table.appendChild(newRow);

var storeCount = 0;
while (storeCount < stores.length) {
  // var totCookies = 0;
  rowData = [];
  rowData.push('<td>' + stores[storeCount].name + '</td>');
  var totRow = makeRow(stores[storeCount]);

  rowData.push('<td>' + totRow + '</td>');
  render(rowData);
  newRow = document.createElement('tr');
  newRow.innerHTML = ' ';
  table.appendChild(newRow);
  storeCount = storeCount + 1;
}

rowData = [];
var grandTotal = 0;
rowData.push('<td>' + 'Total'+ '</td>');
for (i = 11; i <= 17; i++) {
  rowData.push('<td>' + hourTotal[i]+ '</td>');
  grandTotal = grandTotal + hourTotal[i];
}
rowData.push('<td>' + grandTotal+ '</td>');
render(rowData);
newRow = document.createElement('tr');
newRow.innerHTML = ' ';
table.appendChild(newRow);
