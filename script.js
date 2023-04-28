//Hides the meal selector before it displayed after "submit"
window.onload = function () {
  let hideresult = document.getElementById("mealplan-container");
  hideresult.style.visibility = "hidden";
};

document.querySelectorAll(".kort").forEach((card) => {
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

var arrayRandom = [];

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
      "https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/01195da35abaca7772964f3b131741531a865cec/mealplans.json",
      function (result) {
        console.log(result);
        // Displays the hidden content
        let showresult = document.getElementById("mealplan-container");
        showresult.style.visibility = "visible";
        var randomDish1 = Math.floor(Math.random() * 4);
        var randomDish2 = Math.floor(Math.random() * 4);
        while (randomDish1 == randomDish2) {
          randomDish2 = Math.floor(Math.random() * 4);
        }
        arrayRandom = [];
        arrayRandom.push(randomDish1);
        arrayRandom.push(randomDish2);
        console.log(randomDish1);
        console.log(randomDish2);
        getBreakfast(result, mealType, randomDish1, randomDish2);
        getLunch(result, mealType, randomDish1, randomDish2);
      }
    );
  });
//
// MEAL OPTIONS
//

function getBreakfast(result, mealType, randomDish1, randomDish2) {
  console.log(mealType);
  console.log(randomDish1);
  console.log(randomDish2);
  titlemeal = document.getElementsByClassName("title-meal-breakfast");
  calories = document.getElementsByClassName("calories-breakfast");
  imgchange = document.getElementsByClassName("img-breakfast");
  if (mealType == "All") {
    imgchange[0].src = result.All.Breakfast[randomDish1].Img;
    titlemeal[0].innerHTML = result.All.Breakfast[randomDish1].Meal;
    calories[0].innerHTML =
      result.All.Breakfast[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.All.Breakfast[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.All.Breakfast[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.All.Breakfast[randomDish2].Img;
    titlemeal[1].innerHTML = result.All.Breakfast[randomDish2].Meal;
    calories[1].innerHTML =
      result.All.Breakfast[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.All.Breakfast[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.All.Breakfast[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < result.All.Breakfast.length; i++) {
    //   imgchange[i].src = result.All.Breakfast[i].Img;
    //   titlemeal[i].innerHTML = result.All.Breakfast[i].Meal;
    //   calories[i].innerHTML = result.All.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    // }
  } else if (mealType == "Paleo") {
    imgchange[0].src = result.Paleo.Breakfast[randomDish1].Img;
    titlemeal[0].innerHTML = result.Paleo.Breakfast[randomDish1].Meal;
    calories[0].innerHTML =
      result.Paleo.Breakfast[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.Paleo.Breakfast[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.Paleo.Breakfast[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.Paleo.Breakfast[randomDish2].Img;
    titlemeal[1].innerHTML = result.Paleo.Breakfast[randomDish2].Meal;
    calories[1].innerHTML =
      result.Paleo.Breakfast[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.Paleo.Breakfast[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.Paleo.Breakfast[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < result.Paleo.Breakfast.length; i++) {
    //   imgchange[i].src = result.Paleo.Breakfast[i].Img;
    //   titlemeal[i].innerHTML = result.Paleo.Breakfast[i].Meal;
    //   calories[i].innerHTML = result.Paleo.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    // }
  } else if (mealType == "Vegan") {
    imgchange[0].src = result.Vegan.Breakfast[randomDish1].Img;
    titlemeal[0].innerHTML = result.Vegan.Breakfast[randomDish1].Meal;
    calories[0].innerHTML =
      result.Vegan.Breakfast[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.Vegan.Breakfast[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.Vegan.Breakfast[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.Vegan.Breakfast[randomDish2].Img;
    titlemeal[1].innerHTML = result.Vegan.Breakfast[randomDish2].Meal;
    calories[1].innerHTML =
      result.Vegan.Breakfast[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.Vegan.Breakfast[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.Vegan.Breakfast[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < result.Vegan.Breakfast.length; i++) {
    //   imgchange[i].src = result.Vegan.Breakfast[i].Img;
    //   titlemeal[i].innerHTML = result.Vegan.Breakfast[i].Meal;
    //   calories[i].innerHTML = result.Vegan.Breakfast[i].Nutrition.Calories + " Calories | " + result.All.Breakfast[i].Nutrition.Protein + " Protein | " + result.All.Breakfast[i].Nutrition.Fat + " Fat";
    // }
  }
}

function getLunch(result, mealType, randomDish1, randomDish2) {
  titlemeal = document.getElementsByClassName("title-meal-lunch");
  calories = document.getElementsByClassName("calories-lunch");
  imgchange = document.getElementsByClassName("img-lunch");
  if (mealType == "All") {
    imgchange[0].src = result.All.Lunch[randomDish1].Img;
    titlemeal[0].innerHTML = result.All.Lunch[randomDish1].Meal;
    calories[0].innerHTML =
      result.All.Lunch[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.All.Lunch[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.All.Lunch[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.All.Lunch[randomDish2].Img;
    titlemeal[1].innerHTML = result.All.Lunch[randomDish2].Meal;
    calories[1].innerHTML =
      result.All.Lunch[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.All.Lunch[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.All.Lunch[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < 2; i++) {
    //   imgchange[i].src = result.All.Lunch[i].Img;
    //   titlemeal[i].innerHTML = result.All.Lunch[i].Meal;
    //   calories[i].innerHTML = result.All.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    // }
  } else if (mealType == "Paleo") {
    imgchange[0].src = result.Paleo.Lunch[randomDish1].Img;
    titlemeal[0].innerHTML = result.Paleo.Lunch[randomDish1].Meal;
    calories[0].innerHTML =
      result.Paleo.Lunch[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.Paleo.Lunch[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.Paleo.Lunch[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.Paleo.Lunch[randomDish2].Img;
    titlemeal[1].innerHTML = result.Paleo.Lunch[randomDish2].Meal;
    calories[1].innerHTML =
      result.Paleo.Lunch[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.Paleo.Lunch[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.Paleo.Lunch[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < 2; i++) {
    //   imgchange[i].src = result.Paleo.Lunch[i].Img;
    //   titlemeal[i].innerHTML = result.Paleo.Lunch[i].Meal;
    //   calories[i].innerHTML = result.Paleo.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    // }
  } else if (mealType == "Vegan") {
    imgchange[0].src = result.Vegan.Lunch[randomDish1].Img;
    titlemeal[0].innerHTML = result.Vegan.Lunch[randomDish1].Meal;
    calories[0].innerHTML =
      result.Vegan.Lunch[randomDish1].Nutrition.Calories +
      " Calories | " +
      result.Vegan.Lunch[randomDish1].Nutrition.Protein +
      " Protein | " +
      result.Vegan.Lunch[randomDish1].Nutrition.Fat +
      " Fat";
    imgchange[1].src = result.Vegan.Lunch[randomDish2].Img;
    titlemeal[1].innerHTML = result.Vegan.Lunch[randomDish2].Meal;
    calories[1].innerHTML =
      result.Vegan.Lunch[randomDish2].Nutrition.Calories +
      " Calories | " +
      result.Vegan.Lunch[randomDish2].Nutrition.Protein +
      " Protein | " +
      result.Vegan.Lunch[randomDish2].Nutrition.Fat +
      " Fat";

    // for (i = 0; i < 2; i++) {
    //   imgchange[i].src = result.Vegan.Lunch[i].Img;
    //   titlemeal[i].innerHTML = result.Vegan.Lunch[i].Meal;
    //   calories[i].innerHTML = result.Vegan.Lunch[i].Nutrition.Calories + " Calories | " + result.All.Lunch[i].Nutrition.Protein + " Protein | " + result.All.Lunch[i].Nutrition.Fat + " Fat";
    // }
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
  console.log(arrayRandom);

  $.getJSON(
    "https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/01195da35abaca7772964f3b131741531a865cec/mealplans.json",
    function (result) {
      if (mealday == "Lunch") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";
        if (mealType == "All") {
          if (btnNumber == 0) {
            newDiv.innerHTML = result.All.Lunch[arrayRandom[0]].Meal + "\n";
            for (
              var i = 0;
              i < result.All.Lunch[arrayRandom[0]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.All.Lunch[arrayRandom[0]].Ingredients[i]
              );
            }
          } else if (btnNumber == 1) {
            newDiv.innerHTML = result.All.Lunch[arrayRandom[1]].Meal + "\n";
            for (
              var i = 0;
              i < result.All.Lunch[arrayRandom[1]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.All.Lunch[arrayRandom[1]].Ingredients[i]
              );
            }
          }
          ingredients();
        } else if (mealType == "Paleo") {
          if (btnNumber == 0) {
            newDiv.innerHTML = result.Paleo.Lunch[arrayRandom[0]].Meal + "\n";
            for (
              var i = 0;
              i < result.Paleo.Lunch[arrayRandom[0]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Paleo.Lunch[arrayRandom[0]].Ingredients[i]
              );
            }
          } else if (btnNumber == 1) {
            newDiv.innerHTML = result.Paleo.Lunch[arrayRandom[1]].Meal + "\n";
            for (
              var i = 0;
              i < result.Paleo.Lunch[arrayRandom[1]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Paleo.Lunch[arrayRandom[1]].Ingredients[i]
              );
            }
          }
          ingredients();
        } else if (mealType == "Vegan") {
          if (btnNumber == 0) {
            newDiv.innerHTML = result.Vegan.Lunch[arrayRandom[0]].Meal + "\n";
            for (
              var i = 0;
              i < result.Vegan.Lunch[arrayRandom[0]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Vegan.Lunch[arrayRandom[0]].Ingredients[i]
              );
            }
          } else if (btnNumber == 1) {
            newDiv.innerHTML = result.Vegan.Lunch[arrayRandom[1]].Meal + "\n";
            for (
              var i = 0;
              i < result.Vegan.Lunch[arrayRandom[1]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Vegan.Lunch[arrayRandom[1]].Ingredients[i]
              );
            }
          }
          ingredients();
        }
        document.getElementById("selected-meals").appendChild(newDiv);
      } else if (mealday == "Breakfast") {
        var newDiv = document.createElement("div");
        newDiv.className = "added-meals";
        if (mealType == "All") {
          if (btnNumber == 0) {
            newDiv.innerHTML = result.All.Breakfast[arrayRandom[0]].Meal + "\n";
            for (
              var i = 0;
              i < result.All.Breakfast[arrayRandom[0]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.All.Breakfast[arrayRandom[0]].Ingredients[i]
              );
            }
          } else if (btnNumber == 1) {
            newDiv.innerHTML = result.All.Breakfast[arrayRandom[1]].Meal + "\n";
            for (
              var i = 0;
              i < result.All.Breakfast[arrayRandom[1]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.All.Breakfast[arrayRandom[1]].Ingredients[i]
              );
            }
          }
          ingredients();
        } else if (mealType == "Paleo") {
          if (btnNumber == 0) {
            newDiv.innerHTML =
              result.Paleo.Breakfast[arrayRandom[0]].Meal + "\n";
            for (
              var i = 0;
              i < result.Paleo.Breakfast[arrayRandom[0]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Paleo.Breakfast[arrayRandom[0]].Ingredients[i]
              );
            }
          } else if (btnNumber == 1) {
            newDiv.innerHTML =
              result.Paleo.Breakfast[arrayRandom[1]].Meal + "\n";
            for (
              var i = 0;
              i < result.Paleo.Breakfast[arrayRandom[1]].Ingredients.length;
              i++
            ) {
              ingredientArray.push(
                result.Paleo.Breakfast[arrayRandom[1]].Ingredients[i]
              );
            }
          }
          ingredients();
        } else if (mealType == "Vegan") {
          if (btnNumber == 0) {
            newDiv.innerHTML =
              result.Vegan.Breakfast[arrayRandom[0]].Meal + "\n";
          } else if (btnNumber == 1) {
            newDiv.innerHTML =
              result.Vegan.Breakfast[arrayRandom[1]].Meal + "\n";
          }
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
