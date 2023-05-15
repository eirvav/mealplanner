//Animate content load
const calc = document.querySelector(".main");

calc.style.display = "none"; // hide the calc div initially

setTimeout(function () {
  calc.style.display = "block"; // show the calc div after a short delay
  calc.classList.add("show"); // add the "show" class to trigger the slide-in animation
}, 500);

//preload content
const button = document.querySelector(".btn-primary");
const preloader = document.querySelector("#preloader");
const generatedContent = document.querySelector(".generated-content");

preloader.style.display = "none"; // hide the preloader initially
generatedContent.style.display = "none"; // hide the generated content initially

button.addEventListener("click", function () {
  preloader.style.display = "block"; // show the preloader
  setTimeout(function () {
    preloader.style.display = "none"; // hide the preloader after 2 seconds
    generatedContent.style.display = "block"; // show the generated content
    generatedContent.classList.add("show"); // add the "show" class to trigger the animation
  }, 1500);
});

//Show right container
$(document).ready(function () {
  $(".add-button").click(function () {
    $("#myDiv").show(); // Show the myDiv div
  });
});
