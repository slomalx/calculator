document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.getElementById('viewer');
    const numberButtons = document.querySelectorAll('.number');
    const resetButton = document.getElementById('reset')
    const plusButton = document.getElementById('plus');
    const equalsButton = document.getElementById('equals');

    let firstNumber = null; // Здесь будем хранить первое число
    let isPlusPressed = false; // Флаг, что кнопка "+" была нажата

    

    viewer.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1'); // Удаляем лишние точки
    });
    

    
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.dataset.number;
            
            // Особый случай для точки
            if (input === '.') {
                // Если точка уже есть - не добавляем новую
                if (viewer.value.includes('.')) {
                    return;
                }
                // Если поле пустое - добавляем "0." вместо просто "."
                if (viewer.value === '') {
                    viewer.value = '0.';
                    return;
                }
            }
            
            // Добавляем цифру или точку
            viewer.value += input;
        });
    });

    // Обработчик для кнопки сброса
    resetButton.addEventListener('click', function() {
        viewer.value = ''; // Очищаем значение инпута
        firstNumber = null;
        isPlusPressed = false;
    });

    plusButton.addEventListener('click', function() {
        if (viewer.value === '') return; // Если ничего не введено — игнорируем
        
        firstNumber = parseFloat(viewer.value); // Запоминаем первое число
        viewer.value = ''; // Очищаем инпут
        isPlusPressed = true; // Устанавливаем флаг
    });

    // Кнопка "=" (выводит сумму)
    equalsButton.addEventListener('click', function() {
        if (!isPlusPressed || firstNumber === null || viewer.value === '') return;
        
        const secondNumber = parseFloat(viewer.value);
        const result = firstNumber + secondNumber;
        
        viewer.value = result.toString(); // Выводим результат
        firstNumber = null; // Сбрасываем сохранённое число
        isPlusPressed = false; // Сбрасываем флаг
    });



    
});

