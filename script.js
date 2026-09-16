const numbers = document.querySelectorAll(".number");
const backspace = document.querySelector(".backspace");
const screen = document.querySelector(".calculator-screen");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let firstNumber = "";
let operator = "";
let secondNumber = "";

function handleNumber(number) {
  if (operator === "") {
    firstNumber += number;
    screen.value = firstNumber;
  } else {
    secondNumber += number;
    screen.value = secondNumber;
  }
}

function handleBackspace() {
  screen.value = screen.value.slice(0, -1);
}

function clearCalculator() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  screen.value = "";
}

function handleOperator(selectedOperator) {
  if (firstNumber === "") {
    return;
  }
  operator = selectedOperator;
}

function calculate() {
  if (firstNumber === "" || operator === "" || secondNumber === "") {
    return;
  }

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);
  let result;

  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  } else if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "÷") {
    result = num2 === 0 ? "Error" : num1 / num2;
  } else if (operator === "%") {
    result = num1 % num2;
  }

  screen.value = result;

  firstNumber = result.toString();
  operator = "";
  secondNumber = "";
}

numbers.forEach((button) => {
  button.addEventListener("click", () => handleNumber(button.textContent));
});

operators.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

equals.addEventListener("click", calculate);
backspace.addEventListener("click", handleBackspace);
clearButton.addEventListener("click", clearCalculator);

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    handleNumber(event.key);
  } else if (event.key === "+") {
    handleOperator("+");
  } else if (event.key === "-") {
    handleOperator("-");
  } else if (event.key === "*") {
    handleOperator("*");
  } else if (event.key === "/") {
    handleOperator("÷");
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "%") {
    handleOperator("%");
  } else if (event.key === "Backspace") {
    handleBackspace();
  } else if (event.key === "Escape") {
    clearCalculator();
  }
});
