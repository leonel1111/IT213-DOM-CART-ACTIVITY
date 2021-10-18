// Variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');




// Listener
loadEventListeners();

function loadEventListeners(){
    //When new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    clearCartBtn.addEventListener('click', clearCart);

    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



// Functions
function buyCourse(e){
     e.preventDefault();
    // Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')){
       // read the course values
       const course = e.target.parentElement.parentElement;

       //read the values
       getCourseInfo(course);
       
    }
}
//Reads the HTML information of the selected course
function getCourseInfo(course) {
   // Create an Object with Course Data
   const courseInfo = {
       image: course.querySelector('img').src,
       title: course.querySelector('h4').textContent,
       price: course.querySelector('.price span').textContent,
       id: course.querySelector('a').getAttribute('data-id')
   }
   // Insert into the shopping cart
   addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(course){
    // create a <tr>
    const row =  document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <tr>
             <td>
                  <img src="${course.image}" width=100>
             </td>
             <td>${course.title}</td>
             <td>${course.price}</td>
             <td>
                  <a href="#" class="remove" data-id="${course.id}">X</a>       
             </td>


        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    saveIntoStorage(course);
}
function saveIntoStorage(course) {
    let course1 = getCoursesFromStorage();

    course1.push(course);

    localStorage.setItem('courses', JSON.stringify(course1) );
    
}
function getCoursesFromStorage() {
    let course1;
    
    if(localStorage.getItem('course1') === null) {
        course1 = [];
    } else {
        course1 = JSON.parse(localStorage.getItem('course1'));
    }
    return course1;
}













// remove course from the dom 
function removeCourse(e) {
    let course, courseId;

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    removeCourseLocalStorage(courseId);
}
function removeCourseLocalStorage(id) {
    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });
    localStorage.setItem('course1', JSON.stringify(coursesLS));
}

function clearCart(){
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    clearLocalStorage();
}
function clearLocalStorage() {
    localStorage.clear();
}

function getFromLocalStorage(){
    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(course) {
        const row = document.createElement('tr');

        row.innerHTML = `
        <tr>
             <td>
                  <img src="${course.image}" width=100>
             </td>
             <td>${course.title}</td>
             <td>${course.price}</td>
             <td>
                  <a href="#" class="remove" data-id="${course.id}">X</a>       
             </td>


        </tr>
    `;
    shoppingCartContent.appendChild(row);
    })
}