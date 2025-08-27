document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const categorySelect = document.getElementById('categorySelect');
    const generateBtn = document.getElementById('generateBtn');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const complimentText = document.querySelector('.compliment-text');
    const complimentCategory = document.querySelector('.compliment-category');
    const historyList = document.getElementById('historyList');
    const historyCount = document.getElementById('historyCount');
    
    // Объект с категориями комплиментов
    const complimentsByCategory = {
        romantic: [
            "{name}, твоя улыбка освещает всю комнату!",
            "{name}, с тобой всегда так легко и приятно общаться.",
            "{name}, ты невероятно умна и талантлива!",
            "Мне так повезло, что я встретил тебя, {name}.",
            "{name}, ты вдохновляешь меня становиться лучше!",
            "Ты самая красивая девушка на свете, {name}!",
            "{name}, твоя доброта и забота делают мир лучше.",
            "Рядом с тобой я забываю обо всех проблемах, {name}.",
            "{name}, ты делаешь каждый мой день особенным!",
            "Ты невероятно заботливая, {name}!",
            "Я могу смотреть на тебя вечно, {name}, и не насмотреться.",
            "В твоих объятиях я чувствую себя как дома, {name}.",
            "Ты моя самая большая удача в жизни, {name}.",
            "С тобой хочется делить каждую секунду своей жизни, {name}."
        ],
        poetic: [
            "Как прекрасный цветок расцветает {name}, наполняя мир красотой и ароматом.",
            "Глаза твои, {name}, как две звезды, что освещают мой путь во тьме.",
            "Ты как утренняя роса на лепестках розы, {name} - нежная и прекрасная.",
            "В твоем голосе, {name}, слышна музыка, что заставляет мое сердце петь.",
            "Ты - поэма, написанная самой природой, {name}, и каждое слово в ней совершенно.",
            "Как шепот ветра в летнюю ночь, твой голос ласкает мой слух, {name}.",
            "Ты как луна в ночном небе, {name} - таинственная, прекрасная и недосягаемая.",
            "В твоей улыбке, {name}, отражается солнце, что согревает мою душу.",
            "Ты - самый красивый сон, который стал явью, {name}.",
            "Как море безбрежное, глубока и необъятна твоя душа, {name}."
        ],
        passionate: [
            "От одного твоего прикосновения, {name}, у меня по коже бегут мурашки.",
            "Твой взгляд, {name, заставляет мое сердце биться чаще.",
            "Я сгораю от страсти каждый раз, когда ты рядом, {name}.",
            "Твои губы, {name}, как мед - сладкие и опьяняющие.",
            "В твоих объятиях, {name}, я теряю голову и нахожу рай.",
            "От твоего поцелуя, {name}, у меня перехватывает дыхание.",
            "Твое тело, {name}, это шедевр, который хочется исследовать снова и снова.",
            "В твоих глазах, {name}, я тону как в океане страсти.",
            "Ты разжигаешь во мне огонь, {name}, который не погаснет никогда.",
            "Каждая клеточка моего тела хочет прикоснуться к тебе, {name}."
        ],
        friendly: [
            "С тобой, {name}, можно говорить часами обо всем на свете!",
            "Ты всегда знаешь, как поднять настроение, {name}!",
            "{name}, у тебя отличное чувство юмора!",
            "С тобой никогда не скучно, {name}!",
            "Ты прекрасный собеседник, {name}!",
            "Твоя энергия заразительна, {name}!",
            "Ты всегда находишь правильные слова, {name}!",
            "С тобой можно быть собой, {name}, и это самое ценное!",
            "Ты умеешь слушать и слышать, {name}!",
            "Рядом с тобой, {name}, чувствуешь себя комфортно и уютно!"
        ],
        playful: [
            "Ты так игрива, {name}, что хочется присоединиться к твоим шалостям!",
            "От твоих прикосновений, {name}, по телу пробегает приятная дрожь.",
            "Ты сводишь меня с ума своими соблазнительными взглядами, {name}.",
            "В твоей улыбке, {name}, столько озорства, что невозможно устоять!",
            "Ты знаешь, как завести меня одним лишь движением брови, {name}.",
            "Твои поцелуи, {name}, как наркотик - от них невозможно отказаться.",
            "Ты играешь с моими чувствами, {name}, и мне это безумно нравится!",
            "От твоего шепота, {name}, замирает сердце и учащается пульс.",
            "Ты манишь и соблазняешь, {name}, и я с удовольствием поддаюсь твоим чарам.",
            "В твоих глазах, {name}, читается обещание страстной ночи."
        ]
    };
    
    // Загрузка истории из localStorage
    let complimentsHistory = JSON.parse(localStorage.getItem('complimentsHistory')) || [];
    
    // Функция для отображения истории
    function renderHistory() {
        if (complimentsHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">История пуста</div>';
            historyCount.textContent = '';
            return;
        }
        
        historyList.innerHTML = '';
        // Показываем последние 10 комплиментов
        const recentHistory = complimentsHistory.slice(-10).reverse();
        
        recentHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const historyContent = document.createElement('div');
            historyContent.className = 'history-content';
            historyContent.innerHTML = `
                <span class="history-name">${item.name}</span>
                <span class="history-category">${getCategoryName(item.category)}</span>
                <div>${item.compliment}</div>
            `;
            
            const historyTime = document.createElement('div');
            historyTime.className = 'history-time';
            historyTime.textContent = item.time;
            
            historyItem.appendChild(historyContent);
            historyItem.appendChild(historyTime);
            
            historyList.appendChild(historyItem);
        });
        
        historyCount.textContent = `(${complimentsHistory.length})`;
    }
    
    // Функция для получения названия категории по ключу
    function getCategoryName(categoryKey) {
        const categories = {
            'romantic': 'Романтический',
            'poetic': 'Поэтический',
            'passionate': 'Страстный',
            'friendly': 'Дружеский',
            'playful': 'Игривый'
        };
        return categories[categoryKey] || 'Неизвестно';
    }
    
    // Функция для генерации случайного комплимента
    function generateCompliment() {
        const name = nameInput.value.trim() || 'Ангел';
        const category = categorySelect.value;
        
        // Выбираем массив комплиментов в зависимости от категории
        let complimentsArray = [];
        if (category === 'all') {
            // Объединяем все комплименты из всех категорий
            for (const key in complimentsByCategory) {
                complimentsArray = complimentsArray.concat(complimentsByCategory[key]);
            }
        } else {
            complimentsArray = complimentsByCategory[category];
        }
        
        const randomIndex = Math.floor(Math.random() * complimentsArray.length);
        let compliment = complimentsArray[randomIndex];
        
        // Заменяем {name} на введенное имя
        compliment = compliment.replace(/{name}/g, name);
        
        // Сохраняем текущее время
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        // Определяем категорию для истории (если выбраны "все", находим конкретную категорию)
        let actualCategory = category;
        if (category === 'all') {
            // Находим категорию комплимента
            for (const cat in complimentsByCategory) {
                if (complimentsByCategory[cat].includes(complimentsArray[randomIndex])) {
                    actualCategory = cat;
                    break;
                }
            }
        }
        
        // Добавляем в историю
        complimentsHistory.push({
            name: name,
            compliment: compliment,
            category: actualCategory,
            time: timeString
        });
        
        // Сохраняем в localStorage
        localStorage.setItem('complimentsHistory', JSON.stringify(complimentsHistory));
        
        // Обновляем отображение
        complimentText.innerHTML = compliment;
        complimentCategory.textContent = `Категория: ${getCategoryName(actualCategory)}`;
        
        // Обновляем историю
        renderHistory();
    }
    
    // Функция для очистки истории
    function clearHistory() {
        if (confirm("Вы уверены, что хотите очистить историю?")) {
            complimentsHistory = [];
            localStorage.setItem('complimentsHistory', JSON.stringify(complimentsHistory));
            renderHistory();
            
            // Показываем сообщение
            complimentText.innerHTML = "История очищена";
            complimentCategory.textContent = "";
        }
    }
    
    // Обработчики событий
    generateBtn.addEventListener('click', generateCompliment);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Обработчик нажатия Enter в поле ввода
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateCompliment();
        }
    });
    
    // Инициализация истории при загрузке
    renderHistory();
});