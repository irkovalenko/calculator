const numbers = document.querySelectorAll(".number");

function handleNumber(number) {
  console.log("User entered number:", number);

  // Later:
  // screen.value += number;
}

// Mouse clicks
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumber(button.value);
  });
});

// Keyboard
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    handleNumber(event.key);
  }
});




