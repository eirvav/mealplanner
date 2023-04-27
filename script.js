
//Hides the meal selector before it displayed after "submit"
window.onload = function () {
  let hideresult = document.getElementById("mealplan-container");
  hideresult.style.visibility = "hidden";
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Remove the card-selected class from any previously selected card
    document.querySelectorAll(".card-selected").forEach((selectedCard) => {
      selectedCard.classList.remove("card-selected");
      selectedCard.style.backgroundColor = "";
      selectedCard.querySelector("p").style.color = "";
    });

    // Add the card-selected class to the clicked card
    e.currentTarget.classList.add("card-selected");
    e.currentTarget.style.backgroundColor = "#77C14B";
    e.currentTarget.querySelector("p").style.color = "#ffffff";
  });
});

// Set the "All" option as the default selected card on page load
document.addEventListener("DOMContentLoaded", function () {
  const allOptionCard = document.querySelector(".card[data-meal-type='All']");
  if (allOptionCard) {
    allOptionCard.classList.add("card-selected");
  }
});

document
  .getElementById("meal-planner-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the selected meal type
    const selectedMealTypeCard = document.querySelector(".card-selected");
    const mealType = selectedMealTypeCard
      ? selectedMealTypeCard.querySelector("p").textContent
      : null;

    // Get the number of meals per day
    const numMeals = document.getElementById("num-meals").value;

    // Get the daily calorie intake
    const dailyCalories = document.getElementById("daily-calories").value;

    // Log the values (you can replace this with your desired logic)
    // console.log("Meal Type:", mealType);
    // console.log("Number of Meals per Day:", numMeals);
    // console.log("Daily Calorie Intake:", dailyCalories);

    // GET THE JSON FOR WEB AND STARTS FUNCTION WITH ALL THE NESSESERY VARIABLES
    $.getJSON("https://gist.githubusercontent.com/isakmd/a5cfc2f513dfc58b4546310d66ad4b3b/raw/b0b6935a143b6484f31d3c8207d539af664141dc/mealplans.json", function (result) {
      console.log(result)
      // Displays the hidden content
      let showresult = document.getElementById("mealplan-container");
      showresult.style.visibility = "visible";
      getBreakfast(result, mealType);
      getLunch(result, mealType);
    });


  });
;

//
// MEAL OPTIONS
//


function getBreakfast(result, mealType) {
  console.log(mealType)
  titlemeal = document.getElementsByClassName("title-meal-breakfast")
  calories = document.getElementsByClassName("calories-breakfast")
  if (mealType == 'All') {
    for (i = 0; i < result.All.Breakfast.length; i++) {
      titlemeal[i].innerHTML = result.All.Breakfast[i].Meal;
      calories[i].innerHTML = result.All.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    }
  } else if (mealType == 'Paleo') {
    for (i = 0; i < result.Paleo.Breakfast.length; i++) {
      titlemeal[i].innerHTML = result.Paleo.Breakfast[i].Meal;
      calories[i].innerHTML = result.Paleo.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    }
  } else if (mealType == 'Vegan') {
    for (i = 0; i < result.Vegan.Breakfast.length; i++) {
      titlemeal[i].innerHTML = result.Vegan.Breakfast[i].Meal;
      calories[i].innerHTML = result.Vegan.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    }
  }
}

function getLunch(result, mealType) {
  titlemeal = document.getElementsByClassName("title-meal-lunch")
  calories = document.getElementsByClassName("calories-lunch")
  if (mealType == 'All') {
    for (i = 0; i < result.All.Lunch.length; i++) {
      titlemeal[i].innerHTML = result.All.Lunch[i].Meal;
      calories[i].innerHTML = result.All.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    }
  } else if (mealType == 'Paleo') {
    for (i = 0; i < result.Paleo.Lunch.length; i++) {
      titlemeal[i].innerHTML = result.Paleo.Lunch[i].Meal;
      calories[i].innerHTML = result.Paleo.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    }
  } else if (mealType == 'Vegan') {
    for (i = 0; i < result.Vegan.Lunch.length; i++) {
      titlemeal[i].innerHTML = result.Vegan.Lunch[i].Meal;
      calories[i].innerHTML = result.Vegan.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    }
  }
}


// ADD MEALS TO RIGHT SIDE

function clickMeal(btnNumber, mealday, mealType) {
  const selectedMealTypeCard = document.querySelector(".card-selected");
  mealType = selectedMealTypeCard
    ? selectedMealTypeCard.querySelector("p").textContent
    : null;
  console.log(mealType)
  console.log(mealday)
  $.getJSON("https://gist.githubusercontent.com/isakmd/a5cfc2f513dfc58b4546310d66ad4b3b/raw/b0b6935a143b6484f31d3c8207d539af664141dc/mealplans.json", function (result) {
    if (mealday == "Lunch") {
      var newDiv = document.createElement('div');
      newDiv.className = "added-meals";
      if (mealType == 'All') {
        newDiv.textContent = result.All.Lunch[btnNumber].Meal;
      } else if (mealType == 'Paleo') {
        newDiv.textContent = result.Paleo.Lunch[btnNumber].Meal;
      } else if (mealType == 'Vegan') {
        newDiv.textContent = result.Vegan.Lunch[btnNumber].Meal;
      }
      document.getElementById('selected-meals').appendChild(newDiv);
    } else if (mealday == "Breakfast") {
      var newDiv = document.createElement('div');
      newDiv.className = "added-meals";
      if (mealType == 'All') {
        newDiv.textContent = result.All.Breakfast[btnNumber].Meal;
      } else if (mealType == 'Paleo') {
        newDiv.textContent = result.Paleo.Breakfast[btnNumber].Meal;
      } else if (mealType == 'Vegan') {
        newDiv.textContent = result.Vegan.Breakfast[btnNumber].Meal;
      }
      document.getElementById('selected-meals').appendChild(newDiv);
    }

  });

}





