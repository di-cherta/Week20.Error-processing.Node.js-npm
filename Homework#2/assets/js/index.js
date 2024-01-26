const buttonElem = document.getElementById('search');
const typeElem = document.getElementById('type');
const inputElem = document.getElementById('number');
const resultElem = document.getElementById('result');
const errorElem = document.getElementById('error');


buttonElem.addEventListener('click', function (){
    resultElem.textContent = '';
    errorElem.textContent = '';
    resultElem.innerHTML = '<div class="spinner"></div>';

    fetch(`http://swapi.dev/api/${typeElem.value}/${inputElem.value}/`)
    .then((res) => {
        if(!res.ok || inputElem.value > 10){
            throw new Error('Что-то пошло не так. Введите другой номер или попробуйте позже!');
        };
        return res.json();
    })
    .then((data) => {
        console.log(data);
        document.querySelector('.spinner').remove();
        resultElem.textContent = JSON.stringify(data.name) || JSON.stringify(data.title);
    })
    .catch((error) => {
        console.error('Ошибка: ', error);
        document.querySelector('.spinner').remove();
        errorElem.textContent = 'Ошибка: ' + error.message;
    })
    .finally(() => {
        inputElem.textContent = '';
    })
});
