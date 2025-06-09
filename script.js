document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.getElementById('viewer');
    const numberButtons = document.querySelectorAll('.number');
    

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
});

