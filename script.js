const numbers = document.querySelectorAll(".number");
const backspace = document.querySelector(".backspace");
const screen = document.querySelector(".calculator-screen");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");

let firstNumber = "";
let operator = "";
let secondNumber = "";

function formatResult(num) {
  if (!isFinite(num)) return num;
  return parseFloat(num.toFixed(2));
}

function performCalculation(num1, op, num2) {
  switch (op) {
    case "+":
      return formatResult(num1 + num2);
    case "-":
      return formatResult(num1 - num2);
    case "*":
      return formatResult(num1 * num2);
    case "÷":
      if (num2 === 0) {
        alert("Nice try. It's 0 anyway 🚫");
        return { error: "Division by zero" };
      }
      return formatResult(num1 / num2);
    case "%":
      if (num2 === 0) {
        alert("0 anyway, you genius! 🚫");
        return { error: "Modulo by zero" };
      }
      return formatResult(num1 % num2);
    default:
      return { error: "Unknown operator" };
  }
}

function updateDecimalButtonState() {
  const currentValue = operator === "" ? firstNumber : secondNumber;
  decimal.disabled = currentValue.includes(".");
}

function handleNumber(number) {
  if (operator === "") {
    firstNumber += number;
    screen.value = firstNumber;
  } else {
    secondNumber += number;
    screen.value = secondNumber;
  }
  updateDecimalButtonState();
}

function handleDecimal() {
  if (operator === "") {
    if (!firstNumber.includes(".")) {
      firstNumber += firstNumber === "" ? "0." : ".";
      screen.value = firstNumber;
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += secondNumber === "" ? "0." : ".";
      screen.value = secondNumber;
    }
  }
  updateDecimalButtonState();
}

function handleBackspace() {
  screen.value = screen.value.slice(0, -1);
}

function resetState() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDecimalButtonState();
}

function clearScreen() {
  screen.value = "";
}

function handleOperator(selectedOperator) {
  if (firstNumber === "") {
    return;
  }

  if (operator !== "" && secondNumber !== "") {
    const result = performCalculation(
      Number(firstNumber),
      operator,
      Number(secondNumber),
    );

    if (result && typeof result === "object" && result.error) {
      resetState();
      return;
    }

    screen.value = result;
    firstNumber = result.toString();
    secondNumber = "";
  }

  operator = selectedOperator;
  updateDecimalButtonState();
}

function calculate() {
  if (firstNumber === "" || operator === "" || secondNumber === "") {
    return;
  }

  const result = performCalculation(
    Number(firstNumber),
    operator,
    Number(secondNumber),
  );

  if (result && typeof result === "object" && result.error) {
    resetState();
    return;
  }

  screen.value = result;
  resetState();
}

numbers.forEach((button) => {
  button.addEventListener("click", () => handleNumber(button.textContent));
});

operators.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

equals.addEventListener("click", calculate);
backspace.addEventListener("click", handleBackspace);
clearButton.addEventListener("click", clearScreen);
decimal.addEventListener("click", handleDecimal);

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    handleNumber(event.key);
  } else if (event.key === "+") {
    handleOperator("+");
  } else if (event.key === "-") {
    handleOperator("-");
  } else if (event.key === "*") {
    handleOperator("*");
  } else if (event.key === "/" || event.key === "÷") {
    handleOperator("÷");
  } else if (event.key === "%") {
    handleOperator("%");
  } else if (event.key === ".") {
    handleDecimal();
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    handleBackspace();
  } else if (event.key === "Escape") {
    clearScreen();
  }
});
