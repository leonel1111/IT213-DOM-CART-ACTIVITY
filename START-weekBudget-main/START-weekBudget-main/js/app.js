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

    // displays a message(correct  ot invalid)
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        // add three different classes into the div
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // insert into html
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm );

        // clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            //erases the content of the expense amount and name
            addExpenseForm.reset();
        }, 3000)
    }
    // displays the expenses from the form into the list
    addExpenseToList(name , amount) {
       const expensesList = document.querySelector('#expenses ul');

        // create a LI
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // create a template
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill" >$ ${amount}</span>
        `;


        // insert into the html
        expensesList.appendChild(li);
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
        e.preventDefault();
       // read the input values
       const expenseName = document.querySelector('#expense').value;
       const amount = document.querySelector('#amount').value;

       if(expenseName === '' || amount === '' ){
           html.printMessage('There was an error, all the fields are mandtory',
           'alert-danger');
       } else {
           // add expenses to the list
           html.addExpenseToList(expenseName, amount);
       }
    });

}