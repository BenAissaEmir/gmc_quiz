// 1. Grab the elements from the DOM
const resultText = document.getElementById('result-text');
const buttons = document.querySelectorAll('.box-par');

let currentInput = '';
let previousInput = '';
let operation = null;

// 2. Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // If it's a number
        if (!isNaN(value)) {
            handleNumber(value);
        } 
        // If it's an operator (+ or -)
        else if (value === '+' || value === '-') {
            handleOperator(value);
        } 
        // If it's the equals sign (=)
        else if (value === '=') {
            handleCalculate();
        }
    });
});

// 3. Logic for when a number is clicked
function handleNumber(num) {
    // Prevent multiple leading zeros
    if (currentInput === '0' && num === '0') return;
    
    // If screen currently shows 0, overwrite it; otherwise, append the number
    if (currentInput === '0' || currentInput === '') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateScreen(currentInput);
}

// 4. Logic for when + or - is clicked
function handleOperator(op) {
    if (currentInput === '') return; // Don't allow operator if no number is typed yet
    
    if (previousInput !== '') {
        handleCalculate(); // If there's already a pending math problem, solve it first
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = ''; // Clear current input to make room for the next number
}

// 5. Logic to calculate the result (=)
function handleCalculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    // Safety check: if either number is missing, do nothing
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
    previousInput = '';
    updateScreen(currentInput);
}

// 6. Helper function to refresh the calculator display
function updateScreen(value) {
    resultText.innerText = value;
}