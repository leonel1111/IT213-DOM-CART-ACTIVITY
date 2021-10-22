//classes
class Budget {
    constructor(budget) {
        this.budget = Number ( budget );
        this.budgetLeft = this.budget;

    }
}

// everything related to html
class HTML{

    // insert the budget when the user sumbits
    insertBudget(amount){
      //  insert into html
      budgetTotal.innerHTML = `${amount}`;
      budgetLeft.innerHTML = `${amount}`;
    }
}



// variables
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');


    let budget, userBudget;

    // instantiate the html class
     const html = new HTML();


//event listeners
eventListeners();

function eventListeners() {

        //app init
    document.addEventListener('DOMContentLoaded', function() {
       
        // ask the visitor the weekly budget
        userBudget = prompt(' What/s your budget for this week? ');
        
        // validate the user budget
        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        } else {
            // budget is valid then instantiate the budget class
             budget = new Budget(userBudget);
       
            // intanciate the new html class
            html.insertBudget(budget.budget);
        }
    });

    // when a new expense is added
    addExpenseForm.addEventListener('submit', function(e) {
       // read the input values
       const expenseName = documen.querySelector('#expense').value;
       const amount = document.querySelector('#amount').value;
    });

}