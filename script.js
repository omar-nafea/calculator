const Btn = document.querySelectorAll(".number");
const display = document.querySelector(".digit");
const previous = document.querySelector(".previous");
const equal = document.querySelector(".equal");
const multiply = document.querySelector(".multiply");
const add = document.querySelector(".add");
const minus = document.querySelector(".minus");
const deleteBtn = document.querySelector(".delete");
const divide = document.querySelector(".divide");
const clear = document.querySelector(".ac");

let currentInput = "";
let expression = "";

function updateDisplay() {
    display.textContent = currentInput;
}

function addToExpression(value) {
    expression += value;
    previous.textContent = expression;
}

function clearAll() {
    currentInput = "";
    expression = "";
    previous.textContent = "";
    updateDisplay();
}

function calculate() {
    expression += currentInput;
    previous.textContent = expression;
    try {
        const result = evaluateExpression(expression);
        display.textContent = result;
        expression = result.toString();
    } catch (error) {
        display.textContent = "Error";
    }
    currentInput = "";
}

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const tokens = expression.split(/\b/).filter(token => token.trim() !== '');
    for (const operator of operators) {
        while (tokens.includes(operator)) {
            const operatorIndex = tokens.indexOf(operator);
            const leftOperand = parseFloat(tokens[operatorIndex - 1]);
            const rightOperand = parseFloat(tokens[operatorIndex + 1]);

            if (isNaN(leftOperand) || isNaN(rightOperand)) {
                throw new Error('Invalid expression');
            }

            let result;
            switch (operator) {
                case '+':
                    result = leftOperand + rightOperand;
                    break;
                case '-':
                    result = leftOperand - rightOperand;
                    break;
                case '*':
                    result = leftOperand * rightOperand;
                    break;
                case '/':
                    if (rightOperand === 0) {
                        throw new Error('Division by zero');
                    }
                    result = leftOperand / rightOperand;
                    break;
            }

            tokens.splice(operatorIndex - 1, 3, result.toString());
        }
    }

    if (tokens.length !== 1) {
        throw new Error('Invalid expression');
    }

    return parseFloat(tokens[0]);
}

Btn.forEach((e) => {
    e.addEventListener("click", () => {
        currentInput += e.textContent;
        updateDisplay();
    });
});

add.addEventListener("click", () => {
    addToExpression(currentInput + "+");
    currentInput = "";
});

minus.addEventListener("click", () => {
    addToExpression(currentInput + "-");
    currentInput = "";
});

multiply.addEventListener("click", () => {
    addToExpression(currentInput + "*");
    currentInput = "";
});

divide.addEventListener("click", () => {
    addToExpression(currentInput + "/");
    currentInput = "";
});

equal.addEventListener("click", calculate);

deleteBtn.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});

clear.addEventListener("click", clearAll);