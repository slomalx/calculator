document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.getElementById('viewer');
    const numberButtons = document.querySelectorAll('.number');
    const resetButton = document.getElementById('reset');
    const operationButtons = document.querySelectorAll('.operation');
    const equalsButton = document.getElementById('equals');

    let currentValue = 0;
    let storedValue = null;
    let currentOperation = null;
    let lastSecondNumber = null;
    let shouldResetViewer = false;
    const MAX_DIGITS = 18;

    function factorial(n) {
        if (n >= 100) return Infinity;
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    function formatNumber(num) {
        if (num === Infinity || num === -Infinity) return 'Infinity';
        if (isNaN(num)) return 'Error';

            // Округляем числа с плавающей точкой для устранения ошибок типа 0.1 + 0.2
    if (Number.isInteger(num) === false) {
        // Считаем количество знаков после запятой
        const decimalPlaces = Math.max(
            num.toString().split('.')[1]?.length || 0,
            (lastSecondNumber?.toString().split('.')[1]?.length || 0)
        );
        
        // Округляем до 10 знаков или до максимального количества знаков в операндах
        num = parseFloat(num.toFixed(Math.min(10, decimalPlaces)));
    }
    
        
        const numStr = num.toString();
        const digits = numStr.replace(/[^0-9]/g, '').length;
        
        if (digits > MAX_DIGITS || Math.abs(num) >= 1e18 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)) {
            return num.toExponential(10)
                   .replace(/(\.\d*?)0+e/, '$1e')
                   .replace(/\.e/, 'e');
        }
        return numStr;
    }
    
    function updateViewer(value) {
        viewer.value = formatNumber(value);
        currentValue = value;
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (viewer.value === 'Infinity' || viewer.value === 'Error' || shouldResetViewer) {
                viewer.value = '';
                shouldResetViewer = false;
            }
            
            const input = this.dataset.number;
            
            if (input === '.') {
                if (viewer.value.includes('.') || viewer.value.includes('e')) return;
                if (viewer.value === '') viewer.value = '0';
                viewer.value += '.';
                return;
            }
            
            const currentDigits = viewer.value.replace(/[^0-9]/g, '').length;
            if (currentDigits >= MAX_DIGITS && !viewer.value.includes('e')) {
                return;
            }
            
            viewer.value = viewer.value === '0' ? input : viewer.value + input;
        });
    });

    resetButton.addEventListener('click', function() {
        viewer.value = '0';
        currentValue = 0;
        storedValue = null;
        currentOperation = null;
        lastSecondNumber = null;
        shouldResetViewer = false;
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (viewer.value === '' || viewer.value === '-') return;
            
            const operation = this.id;
            
            if (operation === 'factorial') {
                const num = parseFloat(viewer.value);
                updateViewer(factorial(num));
                return;
            }

            if (operation === 'sqrt') {
                const num = parseFloat(viewer.value);
                if (num < 0) {
                    updateViewer(NaN); // Вернет "Error" благодаря formatNumber
                } else {
                    updateViewer(Math.sqrt(num));
                }
                return;
            }
            
            storedValue = parseFloat(viewer.value);
            currentOperation = operation;
            shouldResetViewer = true;
            viewer.value = '';
        });
    });

    equalsButton.addEventListener('click', function() {
        if (currentOperation === null && storedValue === null) return;
        
        const secondNumber = viewer.value === '' || shouldResetViewer 
                          ? (lastSecondNumber || 0) 
                          : parseFloat(viewer.value);
        
        lastSecondNumber = secondNumber;
        
        let result;
        switch(currentOperation) {
            case 'plus':
                result = storedValue + secondNumber;
                break;
            case 'minus':
                result = storedValue - secondNumber;
                break;
            case 'multi':
                result = storedValue * secondNumber;
                break;
            case 'divide':
                result = secondNumber === 0 ? NaN : storedValue / secondNumber;
                break;
            case 'power':
                result = Math.pow(storedValue, secondNumber);
                break;
            default:
                return;
        }
        
        updateViewer(result);
        storedValue = result;
        shouldResetViewer = true;
    });
});