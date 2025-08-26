document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesCount = document.getElementById('moves-count');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const restartBtn = document.getElementById('restart-btn');
    const winMessage = document.getElementById('win-message');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    
    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let score = 0;
    let matchedPairs = 0;
    let gameStarted = false;
    let timer = 0;
    let timerInterval;
    let difficulty = 'easy';
    
    // Символы для карточек (пары) в зависимости от сложности
    const cardSymbols = {
        easy: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉'],
        medium: ['🍍', '🍌', '🍑', '🍏', '🍣', '🌼', '🍒', '🥝'],
        hard: ['🍎', '🍞', '🍏', '🌷', '🎃', '🍦', '🌝', '🌜', '🌳', '🍄', '🥥', '🍋']
    };
    
    // Обработчики для кнопок сложности
    difficultyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.difficulty;
            initGame();
        });
    });
    
    // Инициализация игры
    function initGame() {
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        flippedCards = [];
        moves = 0;
        score = 0;
        matchedPairs = 0;
        timer = 0;
        gameStarted = false;
        movesCount.textContent = '0';
        scoreDisplay.textContent = '0';
        timeDisplay.textContent = '00:00';
        winMessage.style.display = 'none';
        
        // Создаем пары карточек в зависимости от сложности
        const symbols = cardSymbols[difficulty];
        cards = [...symbols, ...symbols];
        
        // Перемешиваем карточки
        shuffleCards();
        
        // Изменяем размер сетки в зависимости от сложности
        updateGridSize();
        
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
    
    // Обновление размера сетки в зависимости от сложности
    function updateGridSize() {
        let columns;
        switch(difficulty) {
            case 'easy':
                columns = 4;
                break;
            case 'medium':
                columns = 4;
                break;
            case 'hard':
                columns = 6;
                break;
            default:
                columns = 4;
        }
        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
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
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // Добавляем очки
            addScore(100);
            
            matchedPairs++;
            
            // Проверяем, завершена ли игра
            if (matchedPairs === cardSymbols[difficulty].length) {
                // Бонус за быструю игру
                const timeBonus = Math.max(0, 1000 - timer * 5);
                addScore(timeBonus);
                
                // Бонус за малое количество ходов
                const movesBonus = Math.max(0, 500 - moves * 10);
                addScore(movesBonus);
                
                endGame();
            }
        } else {
            // Карточки не совпали - переворачиваем обратно
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.classList.add('shake');
            card2.classList.add('shake');
            
            // Убираем анимацию тряски после завершения
            setTimeout(() => {
                card1.classList.remove('shake');
                card2.classList.remove('shake');
            }, 300);
        }
        
        // Очищаем массив перевернутых карточек
        flippedCards = [];
    }
    
    // Добавление очков с анимацией
    function addScore(points) {
        score += points;
        scoreDisplay.textContent = score;
        
        // Создаем всплывающий текст с количеством очков
        const popup = document.createElement('div');
        popup.classList.add('score-popup');
        popup.textContent = `+${points}`;
        document.body.appendChild(popup);
        
        // Позиционируем и анимируем всплывающий текст
        const rect = gameBoard.getBoundingClientRect();
        popup.style.left = `${rect.left + rect.width/2}px`;
        popup.style.top = `${rect.top}px`;
        
        // Запускаем анимацию
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(-30px)';
            
            // Удаляем всплывающий текст после анимации
            setTimeout(() => {
                popup.remove();
            }, 1000);
        }, 10);
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
        
        // Добавляем информацию о результатах
        winMessage.innerHTML = `
            Поздравляем! Вы выиграли!<br>
            <div style="font-size: 1.2rem; margin-top: 10px;">
            Время: ${timeDisplay.textContent}<br>
            Ходы: ${moves}<br>
            Очки: ${score}
            </div>
        `;
    }
    
    // Обработчик кнопки перезапуска
    restartBtn.addEventListener('click', initGame);
    
    // Инициализируем игру при загрузке страницы
    initGame();
});