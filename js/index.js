let mealsData;
let apiResponse;

// window.addEventListener('load',function(){
//     $('.loading-screen').fadeOut(500,function(){
//         $('body').css('overflow','visible')
//     })
// })
// Function to show the loading screen
function showLoadingScreen() {
  $(".loading-screen").css("display", "flex");
}
$(document).ready(function() {
  $('.skitter-large').skitter();
})

// Function to hide the loading screen
function hideLoadingScreen() {
  $(".loading-screen").fadeOut(500, function () {
    $("body").css("overflow", "visible");
  });
}

const widthNav = $(".side-nav-menu").outerWidth() - $(".nav-header").outerWidth();
$(".side-nav-menu").css("left", -widthNav);
// Function to handle the open/close icon and side navbar click event
$(".open-close-icon").click(function () {
  $(".open-close-icon").toggleClass("d-none");
  $(".side-nav-menu").css(
    "left",
    $(".side-nav-menu").css("left") === "0px" ? -widthNav : 0
  );
});

// Fetch meals data and display on the page
(async function () { 
  showLoadingScreen();
  const apiResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const mealsData = await apiResponse.json();
  console.log(mealsData);
  displayMeals(mealsData);
  hideLoadingScreen();
  
  // Handle click event for meal item
  $(".item").click(function (e) {
    displayItemIngredientById(mealsData.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    
});
  
})();
$("#logo").click(async function () { 
  showLoadingScreen();
  const apiResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const mealsData = await apiResponse.json();
  console.log(mealsData);
  displayMeals(mealsData);
  hideLoadingScreen();
  
  // Handle click event for meal item
  $(".item").click(function (e) {
    displayItemIngredientById(mealsData.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    $('.slider').removeClass('d-none');

    
})});
// Handle click event for contact button
$("#contact").click(function () {
  $(".inputSearch").addClass("d-none");
  $(".main-meals").addClass("d-none");
  $(".side-nav-menu").css("left", -widthNav);
  $(".open-close-icon").toggleClass("d-none");
  $('.displayMealInfo').addClass('d-none');
  displayContact();
});

// Handle click event for search button
$("#about").click(function () {
  $(".main-meals").addClass("d-none");
  $(".side-nav-menu").css("left", -widthNav);
  $(".open-close-icon").toggleClass("d-none");
  $('.displayMealInfo').addClass('d-none');
  displayAbout();
});

// Handle click event for category button
$("#category").click(function () {
  $(".inputSearch").addClass("d-none");
  $(".main-meals").addClass("d-none");
  $(".side-nav-menu").css("left", -widthNav);
  $(".open-close-icon").toggleClass("d-none");
  $('.displayMealInfo').addClass('d-none');
  dataOfCategory();
});

// Handle click event for area button
$("#area").click(function () {
  dataOfArea();
  $(".inputSearch").addClass("d-none");
  $(".main-meals").addClass("d-none");
  $(".side-nav-menu").css("left", -widthNav);
  $(".open-close-icon").toggleClass("d-none");
  $('.displayMealInfo').addClass('d-none');
});

// Handle click event for ingredients button
$("#Ingredients").click(function () {
  dataOfIngredients();
  $(".inputSearch").addClass("d-none");
  $(".main-meals").addClass("d-none");
  $(".side-nav-menu").css("left", -widthNav);
  $(".open-close-icon").toggleClass("d-none");
  $('.displayMealInfo').addClass('d-none');
});
// Function to display meals on the page
function displayMeals(data) {
  let box = ``;
  for (let i = 0; i < data.meals.length; i++) {
    box += `
        <div class="col-lg-3 col-md-4 col-sm-6 ">
          <div class="item" index="${i}">
            <figure class="position-relative overflow-hidden">
              <img src="${data.meals[i].strMealThumb}" class="rounded-3 w-100" alt="">
              <figcaption class="layer rounded-3 bg-white opacity-75 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center ps-2">
                <h2>${data.meals[i].strMeal}</h2>
              </figcaption>
            </figure>
          </div>
        </div>`;
  }
  document.querySelector(".main-meals").innerHTML = box;
  
}
function displayAbout() {
  showLoadingScreen();
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");

  // Generate the HTML code for the contact form
  let box = `
<div class="container bg-about mb-4 w-75 width mt-4 ">
<h1>About Us</h1>

<div class="welcome-text">
    <p>
        Welcome to our website, a vibrant celebration of the rich tapestry of world cuisine. Immerse yourself in the kaleidoscope of flavors, where our unwavering passion is to bring you the most exquisite meals from every corner of the globe.
    </p>
</div>

<div class="journey-text">
    <p>
        Embark on a culinary journey that transcends continents, from the tantalizing and aromatic delights of Asian dishes to the comforting nostalgia of European classics. Our mission is to be your global culinary companion, introducing you to the diverse and delectable world of food culture.
    </p>
</div>

<div class="explore-text">
    <p>
        Explore our meticulously curated collection, an anthology of culinary wonders meticulously categorized by meal type and geographical origin. Whether you're an early morning breakfast enthusiast, a daring lunchtime adventurer, or a sophisticated dinner connoisseur, our repertoire has been carefully crafted to satiate every palate.
    </p>
    <p>
        Delight in the symphony of tastes that await you as you navigate our extensive selection.
    </p>
</div>

<div class="utilize-text">
    <p>
        Utilize our intuitive search feature to embark on a personalized culinary quest. Seek out specific meals that align with your cravings and preferences, and unveil new taste dimensions that resonate with your discerning palate.
    </p>
</div>

<p>
    At the heart of our platform is the commitment to providing you with a seamless and delightful experience in your exploration of the world's gastronomic wonders.
</p>
</div>`;
  // Display the generated form by setting its HTML code as the content of an element with the class "main-meals"
  document.querySelector(".main-meals").innerHTML = box;
  hideLoadingScreen();
}

// Helper function to generate the ingredient Recipes list
function generateIngredientRecipesList(mealRecipes) {
  let ingredientList = "";
  for (let i = 1; i <= 13; i++) {
    const measure = mealRecipes[`strMeasure${i}`];
    const ingredient = mealRecipes[`strIngredient${i}`];
    if (measure && ingredient) {
      ingredientList += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
    }
  }
  return ingredientList;
}
// Helper function to generate the ingredient Tags list
function generateIngredientTagsList(mealTags) {
  let ingredientList = "";
  let measure = mealTags[`strTags`];
  if (measure != null) {
    measure = mealTags[`strTags`].split(",");
    for (let i = 0; i < measure.length; i++) {
      ingredientList += `<li class="alert alert-danger m-2 p-1">${measure[i]}</li>`;
    }
    return ingredientList;
  }
  return "";
}

// Function to search meals by name
async function searchByName(name) {
    showLoadingScreen();
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");
  const apiResponseSearch = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const mealsDatasearch = await apiResponseSearch.json();
  displayMeals(mealsDatasearch);
  $(".item").click(function (e) {
    displayItemIngredientById(mealsDatasearch.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    $('.inputSearch').addClass('d-none');
});
  hideLoadingScreen();
}

// Function to search meals by letter
// async function searchByLetter(letter) {
//     showLoadingScreen();
//   $(".main-meals").removeClass("d-none");
//   const apiResponseSearch = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
//   );
//   const mealsDatasearch = await apiResponseSearch.json();
//   displayMeals(mealsDatasearch);
//   $(".item").click(function (e) {
//     displayItemIngredientById(mealsDatasearch.meals[this.getAttribute("index")].idMeal);
//     $('.main-meals').addClass('d-none');
//     $('.displayMealInfo').removeClass('d-none');
//     $('.inputSearch').addClass('d-none');
// });
//   hideLoadingScreen();
// }
// Function to search meals by ID of meal and display it
async function displayItemIngredientById(id) {
  showLoadingScreen();
  $(".slider").addClass("d-none");
  const apiResponseSearch = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const mealsDatasearch = await apiResponseSearch.json();
  let box = `
    <div class="col-md-4">
      <img src="${
        mealsDatasearch.meals[0].strMealThumb
      }" class="mb-3 w-100 rounded-3" alt="" />
      <f0gcaption><h2 class="text-white ">${
        mealsDatasearch.meals[0].strMeal
      }</h2></f0gcaption>
    </div>
    <div class="col-md-8 text-white">
      <div class="d-flex justify-content-between">
        <h2>Instructions</h2>
        <i class="fa-regular back  fa-circle-xmark"></i>
      </div>
      <p>${mealsDatasearch.meals[0].strInstructions.split(" ").splice(0,80).join(" ")}</p>
      <h3>Area: ${mealsDatasearch.meals[0].strArea}</h3>
      <h3>Category: ${mealsDatasearch.meals[0].strCategory}</h3>
      <h3>Recipes:</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${generateIngredientRecipesList(mealsDatasearch.meals[0])}
      </ul>
      <h3>Tags</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${generateIngredientTagsList(mealsDatasearch.meals[0])}
      
      </ul>
      <a target="_blank" href="${
        mealsDatasearch.meals[0].strSource
      }" class="btn btn-success">Source</a>
      <a target="_blank" href="${
        mealsDatasearch.meals[0].strYoutube
      }" class="btn btn-danger">Youtube</a>
    </div>
  `;
  document.querySelector(".displayMealInfo ").innerHTML = box;
  hideLoadingScreen();
  $('.fa-circle-xmark').click(function(){
    $('.displayMealInfo').addClass('d-none');
    $('.main-meals').removeClass('d-none');
  })
}
// Function to display Categorys on the page
function displayCategory(mealsDataCategory) {
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");
  let box = ``;
  for (let i = 0; i < mealsDataCategory.categories.length; i++) {
    let displayLength = 120;
    let displayedString = mealsDataCategory.categories[
      i
    ].strCategoryDescription.substring(0, displayLength);
    box += ` <div class="col-md-3" ">
        <div class="item item-category" strCategory="${mealsDataCategory.categories[i].strCategory}">
          <figure class="position-relative overflow-hidden">
            <img src="${mealsDataCategory.categories[i].strCategoryThumb}" class="rounded-3 w-100 " alt="">
            <figcaption class="layer  bg-white opacity-75 position-absolute top-0 bottom-0 start-0 end-0  ps-2">
              <h2 class="fw-bolder">${mealsDataCategory.categories[i].strCategory}</h2>
              <p class="fw-bold">${displayedString}</p>
            </figcaption>
          </figure>
        </div>
      </div>`;
  }
  document.querySelector(".main-meals").innerHTML = box;
}
// Function to fetch data of Categorys
async function dataOfCategory() {
  showLoadingScreen();
  let apiResponseCategory;
  apiResponseCategory = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let mealsDataCategory = await apiResponseCategory.json();
  console.log(mealsDataCategory);
  displayCategory(mealsDataCategory);
  $(".item-category").click(function () {
    displayItemOfCategory(this.getAttribute("strCategory"));
  });
  hideLoadingScreen();
}
// Displays the meals that use a specific Category on the page
async function displayItemOfCategory(strCategory) {
  showLoadingScreen();
  let apiResponseCategory;
  apiResponseCategory = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
  );
  let mealsDataCategory = await apiResponseCategory.json();
  displayMeals(mealsDataCategory);
  $(".item").click(function (e) {
    displayItemIngredientById(mealsDataCategory.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    $('.inputSearch').addClass('d-none');
});
  hideLoadingScreen();
}
// Function to display Areas on the page
function displayArea(mealsDataArea) {
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");
  let box = ``;
  for (let i = 0; i < mealsDataArea.meals.length; i++) {
    box += ` <div class="col-md-3" ">
        <div class="item item-Area" strArea="${mealsDataArea.meals[i].strArea}">
          <figure class=" text-white text-center">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h2>${mealsDataArea.meals[i].strArea}</h2>
          </figure>
        </div>
      </div>`;
  }
  document.querySelector(".main-meals").innerHTML = box;
}
// Function to fetch data of Areas
async function dataOfArea() {
  showLoadingScreen();
  let apiResponseArea;
  apiResponseArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let mealsDataArea = await apiResponseArea.json();
  console.log(mealsDataArea);
  displayArea(mealsDataArea);
  $(".item-Area").click(function () {
    displayItemOfArea(this.getAttribute("strArea"));
  });
  hideLoadingScreen();
}
// Displays the meals that use a specific Areas on the page
async function displayItemOfArea(strArea) {
  showLoadingScreen();
  let apiResponseArea;
  apiResponseArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`
  );
  let mealsDataArea = await apiResponseArea.json();
  $(".slider").addClass("d-none");
  displayMeals(mealsDataArea);
  $(".item").click(function (e) {
    displayItemIngredientById(mealsDataArea.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    $('.inputSearch').addClass('d-none');
});
  hideLoadingScreen();
}

// Displays the ingredients on the webpage
function displayIngredients(mealsDataIngredients) {
  // Removes the "d-none" class from the ".main-meals" element
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");

  let box = ``;
  let displayLength = 140;

  // Loop through the first 24 meals
  for (let i = 0; i < 24; i++) {
    // Create the HTML for each ingredient item
    box += `
        <div class="col-md-3 p-3 pb-3 item-Ingredients" stringredient="${
          mealsDataIngredients.meals[i].strIngredient
        }">
          <div class="rounded-2 text-center d-flex justify-content-center align-items-center flex-column text-white cursor-pointer">
            <i class="fa-solid pb-3 fa-drumstick-bite fa-4x"></i>
            <h3>${mealsDataIngredients.meals[i].strIngredient}</h3>
            <p>${mealsDataIngredients.meals[i].strDescription.substring(0,displayLength)}</p>
          </div>
        </div>`;
  }

  // Set the HTML content of the ".main-meals" element to the generated box
  document.querySelector(".main-meals").innerHTML = box;
}

// Fetches the data for the ingredients
async function dataOfIngredients() {
  let apiResponseIngredients;
  showLoadingScreen();
  // Fetch the list of ingredients from the API
  apiResponseIngredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let mealsDataIngredients = await apiResponseIngredients.json();
  console.log(mealsDataIngredients);

  // Display the retrieved ingredients on the webpage
  displayIngredients(mealsDataIngredients);

  // Add click event listeners to each ingredient item
  $(".item-Ingredients").click(function () {
    displayItemOfIngredients(this.getAttribute("stringredient"));
  });
  hideLoadingScreen();
}

// Displays the meals that use a specific ingredient
async function displayItemOfIngredients(strIngredients) {
  showLoadingScreen();
  let apiResponseIngredients;

  // Fetch the meals that use the specified ingredient from the API
  apiResponseIngredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredients}`
  );
  console.log(apiResponseIngredients);
  let mealsDataIngredients = await apiResponseIngredients.json();
  $(".slider").addClass("d-none");

  // Display the retrieved meals on the webpage
  displayMeals(mealsDataIngredients);

  // Add click event listeners to each meal item
  $(".item").click(function (e) {
    displayItemIngredientById(mealsDataIngredients.meals[this.getAttribute("index")].idMeal);
    $('.main-meals').addClass('d-none');
    $('.displayMealInfo').removeClass('d-none');
    $('.inputSearch').addClass('d-none');
});
  hideLoadingScreen();
}

/**
 * This function generates and displays a contact form on the web page.
 * The generated form includes input fields for name, email, phone, age, password, and repassword.
 * Each input field has an associated alert element for displaying validation messages.
 * The function also sets up event listeners for input fields to trigger input validation.
 * Finally, the generated form is appended to an element with the class "main-meals".
 */
function displayContact() {
  showLoadingScreen();
  $(".main-meals").removeClass("d-none");
  $(".slider").addClass("d-none");

  // Generate the HTML code for the contact form
  let box = `<div class="contact my-5  d-flex justify-content-center align-items-center">
    <div class="container w-75 bg-about  py-5 width  text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation('nameInput')" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="ena97s">
                <div id="nameInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation('emailInput')" type="email" class="form-control " placeholder="Enter Your Email" fdprocessedid="xay6jk">
                <div id="emailInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation('phoneInput')" type="text" class="form-control " placeholder="Enter Your Phone" fdprocessedid="r1cr">
                <div id="phoneInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation('ageInput')" type="number" class="form-control " placeholder="Enter Your Age" fdprocessedid="suv7ko">
                <div id="ageInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation('passwordInput')" type="password" class="form-control " placeholder="Enter Your Password" fdprocessedid="ax0f0p">
                <div id="passwordInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation('repasswordInput')" type="password" class="form-control " placeholder="Repassword" fdprocessedid="2aoe8e">
                <div id="repasswordInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3 ">Submit</button>
    </div>
</div>`;
  // Display the generated form by setting its HTML code as the content of an element with the class "main-meals"
  document.querySelector(".main-meals").innerHTML = box;
  hideLoadingScreen();
}
/**
 * This function performs validation for the input fields based on their IDs.
 * It retrieves the input value, performs validation, and updates the visibility of error alerts.
 * It also enables or disables the submit button based on overall validation.
 */
function inputsValidation(inputId) {
  // Retrieve input value
  var inputValue = document.getElementById(inputId).value;

  // Perform validation for the specific input field
  var isValid = true;
  var errorMessage = "";
  // Validation for different input fields
  switch (inputId) {
    case "nameInput":
      isValid = /^[A-Za-z\s]+$/.test(inputValue);
      errorMessage = "Special characters and numbers not allowed";
      break;
    case "emailInput":
      isValid = /^[\w.-]+@[\w.-]+\.[\w]+$/.test(inputValue);
      errorMessage = "Email not valid *exemple@yyy.zzz";
      break;
    case "phoneInput":
      isValid = /^[0-9]{10}$/.test(inputValue);
      errorMessage = "Enter valid Phone Number";
      break;
    case "ageInput":
      isValid = Number.isInteger(Number(inputValue)) && Number(inputValue) > 0;
      errorMessage = "Enter valid age";
      break;
    case "passwordInput":
      isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(inputValue);
      errorMessage =
        "Password should have a minimum length of 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit";
      break;
    case "repasswordInput":
      var password = document.getElementById("passwordInput").value;
      isValid = inputValue === password;
      errorMessage = "Enter valid repassword";
      break;
    default:
      break;
  }

  // Update visibility of error alert for the specific input field
  var alertId = inputId + "Alert";
  var alertElement = document.getElementById(alertId);
  alertElement.textContent = errorMessage;
  alertElement.classList.toggle("d-none", isValid);
  // Enable or disable the submit button based on overall validation
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = !(
    validateName(document.getElementById("nameInput").value) &&
    validateEmail(document.getElementById("emailInput").value) &&
    validatePhone(document.getElementById("phoneInput").value) &&
    validateAge(document.getElementById("ageInput").value) &&
    validatePassword(document.getElementById("passwordInput").value) &&
    validateRepassword(
      document.getElementById("passwordInput").value,
      document.getElementById("repasswordInput").value
    )
  );
}

function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

function validateEmail(email) {
  return /^[\w.-]+@[\w.-]+\.[\w]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function validateAge(age) {
  return Number.isInteger(Number(age)) && Number(age) > 0;
}

function validatePassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function validateRepassword(password, repassword) {
  return password === repassword;
}
