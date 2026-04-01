const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            currentInput += value;
            display.textContent = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput) {
                if (previousInput && operator) {
                    calculate();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (value === '=') {
            if (previousInput && currentInput && operator) {
                calculate();
            }
        } else if (value === 'C') {
            clear();
        } else if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        }
    });
});

function calculate() {
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let operation = '';

    switch (operator) {
        case '+':
            operation = 'add';
            break;
        case '-':
            operation = 'subtract';
            break;
        case '*':
            operation = 'multiply';
            break;
        case '/':
            operation = 'divide';
            break;
    }

    fetch(`/api/calc?operation=${operation}&a=${a}&b=${b}`)
        .then(response => response.json())
        .then(data => {
            display.textContent = data.result;
            currentInput = data.result.toString();
            previousInput = '';
            operator = '';
        })
        .catch(error => {
            display.textContent = 'Error';
            clear();
        });
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}