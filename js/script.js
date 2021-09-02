// создаем функцию filterByType которая принимает в качестве аргумента тип (выбранные в селекте) 
// и массив элементов values, введённый в инпут Затем они сравниваются
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// функция скрывает все информационные элементы
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//функция showResponseBlock() принимает в качестве аргументов (селектор блока, текст сообщения и селектор спана)
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//обнуляем все блоки прячем их 
		hideAllResponseBlocks();
		//выводит в верстку указанный селектор
		document.querySelector(blockSelector).style.display = 'block';
		//если был указан селектор спана то находим его и записываем в него msgText
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
// создаем информационные блоки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
// принимаем зачение селектора и инпута
	tryFilterByType = (type, values) => {
		//выполняем try catch, чтобы код продолжил работать даже при ошибке
		try {
			//через eval выполняется функция filterByType() с аргументами селекта и данных инпута, и записывает их в valuesArray в виде строки
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//в том случае, если в строке valuesArray есть хотя бы один символ, в переменную alertMsg записывается сообщение:
			const alertMsg = (valuesArray.length) ?
				//это
				`Данные с типом ${type}: ${valuesArray}` :
				//если строка valuesArray пустая, то в переменную alertMsg записывается это сообщение
				`Отсутствуют данные типа ${type}`;
			//и выводится на экран через функцию showResults(), передавая в неё alertMsg как msgText
			showResults(alertMsg);
		} catch (e) {
			// если во время выполнения кода произошла ошибка showError() с указанием ошибки
			showError(`Ошибка: ${e}`);
		}
	};
// получаем кнопку "фильтровать"
const filterButton = document.querySelector('#filter-btn');
//вешаем прослушку при клике на кнопку "фильтровать"
filterButton.addEventListener('click', e => {
	//получаем инпуты по селекторам для ввода данных
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
// если инпут пустой выводим предупреждение
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//showNoResults() - поле вывода в изначальном состоянии "пока что нечего показать"
		showNoResults();
		// если инпут не пустой
		// удаляем предупреждение
		//  выполняем функцию tryFilterByType(), аргументами передаем введенные значения инпутов
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

