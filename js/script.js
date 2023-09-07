const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const clearButton = document.querySelector('.clear');

let currentInput = '';
let firstValue = '';
let operator = '';

buttons.forEach(button => {
	button.addEventListener('click', function(e) {
		const val = e.target.getAttribute('data-val');

		if (!val && e.target.classList.contains('equals')){
			if(firstValue && operator && currentInput) {
				firstValue = operate(firstValue, operator, currentInput).toString();
				display.value = firstValue;
				currentInput = '';
				operator = '';
			}
			return;
		}
		if (val >= '0' && val <= '9' || val === '.') {
			currentInput += val;
			display.value = currentInput;
		} else {
			if (!operator && firstValue) {
				firstValue = operate(firstValue,operator, currentInput).toString();
				currentInput = '';
			} else if (!firstValue) {
				firstValue = currentInput;
				currentInput = '';
			}
			operator = val;
		}
	});
});
clearButton.addEventListener('click', function () {
	currentInput = '';
	firstValue = '';
	operator = '';
	display.value = '';
})
function operate (a, operator, b) {
	a = parseFloat(a);
	b = parseFloat(b);

	switch (operator) {
		case '+':
		return a + b;
		case '-':
		return a-b;
		case '*':
		return a*b;
		case '/':
		return b !== 0 ? a/b : 'Error';
		default:
		return a;
	}
}