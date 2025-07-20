// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      handleNumber(number);
    } else if (action) {
      handleAction(action);
    }
  });
});

function handleNumber(num) {
  if (resetNext) {
    currentInput = '';
    resetNext = false;
  }

  if (num === '.' && currentInput.includes('.')) return;
  currentInput += num;
  updateDisplay(currentInput);
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      currentInput = '';
      updateDisplay('0');
      break;
    case 'delete':
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      const opMap = {
        add: '+',
        subtract: '-',
        multiply: '*',
        divide: '/'
      };
      if (!endsWithOperator(currentInput)) {
        currentInput += opMap[action];
        updateDisplay(currentInput);
      }
      break;
    case 'equals':
      try {
        const result = eval(currentInput);
        updateDisplay(result);
        currentInput = result.toString();
        resetNext = true;
      } catch (e) {
        updateDisplay('Error');
        currentInput = '';
      }
      break;
  }
}

function updateDisplay(content) {
  display.textContent = content;
}

function endsWithOperator(input) {
  return /[+\-*/]$/.test(input);
}
