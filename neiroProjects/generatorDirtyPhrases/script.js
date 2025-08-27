// Расширенная база данных фраз по темам
const phrases = {
    flirt: [
        "{name}, я бы с удовольствием поиграл(а) с тобой в доктора!",
        "Такую красотку(ка) как ты, {name}, нужно целовать с головы до ног... и обратно!",
        "{name}, твои глаза как звезды... Хочу загадать похабное желание!",
        "Если бы я был(а) кошечкой, то мурлыкал(а) бы только тебе, {name}, на ушко!",
        "{name}, ты как книга - хочется читать тебя снова и снова, особенно на ночь!",
        "Я бы составил(а) тебе, {name}, конкуренцию в постели... но лучше объединим усилия!",
        "{name}, от твоей улыбки у меня поднимается... настроение!",
        "Ты, {name}, как магнит - притягиваешь меня к себе с невероятной силой!",
        "{name}, я бы учил(а) географию с большим удовольствием, если бы ты была моим глобусом!",
        "Твои губы, {name}, как мед - сладкие, липкие, и хочется все больше и больше!"
    ],
    vulgar: [
        "{name}, от твоих округлостей у меня встаёт не только настроение!",
        "Хочу тебя, {name}, как алкаш бесплатной выпивки!",
        "{name}, у тебя такое тело, что хочется разложить на нём пасьянс!",
        "Я бы с тобой, {name}, трахал(ась) как кролик — часто и без повода!",
        "{name}, твои прелести просятся в мои опытные руки!",
        "Я бы устроил(а) тебе, {name}, такой оргазм, что соседи вызвали бы салют!",
        "{name}, от одного взгляда на тебя у меня в штанах становится тесно!",
        "Ты, {name}, как диван - такая мягкая, что хочется прилечь и не вставать!",
        "{name}, я бы с тобой занялся(ась) любовью как порнозвезда - долго и с перерывами на кофе!",
        "Твои формы, {name}, просто просятся, чтобы их помяли!"
    ],
    funny: [
        "{name}, ты как унитаз — хочется на тебя сесть и не вставать!",
        "Ты, {name}, как шаурма — горячая, сочная, и все тебя хотят!",
        "{name}, я бы с тобой поиграл(а) в паровозик — чух-чух-чух и в туннель!",
        "Ты, {name}, как велосипед — хочется оседлать и поехать далеко-далеко!",
        "{name}, ты как пицца - с тобой всегда вкусно, а на следующий день еще и на завтрак остаешься!",
        "Я бы с тобой, {name}, устроил(а) марафон - но не беговой, а постельный!",
        "{name}, ты как кофе - бодришь с утра, а вечером не даешь уснуть!",
        "Ты, {name}, как новогодний подарок - хочется скорее распаковать и поиграть!",
        "{name}, я бы с тобой сыграл(а) в твистер - только без правил и на кровати!",
        "Ты, {name}, как попкорн - хрустящая снаружи и мягкая внутри, и хочется все больше!"
    ],
    romantic: [
        "{name}, ты сведешь меня с ума... и я надеюсь, ты поведешь меня к себе!",
        "Твои губы, {name}, как вино — хочется наслаждаться их вкусом всю ночь!",
        "{name}, ты зажгла(зажег) во мне огонь... надеюсь, у тебя есть огнетушитель?",
        "Я готов(а) стать твоим(ей) личным(ой) массажистом(кой), {name}, причем бесплатно!",
        "{name}, твоя кожа как шелк... Хочу закутаться в тебя с головой!",
        "Я бы сравнил(а) тебя, {name}, с восходом солнца - такой(ая) же прекрасный(ая) и будишь во мне желание!",
        "Ты, {name}, как музыка - заставляешь мое сердце биться в нужном ритме!",
        "{name}, я бы подарил(а) тебе все звезды с неба... но сначала давай заглянем под одеяло!",
        "Твои объятия, {name}, как дом - там так уютно, что не хочется уходить!",
        "Ты, {name}, как шоколад - такой(ая) же сладкий(ая) и таешь в моих руках!"
    ]
};

let currentTheme = 'flirt';
let history = [];

// Установка активной темы
document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentTheme = this.dataset.theme;
    });
});

// Генерация фразы
document.getElementById('generateBtn').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value.trim() || 'дорогой(ая)';
    const themePhrases = phrases[currentTheme];
    const randomIndex = Math.floor(Math.random() * themePhrases.length);
    const phrase = themePhrases[randomIndex].replace(/{name}/g, name);
    
    // Обновление результата
    document.getElementById('result').textContent = phrase;
    
    // Добавление в историю
    addToHistory(phrase, currentTheme);
});

// Добавление в историю
function addToHistory(phrase, theme) {
    // Добавляем новую запись в начало истории
    history.unshift({
        phrase,
        theme,
        time: new Date().toLocaleTimeString()
    });
    
    // Ограничиваем историю 10 последними записями
    if (history.length > 10) {
        history.pop();
    }
    
    // Обновляем отображение истории
    updateHistoryDisplay();
}

// Обновление отображения истории
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-item">История будет отображаться здесь</div>';
        return;
    }
    
    historyList.innerHTML = '';
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <span class="history-theme">${getThemeName(item.theme)}</span>
            <span>${item.phrase}</span>
            <div style="color: #777; font-size: 0.8rem; margin-top: 5px;">${item.time}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Получение читаемого названия темы
function getThemeName(themeKey) {
    const themes = {
        'flirt': 'Флирт',
        'vulgar': 'Вульгар',
        'funny': 'Смешная',
        'romantic': 'Романтика'
    };
    return themes[themeKey] || themeKey;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Генерируем первую фразу при загрузке
    document.getElementById('generateBtn').click();
});