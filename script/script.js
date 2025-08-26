document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesCount = document.getElementById('moves-count');
    const timeDisplay = document.getElementById('time');
    const restartBtn = document.getElementById('restart-btn');
    const winMessage = document.getElementById('win-message');

    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let matchedPairs = 0;
    let gameStarted = false;
    let timer = 0;
    let timerInterval;

    // Символы для карточек (пары)
    const cardSymbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥝'];

    // Инициализация игры
    function initGame() {
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        flippedCards = [];
        moves = 0;
        matchedPairs = 0;
        timer = 0;
        gameStarted = false;
        movesCount.textContent = '0';
        timeDisplay.textContent = '00:00';
        winMessage.style.display = 'none';

        // Создаем пары карточек
        cards = [...cardSymbols, ...cardSymbols];

        // Перемешиваем карточки
        shuffleCards();

        // Создаем HTML-элементы для карточек
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = symbol;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            card.appendChild(cardFront);
            card.appendChild(cardBack);

            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    // Перемешивание карточек
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    // Переворот карточки
    function flipCard(card) {
        // Если игра еще не началась, запускаем таймер
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        // Если карточка уже перевернута или уже найдена пара, ничего не делаем
        if (card.classList.contains('flipped') || flippedCards.length >= 2) {
            return;
        }

        // Переворачиваем карточку
        card.classList.add('flipped');
        flippedCards.push(card);

        // Если перевернуто две карточки, проверяем на совпадение
        if (flippedCards.length === 2) {
            moves++;
            movesCount.textContent = moves;

            setTimeout(checkMatch, 700);
        }
    }

    // Проверка совпадения карточек
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Карточки совпали
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
            matchedPairs++;

            // Проверяем, завершена ли игра
            if (matchedPairs === cardSymbols.length) {
                endGame();
            }
        } else {
            // Карточки не совпали - переворачиваем обратно
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        // Очищаем массив перевернутых карточек
        flippedCards = [];
    }

    // Запуск таймера
    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
            const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
            const seconds = (timer % 60).toString().padStart(2, '0');
            timeDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    // Завершение игры
    function endGame() {
        clearInterval(timerInterval);
        winMessage.style.display = 'block';
    }

    // Обработчик кнопки перезапуска
    restartBtn.addEventListener('click', initGame);

    // Инициализируем игру при загрузке страницы
    initGame();
});
