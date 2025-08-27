document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const styleSelect = document.getElementById('style');
    const addHumorCheckbox = document.getElementById('add-humor');
    const addWishesCheckbox = document.getElementById('add-wishes');
    const congratulationText = document.getElementById('congratulation-text');
    const historyList = document.getElementById('history-list');
    
    let history = [];
    
    // Большие массивы с вариантами поздравлений
    const beginnings = [
        "Дорогой(ая)", 
        "Уважаемый(ая)", 
        "Любимый(ая)", 
        "Самый(ая) прекрасный(ая)",
        "Дорогой именинник",
        "Милый(ая)",
        "Незабываемый(ая)",
        "Обожаемый(ая)",
        "Сердечно поздравляю",
        "С большой радостью обращаюсь к тебе",
        "С теплотой в сердце",
        "С искренними чувствами",
        "С душевным трепетом",
        "С самыми добрыми пожеланиями"
    ];
    
    const middles = [
        "от всего сердца поздравляю тебя с днем рождения!",
        "прими самые теплые поздравления с твоим днем рождения!",
        "поздравляю с этим замечательным днем!",
        "хочу пожелать всего наилучшего в твой день рождения!",
        "поздравляю с твоим особым днем!",
        "прими мои искренние поздравления!",
        "поздравляю с этой прекрасной датой!",
        "хочу сказать самые добрые слова в твой день!",
        "прими самые сердечные поздравления!",
        "поздравляю с днем твоего рождения!",
        "рад(а) поздравить тебя с этим светлым праздником!",
        "с удовольствием присоединяюсь к поздравлениям!"
    ];
    
    const wishes = [
        "Желаю здоровья, счастья, радости, благополучия и успехов во всех начинаниях!",
        "Пусть каждый день приносит радость, улыбки близких согревают сердце, а мечты сбываются одна за другой!",
        "Желаю ярких впечатлений, верных друзей, невероятных приключений и исполнения всех желаний!",
        "Пусть жизнь будет наполнена яркими моментами, вдохновением и любовью!",
        "Желаю процветания, уверенности в завтрашнем дне и гармонии во всем!",
        "Пусть удача сопутствует во всех делах, а любовь и поддержка близких людей придают сил!",
        "Желаю крепкого здоровья, неиссякаемой энергии и бодрости духа!",
        "Пусть каждый новый день приносит новые достижения и приятные сюрпризы!",
        "Желаю финансового благополучия, карьерного роста и стабильности!",
        "Пусть жизнь будет похожа на увлекательное путешествие с массой интересных событий!",
        "Желаю душевного спокойствия, семейного уюта и теплых отношений с близкими!",
        "Пусть сбудутся все мечты, а цели будут достигнуты с легкостью!",
        "Желаю вдохновения для новых свершений и мудрости в принятии решений!",
        "Пусть каждый момент жизни будет наполнен смыслом и положительными эмоциями!"
    ];
    
    const humorous = [
        "Пусть твой торт будет таким же сладким, как ты!",
        "Желаю, чтобы количество подарков превышало количество свечей на торте!",
        "Пусть возраст будет просто числом, а не отражением состояния твоих суставов!",
        "Желаю, чтобы твои друзья всегда помнили о дне рождения, но забывали о возрасте!",
        "Пусть твои волосы остаются на месте, а морщины обходят стороной!",
        "Желаю, чтобы hangover был только от количества подарков!",
        "Пусть твои селые волосы будут только от блеска счастливой жизни!",
        "Желаю, чтобы твои проблемы решались так же быстро, как исчезает торт!",
        "Пусть твоя жизнь будет такой же яркой, как свечи на праздничном торте!",
        "Желаю, чтобы твои друзья всегда были готовы помочь... доесть торт!"
    ];
    
    const endings = [
        "С днем рождения! 🎂", 
        "Обнимаю крепко! 🤗", 
        "Пусть этот год будет лучшим в твоей жизни! 💫", 
        "Ты заслуживаешь всего самого лучшего! 🌟",
        "С праздником! 🎉",
        "Будь счастлив(а)! 😊",
        "Любви и радости! ❤️",
        "Мира и добра! ✨",
        "Всего наилучшего! 🌈",
        "С самыми теплыми пожеланиями! 🌸",
        "Твои друзья 🎁",
        "С наилучшими пожеланиями в твой день! 🎈"
    ];
    
    const poetic = [
        "Как свечи на торте горят,\nТак пусть и жизнь твоя сияет,\nИ каждый новый день подарят\nУспех, что никогда не угасает!",
        "Пусть годы мчатся, как мгновенья,\nНеся с собой лишь наслажденье,\nИ будет каждый миг с тобой\nНаполнен радостью и добротой!",
        "Как прекрасен день рожденья,\nВ нем улыбки, поздравленья!\nПусть удача стучится в дверь,\nБудет счастливой жизнь теперь!",
        "Возраст - это не преграда,\nА лишь мудрости награда,\nПусть душа поет от счастья,\nИ исполнятся все страсти!"
    ];
    
    const childWishes = [
        "Пусть игрушек будет много,\nИ сладкого тоже,\nЧтоб с утра до вечера\nТы играть мог(ла) тоже!",
        "Желаю много конфет,\nИгрушек и смеха,\nПусть будет прекрасным\nЭтот день без помех!",
        "Расти большим(ой) и здоровым(ой),\nСлушайся маму с папой,\nИ будь самым счастливым(ой)\nНа всей нашей планете!"
    ];
    
    // Функция для создания конфетти
    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            
            // Анимация падения
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Функция для генерации случайного элемента из массива
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Функция для генерации поздравления
    function generateCongratulation(name, age, style, addHumor, addWishes) {
        if (!name) name = "Друг";
        
        const ageText = age ? `, ${age}-летие` : "";
        let beginning = getRandomElement(beginnings);
        let middle = getRandomElement(middles);
        let wish = addWishes ? getRandomElement(wishes) : "";
        let humorousLine = addHumor ? getRandomElement(humorous) : "";
        let ending = getRandomElement(endings);
        
        let congratulation = "";
        
        switch(style) {
            case "funny":
                congratulation = `${beginning} ${name}${ageText}! ${middle} ${humorousLine} ${ending}`;
                break;
            case "heartfelt":
                congratulation = `Дорогой(ая) ${name}, ${middle} Желаю тебе самого светлого, доброго и прекрасного. ${wish} ${ending}`;
                break;
            case "official":
                congratulation = `Уважаемый(ая) ${name}! ${middle} ${wish} ${ending}`;
                break;
            case "poetic":
                congratulation = `${getRandomElement(poetic)}\n\n${beginning} ${name}, ${ending}`;
                break;
            case "child":
                congratulation = `Дорогой(ая) ${name}! ${getRandomElement(childWishes)} ${ending}`;
                break;
            default:
                congratulation = `${beginning} ${name}${ageText}! ${middle} ${wish} ${humorousLine} ${ending}`;
        }
        
        return congratulation;
    }
    
    // Функция для добавления в историю
    function addToHistory(text, name) {
        if (history.length >= 5) {
            history.pop();
        }
        
        history.unshift({
            text: text,
            name: name,
            date: new Date().toLocaleTimeString()
        });
        
        updateHistoryUI();
    }
    
    // Функция для обновления истории в интерфейсе
    function updateHistoryUI() {
        historyList.innerHTML = '';
        
        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `<strong>${item.name}</strong> (${item.date})`;
            historyItem.title = item.text;
            
            historyItem.addEventListener('click', () => {
                congratulationText.textContent = item.text;
            });
            
            historyList.appendChild(historyItem);
        });
    }
    
    // Обработчик нажатия на кнопку генерации
    generateBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const age = ageInput.value;
        const style = styleSelect.value;
        const addHumor = addHumorCheckbox.checked;
        const addWishes = addWishesCheckbox.checked;
        
        if (!name) {
            alert('Пожалуйста, введите имя именинника');
            return;
        }
        
        const congratulation = generateCongratulation(name, age, style, addHumor, addWishes);
        congratulationText.textContent = congratulation;
        
        addToHistory(congratulation, name);
        createConfetti();
    });
    
    // Обработчик нажатия на кнопку копирования
    copyBtn.addEventListener('click', function() {
        const text = congratulationText.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Скопировано!';
            setTimeout(() => {
                copyBtn.textContent = 'Скопировать поздравление';
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    });
});