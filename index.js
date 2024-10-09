
const incomeInput = document.getElementById('income-amount');
const categoryInput = document.getElementById('expense-category');
const expenseInput = document.getElementById('expense-amount');
const totalIncome  = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');

let totalIncomeValue = parseFloat(localStorage.getItem('totalIncome')) || 0 ;
let totalExpenseValue = parseFloat(localStorage.getItem('totalExpense')) || 0 ;
let expenseByCategory =  JSON.parse(localStorage.getItem('expensesByCategory')) || {};

function  updateSummary(){
   const currentBalance = totalIncomeValue - totalExpenseValue;
   totalIncome.textContent = totalIncomeValue.toFixed(3);
   totalExpense.textContent = totalExpenseValue.toFixed(3);
   balance.textContent = currentBalance.toFixed(3); 
 }


function addIncome(){
 const incomeAmount = parseFloat(incomeInput.value);
 if(incomeInput.value === ''){
    alert("Please Enter The Income");
 }else{
   
   totalIncomeValue += incomeAmount;
   localStorage.setItem('totalIncome',totalIncomeValue);
    updateSummary();
   incomeInput.value = "";
 }
}

function addExpense(){
 const expenseAmount = parseFloat(expenseInput.value);
 const category = categoryInput.value.trim();
 if(expenseInput.value === ''){
    alert("Please Enter The Expenses");
 } else{
   
   totalExpenseValue += expenseAmount;
   if(!expenseByCategory[category]){
      expenseByCategory[category] = 0;
   }
   expenseByCategory[category] += expenseAmount;

   localStorage.setItem('totalExpense',totalExpenseValue);
   localStorage.setItem('expenseByCategory', JSON.stringify(expenseByCategory));

   updateSummary();
   expenseInput.value = ""; 
   categoryInput.value = "";
 }
}
function clearAll(){
   totalIncomeValue = 0;
   totalExpenseValue = 0;
   expenseByCategory = {};

   localStorage.removeItem('totalIncome');
   localStorage.removeItem('totalExpense');
   localStorage.removeItem('expensesByCategory');

   updateSummary();
}


document.getElementById("add-income-button").addEventListener("click", addIncome);
document.getElementById("add-expense-button").addEventListener("click", addExpense);
document.getElementById("clear-button").addEventListener("click", clearData);
updateSummary();