//Hides the meal selector before it displayed after "submit"
window.onload = function () {
  let hideresult = document.getElementById("mealplan-container");
  hideresult.style.visibility = "hidden";
};

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

    // Get the daily calorie intake
    const dailyCalories = document.getElementById("daily-calories").value;

    // Log the values (you can replace this with your desired logic)
    // console.log("Meal Type:", mealType);
    // console.log("Number of Meals per Day:", numMeals);
    // console.log("Daily Calorie Intake:", dailyCalories);

    // GET THE JSON FOR WEB AND STARTS FUNCTION WITH ALL THE NESSESERY VARIABLES
    $.getJSON(
      "https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/e4b70015cfba9e78ce591e32e857241db891ab74/mealplans.json",
      function (result) {
        console.log(result);
        // Displays the hidden content
        let showresult = document.getElementById("mealplan-container");
        showresult.style.visibility = "visible";
        getBreakfast(result, mealType);
        getLunch(result, mealType);
      }
    );
  });
//
// MEAL OPTIONS
//

function getBreakfast(result, mealType) {
  console.log(mealType);
  titlemeal = document.getElementsByClassName("title-meal-breakfast");
  calories = document.getElementsByClassName("calories-breakfast");
  imgchange = document.getElementsByClassName("img-breakfast");
  if (mealType == "All") {
    for (i = 0; i < result.All.Breakfast.length; i++) {
      imgchange[i].src = result.All.Breakfast[i].Img;
      titlemeal[i].innerHTML = result.All.Breakfast[i].Meal;
      calories[i].innerHTML =
        result.All.Breakfast[i].Nutrition.Calories +
        " Calories | " +
        result.All.Breakfast[i].Nutrition.Protein +
        " Protein | " +
        result.All.Breakfast[i].Nutrition.Fat +
        " Fat";
    }
  } else if (mealType == "Paleo") {
    for (i = 0; i < result.Paleo.Breakfast.length; i++) {
      imgchange[i].src = result.Paleo.Breakfast[i].Img;
      titlemeal[i].innerHTML = result.Paleo.Breakfast[i].Meal;
      calories[i].innerHTML =
        result.Paleo.Breakfast[i].Nutrition.Calories +
        " Calories | " +
        result.All.Breakfast[i].Nutrition.Protein +
        " Protein | " +
        result.All.Breakfast[i].Nutrition.Fat +
        " Fat";
    }
  } else if (mealType == "Vegan") {
    for (i = 0; i < result.Vegan.Breakfast.length; i++) {
      imgchange[i].src = result.Vegan.Breakfast[i].Img;
      titlemeal[i].innerHTML = result.Vegan.Breakfast[i].Meal;
      calories[i].innerHTML =
        result.Vegan.Breakfast[i].Nutrition.Calories +
        " Calories | " +
        result.All.Breakfast[i].Nutrition.Protein +
        " Protein | " +
        result.All.Breakfast[i].Nutrition.Fat +
        " Fat";
    }
  }
}

function getLunch(result, mealType) {
  titlemeal = document.getElementsByClassName("title-meal-lunch");
  calories = document.getElementsByClassName("calories-lunch");
  imgchange = document.getElementsByClassName("img-lunch");
  if (mealType == "All") {
    for (i = 0; i < result.All.Lunch.length; i++) {
      imgchange[i].src = result.All.Lunch[i].Img;
      titlemeal[i].innerHTML = result.All.Lunch[i].Meal;
      calories[i].innerHTML =
        result.All.Lunch[i].Nutrition.Calories +
        " Calories | " +
        result.All.Lunch[i].Nutrition.Protein +
        " Protein | " +
        result.All.Lunch[i].Nutrition.Fat +
        " Fat";
    }
  } else if (mealType == "Paleo") {
    for (i = 0; i < result.Paleo.Lunch.length; i++) {
      imgchange[i].src = result.Paleo.Lunch[i].Img;
      titlemeal[i].innerHTML = result.Paleo.Lunch[i].Meal;
      calories[i].innerHTML =
        result.Paleo.Lunch[i].Nutrition.Calories +
        " Calories | " +
        result.All.Lunch[i].Nutrition.Protein +
        " Protein | " +
        result.All.Lunch[i].Nutrition.Fat +
        " Fat";
    }
  } else if (mealType == "Vegan") {
    for (i = 0; i < result.Vegan.Lunch.length; i++) {
      imgchange[i].src = result.Vegan.Lunch[i].Img;
      titlemeal[i].innerHTML = result.Vegan.Lunch[i].Meal;
      calories[i].innerHTML =
        result.Vegan.Lunch[i].Nutrition.Calories +
        " Calories | " +
        result.All.Lunch[i].Nutrition.Protein +
        " Protein | " +
        result.All.Lunch[i].Nutrition.Fat +
        " Fat";
    }
  }
}

// ADD MEALS TO RIGHT SIDE
var ingredientArray = [];
function clickMeal(btnNumber, mealday, mealType) {
  const selectedMealTypeCard = document.querySelector(".card-selected");
  mealType = selectedMealTypeCard
    ? selectedMealTypeCard.querySelector("p").textContent
    : null;
  console.log(mealType);
  console.log(mealday);

  $.getJSON(
    "https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/e4b70015cfba9e78ce591e32e857241db891ab74/mealplans.json",
    function (result) {
      if (mealday == "Lunch") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";
        if (mealType == "All") {
          newDiv.innerHTML = result.All.Lunch[btnNumber].Meal + "\n";
          //newDiv.innerHTML += result.Paleo.Lunch[btnNumber].Nutrition.Calories + "g Calories | " + result.All.Lunch[btnNumber].Nutrition.Protein + "g Protein | " + result.All.Lunch[btnNumber].Nutrition.Fat + "g Fat";
          for (
            var i = 0;
            i < result.All.Lunch[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(result.All.Lunch[btnNumber].Ingredients[i]);
          }
          ingredients();
        } else if (mealType == "Paleo") {
          newDiv.textContent = result.Paleo.Lunch[btnNumber].Meal;
          for (
            var i = 0;
            i < result.Paleo.Lunch[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(result.Paleo.Lunch[btnNumber].Ingredients[i]);
          }
          ingredients();
        } else if (mealType == "Vegan") {
          newDiv.textContent = result.Vegan.Lunch[btnNumber].Meal;
          for (
            var i = 0;
            i < result.Vegan.Lunch[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(result.Vegan.Lunch[btnNumber].Ingredients[i]);
          }
          ingredients();
        }
        document.getElementById("selected-meals").appendChild(newDiv);
      } else if (mealday == "Breakfast") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";
        if (mealType == "All") {
          newDiv.textContent = result.All.Breakfast[btnNumber].Meal;
          for (
            var i = 0;
            i < result.All.Breakfast[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result.All.Breakfast[btnNumber].Ingredients[i]
            );
          }
          ingredients();
        } else if (mealType == "Paleo") {
          newDiv.textContent = result.Paleo.Breakfast[btnNumber].Meal;
          for (
            var i = 0;
            i < result.Paleo.Breakfast[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result.Paleo.Breakfast[btnNumber].Ingredients[i]
            );
          }
          ingredients();
        } else if (mealType == "Vegan") {
          newDiv.textContent = result.Vegan.Breakfast[btnNumber].Meal;
          for (
            var i = 0;
            i < result.Vegan.Breakfast[btnNumber].Ingredients.length;
            i++
          ) {
            ingredientArray.push(
              result.Vegan.Breakfast[btnNumber].Ingredients[i]
            );
          }
          ingredients();
        }
        document.getElementById("selected-meals").appendChild(newDiv);
      }
    }
  );
}

function ingredients() {
  var displayArray = "";
  for (var i = 0; i < ingredientArray.length; i++) {
    displayArray += ingredientArray[i] + "<br>";
  }
  document.getElementById("ingredients").innerHTML = displayArray;
}
