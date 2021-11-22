"use strict";

class Calculator {
    operands = ['', '']
    currentOperand = 0;
    operator = null;
    display = document.getElementById("display");
    displayingResult = false;

    setOperator(operator) {
        if (this.operands[0] != 0) {
            if (this.displayingResult) {
                this.displayingResult = false;
            }
            this.operator = operator;
            this.currentOperand = 1;
            this.display.innerText += ` ${operator} `;
        }
    }

    insertNumber(n) {
        if (this.displayingResult) {
            this.display.innerText = '';
            this.operands[0] = '';
        }
        this.operands[this.currentOperand] += n;
        this.display.innerText += `${n}`;
    }

    enableDecimal() {
        this.operands[this.currentOperand] += '.';
        this.display.innerText += '.';
    }

    calcResult() {
        if (this.operator) {
            let result;
            let operands = [parseFloat(this.operands[0]), parseFloat(this.operands[1])];
            switch (this.operator) {
                case '+':
                    result = operands[0] + operands[1];
                    break;
                case '−':
                    result = operands[0] - operands[1];
                    break;
                case '✕':
                    result = operands[0] * operands[1];
                    break;
                case '÷':
                    result = operands[0] / operands[1];
                    break;
                default:
                    console.log("invalid operand");
                    break;
            }
            this.display.innerText = result;
            this.currentOperand = 0;
            this.operands[0] = result;
            this.operands[1] = 0;
            this.operator = null;
            this.displayingResult = true;
        }
    }
}

let calc = new Calculator();

Array.from(document.querySelectorAll('.numeral')).forEach((button) => {
    button.addEventListener('click', (e) => {
        calc.insertNumber(button.innerText);
    });
});

Array.from(document.querySelectorAll('.operator')).forEach((button) => {
    button.addEventListener('click', (e) => {
        calc.setOperator(button.innerText);
    });
});

document.getElementById('decimal').addEventListener('click', (e) => {
    calc.enableDecimal();
});

document.getElementById('equals').addEventListener('click', (e) => {
    calc.calcResult();
});
