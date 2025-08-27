document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const insultText = document.getElementById('insultText');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyList = document.getElementById('historyList');
    const copyBtn = document.getElementById('copyBtn');
    
    // Расширенная база данных ругательств
    const cleanInsults = {
        adjectives: [
            "бестолковый", "непутевый", "несносный", "неумелый", "несообразительный", 
            "ленивый", "нерадивый", "недалекий", "неповоротливый", "неуклюжий",
            "безответственный", "непослушный", "небрежный", "неуступчивый", "непунктуальный",
            "бесполезный", "невыносимый", "неприспособленный", "неблагодарный", "непутёвый",
            "ограниченный", "недальновидный", "непоследовательный", "неумеющий слушать", "неспособный"
        ],
        nouns: [
            "бездарь", "негодник", "растяпа", "разгильдяй", "неряха",
            "оболтус", "лентяй", "халтурщик", "пустомеля", "невежа",
            "недотепа", "ротозей", "сорванец", "проказник", "озорник",
            "неумёха", "разиня", "шумига", "ветреник", "недотёпа",
            "бесполезность", "обуза", "испорченный прибор", "ходячая катастрофа", "сгусток incompetence"
        ],
        verbs: [
            "вечно все путаешь", "постоянно опаздываешь", "всегда все портишь",
            "ведешь себя как ребенок", "совершаешь одни ошибки", "поступаешь безрассудно",
            "игнорируешь очевидное", "тратишь время впустую", "нарушаешь все договоренности",
            "пропускаешь мимо ушей важные указания", "делаешь всё наперекор", "создаёшь проблемы на ровном месте",
            "перекладываешь ответственность на других", "несешь полную ахинею", "демонстрируешь поразительную несообразительность"
        ],
        phrases: [
            "твои действия вызывают недоумение", "твое поведение приводит в отчаяние",
            "с тобой невозможно иметь дело", "от тебя одни проблемы",
            "твоя невнимательность поражает", "твоя безответственность не знает границ",
            "редко встретишь такое сочетание невежества и самоуверенности", 
            "твои умственные способности вызывают искреннее сочувствие",
            "ты — ходячее опровержение теории Дарвина",
            "твои решения обычно хуже самой проблемы",
            "твоё присутствие понижает средний IQ в радиусе десяти метров",
            "твои когнитивные способности сравнимы с комнатным растением",
            "твоя сообразительность могла бы посоревноваться с булыжником",
            "ты — живое доказательство того, что эволюция может идти в обратном направлении"
        ],
        poetic: [
            "О, [name]! Твоя бездарность столь велика, что могла бы затмить солнце в ясный день.",
            "[Name], ты подобен слепому художнику, который пытается нарисовать закат, но получает лишь мазню.",
            "Уму непостижимо, как существо с такими скудными умственными способностями, как ты, [name], ухитряется дышать и ходить одновременно.",
            "Если бы глупость была золотом, ты, [name], был бы самым богатым существом во Вселенной.",
            "[Name], твой интеллект сравним с черной дырой — такая же плотная и непроницаемая субстанция.",
            "Ты, [name], — ходячий аргумент в пользу тотальной стерилизации.",
            "Говорят, что каждый человек талантлив по-своему. Ты, [name], блестяще опровергаешь эту теорию.",
            "[Name], твои умственные способности находятся в обратной пропорции к твоей самоуверенности.",
            "Если бы отупение было олимпийским видом спорта, ты, [name], был бы многократным чемпионом.",
            "Ты, [name], — живое доказательство того, что можно иметь голову и при этом оставаться безголовым."
        ]
    };
    
    const profanityInsults = {
        adjectives: [
            "ёбаный", "блядский", "хуевый", "пиздатый", "ебливый",
            "мудацкий", "говняный", "дристый", "залупный", "пиздоглазый",
            "охуевший", "ебанутый", "выебонский", "пиздорезный", "хуепробный",
            "заёбанный", "долбоёбский", "конченый", "спизженный", "обоссаный"
        ],
        nouns: [
            "мудак", "хуеплёт", "пиздобол", "блядун", "еблан",
            "долбоёб", "говноед", "залупец", "пиздюк", "ссаный",
            "хуесос", "пиздопляс", "ебарь", "блядюк", "пиздун",
            "манда", "хуило", "пиздарук", "ебланище", "дерьмоед"
        ],
        verbs: [
            "ебалом своим машешь", "пиздишь без остановки", "блядуешь как сука",
            "хуйней страдаешь", "говном голову забил", "залуплился как урод",
            "пиздюли просишь", "дристун несчастный", "ебанутый на всю голову",
            "блядствуешь как последняя шлюха", "пиздишь как сивый мерин", "выебываешься без повода",
            "засираешь всё вокруг", "обосрался как цуцик", "трахаешь мозги всем вокруг"
        ],
        phrases: [
            "иди в пизду", "отъебись нахуй", "пошёл на хуй", 
            "ты мне всю мойю обосрал", "заебал уже", "сука тупая",
            "пиздец как надоел", "охерел совсем", "ебануться можно",
            "иди на хуй, мудак", "отсоси у трактора", "пизда твоей деятельности",
            "кончишь под забором", "хуй тебе, а не мнение", "поебень собачья"
        ],
        poetic: [
            "[Name], ты ёбаный недоумок, у которого вместо мозга — говно. Ты своей хуйней уже всю вселенную задолбал.",
            "О, [name]! Если бы дерьмо было ценностью, ты был бы самым богатым человеком на планете. Увы, это просто дерьмо.",
            "[Name], твоя тупость столь велика, что искривляет пространство-время вокруг тебя, создавая чёрную дыру из ебаной глупости.",
            "Ты, [name], — ходячее напоминание о том, что презервативы нужно использовать всегда.",
            "[Name], твой рот — это портал в адский измерение, откуда льётся нескончаемый поток пиздежа.",
            "Если бы идиотизм был болезнью, тебя, [name], пришлось бы изолировать от общества в ебучем боксе.",
            "Ты, [name], настолько тупой, что даже односоставные предложения вызывают у тебя когнитивный диссонанс.",
            "[Name], твои мозги похожи на выеденное молью говно — дырявое, бесполезное и воняет за верст.",
            "Говорят, что каждый человек уникален. Ты, [name], уникален в своей ёбаной глупости.",
            "Ты, [name], — живое доказательство того, что аборты должны быть легальны на любом сроке."
        ]
    };
    
    // Загрузка истории из localStorage
    let history = JSON.parse(localStorage.getItem('insultHistory')) || [];
    
    // Функция генерации случайного элемента из массива
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Функция генерации ругательства
    function generateInsult(name, useProfanity) {
        const insults = useProfanity ? profanityInsults : cleanInsults;
        const random = Math.random();
        
        if (random < 0.3) {
            // Поэтичное ругательство
            const poeticTemplate = getRandomElement(insults.poetic);
            return poeticTemplate.replace('[name]', name);
        } else if (random < 0.6) {
            // Составное ругательство
            return `${name}, ты ${getRandomElement(insults.adjectives)} ${getRandomElement(insults.nouns)}, который ${getRandomElement(insults.verbs)}!`;
        } else {
            // Простое ругательство
            const templates = [
                `${name}, ты ${getRandomElement(insults.adjectives)} ${getRandomElement(insults.nouns)}!`,
                `${name}, ${getRandomElement(insults.phrases)} - ты ${getRandomElement(insults.adjectives)} ${getRandomElement(insults.nouns)}!`,
                `Ах ты, ${getRandomElement(insults.adjectives)} ${getRandomElement(insults.nouns)}! ${getRandomElement(insults.phrases).toUpperCase()}!`,
            ];
            
            return getRandomElement(templates);
        }
    }
    
    // Функция сохранения в историю
    function saveToHistory(name, insult, type) {
        const historyItem = {
            id: Date.now(),
            name: name,
            insult: insult,
            type: type,
            date: new Date().toLocaleString('ru-RU')
        };
        
        history.unshift(historyItem); // Добавляем в начало массива
        
        // Ограничиваем историю 100 последними записями
        if (history.length > 100) {
            history = history.slice(0, 100);
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('insultHistory', JSON.stringify(history));
        
        // Обновляем отображение истории
        displayHistory();
    }
    
    // Функция отображения истории
    function displayHistory() {
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<p>История генераций пуста</p>';
            return;
        }
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const badgeClass = item.type === 'clean' ? 'badge-clean' : 'badge-profanity';
            const badgeText = item.type === 'clean' ? 'Без мата' : 'С матом';
            
            historyItem.innerHTML = `
                <div class="history-header">
                    <span class="history-name">${item.name}</span>
                    <span class="badge ${badgeClass}">${badgeText}</span>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-text">${item.insult}</div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    // Функция открытия вкладок
    window.openTab = function(evt, tabName) {
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        
        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        
        // При открытии вкладки истории обновляем ее
        if (tabName === 'History') {
            displayHistory();
        }
    }
    
    // Обработчик нажатия на кнопку генерации
    generateBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const useProfanity = document.getElementById('profanity').checked;
        const insultType = useProfanity ? 'profanity' : 'clean';
        
        if (!name) {
            alert('Пожалуйста, введите имя!');
            return;
        }
        
        const insult = generateInsult(name, useProfanity);
        insultText.textContent = insult;
        resultDiv.style.display = 'block';
        
        // Сохраняем в историю
        saveToHistory(name, insult, insultType);
    });
    
    // Обработчик очистки истории
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите очистить историю?')) {
            history = [];
            localStorage.removeItem('insultHistory');
            displayHistory();
        }
    });
    
    // Обработчик копирования текста
    copyBtn.addEventListener('click', function() {
        const textToCopy = insultText.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Скопировано!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    });
    
    // Инициализация отображения истории при загрузке
    displayHistory();
});