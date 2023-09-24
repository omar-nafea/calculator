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
    const tokens = expression.split(/([+\-*/])/).filter(token => token.trim() !== '');
    const operators = [];
    const operands = [];

    for (const token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            while (operators.length > 0 && hasPrecedence(token, operators[operators.length - 1])) {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                operands.push(applyOperator(operand1, operand2, operator));
            }
            operators.push(token);
        } else {
            operands.push(parseFloat(token));
        }
    }

    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        operands.push(applyOperator(operand1, operand2, operator));
    }

    if (operands.length === 1) {
        return operands[0];
    } else {
        throw new Error("Invalid expression");
    }
}

function hasPrecedence(op1, op2) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    return precedence[op1] >= precedence[op2];
}

function applyOperator(operand1, operand2, operator) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 === 0) {
                throw new Error("Division by zero");
            }
            return operand1 / operand2;
        default:
            throw new Error("Invalid operator");
    }
}

Btn.forEach((e) => {
    e.addEventListener("click", () => {
        currentInput += e.textContent;
        updateDisplay();
    });
});

// Modify the decimal button to add a decimal point
document.querySelector(".dot").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
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
