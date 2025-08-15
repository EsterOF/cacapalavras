class WordSearchGame {
    constructor() {
        this.gridSize = 15;
        this.grid = [];
        this.words = [];
        this.wordLocations = new Map();
        this.foundWords = [];
        this.selectedCells = [];
        this.isSelecting = false;
        this.score = 0;
        this.level = 1;
        this.timeLimit = 600; // 10 minutos (600 segundos)
        this.timeRemaining = this.timeLimit;
        this.timer = null;
        this.difficulty = 'easy';
        this.hintUsed = false;

        this.wordLists = {
            easy: [
                ['ARTE', 'BOLO', 'CARRO', 'CASA', 'CHAO', 'DIA', 'SOL', 'LUA', 'PAZ', 'VIDA', 'GATO', 'LEAO', 'CACHORRO', 'LIVRO', 'PATO', 'PEIXE', 'FOGO', 'AGUA', 'VENTO', 'TEMPO', 'NOITE', 'FESTA', 'SAPO', 'ROSA', 'CAIXA', 'JANELA', 'JOGO', 'LACO', 'IRMAO', 'FLOR', 'ESCOLA', 'DADO', 'CEREJA', 'BOTAO', 'AMOR', 'AMIGO', 'ANJO', 'AREIA', 'BANHO', 'BOLA', 'BRANCO', 'CALMA', 'CHAVE', 'COCO', 'COR', 'CORPO', 'DATA', 'DEUS', 'DOCE', 'FACE', 'FADA', 'FATO', 'FIO', 'FORCA', 'FRIO', 'FUMO', 'GELO', 'MAR', 'MEDO', 'MESA', 'OLHO', 'OURO', 'PAO', 'PATIO', 'PESO', 'PICO', 'PINGO', 'PONTOS', 'PRETO', 'RAIO', 'RAMA', 'RATO', 'REDE', 'RODA', 'SAL'],
                ['ABACAXI', 'BANANA', 'LARANJA', 'MORANGO', 'UVA', 'MELAO', 'PERA', 'PESSEGO', 'GOIABA', 'KIWI', 'LIMAO', 'MANGA', 'AMORA', 'MACA', 'PITANGA', 'CAJU', 'FIGO', 'CAQUI', 'MAMAO', 'KIWI', 'FRAMBOESA', 'JABUTICABA'],
                ['AZUL', 'AMARELO', 'VERDE', 'VERMELHO', 'LARANJA', 'ROSA', 'ROXO', 'PRETO', 'BRANCO', 'CINZA', 'DOURADO', 'PRATEADO', 'MARROM', 'BEGE', 'TURQUESA', 'CIANO', 'MAGENTA', 'VIOLETA', 'CREME', 'LILAS']
            ],
            medium: [
                ['AERONAVE', 'BICICLETA', 'CADEIRA', 'CAMINHO', 'CAVALEIRO', 'CIDADE', 'CLAREZA', 'CONFIANCA', 'CONSCIENCIA', 'DESAFIO', 'DESENVOLVE', 'ENERGIA', 'EXPERIENCIA', 'IMAGEM', 'INTERNET', 'LIBERDADE', 'MATEMATICA', 'MEMORIA', 'MISTERIO', 'PALAVRAS', 'PENSAMENTO', 'PERFEICAO', 'PROJETO', 'REFLEXAO', 'SISTEMA', 'TECNOLOGIA', 'TELEVISAO', 'UNIVERSO', 'VELOCIDADE', 'PROGRAMA', 'APLICATIVO', 'SOFTWARE', 'HARDWARE', 'REDE', 'SEGURANCA', 'FILOSOFIA', 'PSICOLOGIA', 'MEDICINA', 'DIREITO', 'ECONOMIA', 'PUBLICIDADE', 'MARKETING', 'CIENCIA', 'LITERATURA'],
                ['BRASIL', 'ESPANHA', 'PORTUGAL', 'FRANCA', 'ITALIA', 'JAPAO', 'CHILE', 'ARGENTINA', 'CANADA', 'MEXICO', 'RUSSIA', 'CHINA', 'ALEMANHA', 'INGLATERRA', 'INDIA', 'EGITO', 'GRECIA', 'SUICA', 'BELGICA', 'HOLANDA', 'TURQUIA', 'SUEDIA', 'NORUEGA', 'DINAMARCA'],
                ['BIOLOGIA', 'QUIMICA', 'FISICA', 'GEOGRAFIA', 'HISTORIA', 'CIENCIA', 'GRAMATICA', 'SOCIOLOGIA', 'ASTRONOMIA', 'GEOLOGIA', 'METEOROLOGIA', 'BOTANICA', 'ZOOLOGIA', 'FISIOLOGIA', 'ANATOMIA', 'MICROBIOLOGIA', 'GENETICA', 'ECOLOGIA', 'FOTOSSINTESE', 'EVOLUCAO']
            ],
            hard: [
                ['ADMINISTRACAO', 'APRENDIZAGEM', 'ARQUITETURA', 'BIODIVERSIDADE', 'COMUNICACAO', 'CONHECIMENTO', 'CONSCIENTIZACAO', 'CONSTITUICAO', 'DEMOCRATIZACAO', 'DESENVOLVIMENTO', 'DETERMINACAO', 'EMPREENDEDORISMO', 'EXTRAORDINARIO', 'GLOBALIZACAO', 'HABILIDADE', 'INFRAESTRUTURA', 'INTERNACIONAL', 'LIDERANCA', 'MODERNIZACAO', 'ORGANIZACAO', 'PERSPECTIVA', 'PROGRAMACAO', 'RESPONSABILIDADE', 'REVOLUCIONARIO', 'SUSTENTABILIDADE', 'TRANSFORMACAO', 'AUTOMACAO', 'CIBERNETICA', 'SISTEMATIZACAO', 'COMPUTACIONAL', 'CONVENCIONAL', 'CRIATIVIDADE', 'DISCIPLINAR', 'EFICIENCIA', 'EMANCIPACAO', 'ESTRATEGICO', 'EVOLUCIONARIO', 'FISIOLOGICO', 'FUNDAMENTOS', 'INNOVACAO', 'METODOLOGIA', 'PERSISTENCIA', 'POTENCIAL', 'RELACIONAMENTO', 'SIMULTANEAMENTE'],
                ['COMPORTAMENTO', 'COMPREENSIVEL', 'CONTRADITORIO', 'DESENCADEAR', 'DISCRIMINACAO', 'ESPECIFICIDADE', 'INDEPENDENCIA', 'JUSTIFICATIVA', 'LEGITIMIDADE', 'MANIFESTACAO', 'MULTIDISCIPLINAR', 'OPORTUNIDADE', 'PROPORCIONAL', 'SOFISTICACAO', 'TRANSITORIO', 'VIABILIDADE', 'ABSTRACIONISMO', 'ANACRONISMO', 'CONSEQUENCIA', 'DESINTERESSE', 'EXCEPCIONAL', 'IMPRESCRITIVEL', 'INCONSTITUCIONAL', 'INTERDEPENDENTE', 'REPRESENTATIVIDADE', 'SUBJETIVIDADE', 'SUPERFICIAL', 'TRANSCENDENTAL'],
                ['CONTRADITORIO', 'DESENCADEAR', 'DISCRIMINACAO', 'ESPECIFICIDADE', 'INDEPENDENCIA', 'JUSTIFICATIVA', 'LEGITIMIDADE', 'MANIFESTACAO', 'MULTIDISCIPLINAR', 'OPORTUNIDADE', 'PROPORCIONAL', 'SOFISTICACAO', 'TRANSITORIO', 'VIABILIDADE', 'ABSTRACIONISMO', 'ANACRONISMO', 'CONSEQUENCIA', 'DESINTERESSE', 'EXCEPCIONAL', 'IMPRESCRITIVEL', 'INCONSTITUCIONAL', 'INTERDEPENDENTE', 'REPRESENTATIVIDADE', 'SUBJETIVIDADE', 'SUPERFICIAL', 'TRANSCENDENTAL']
            ]
        };
        
        this.directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0], // horizontal e vertical
            [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonal
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.newGame();
    }

    setupEventListeners() {
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
                this.newGame();
            });
        });

        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    newGame() {
        this.foundWords = [];
        this.selectedCells = [];
        this.score = this.level > 1 ? this.score : 0;
        this.timeRemaining = this.timeLimit;
        this.hintUsed = false;

        switch(this.difficulty) {
            case 'easy': this.gridSize = 12; break;
            case 'medium': this.gridSize = 15; break;
            case 'hard': this.gridSize = 18; break;
        }

        this.generateGame();
        this.updateDisplay();
        this.startTimer();
    }

    generateGame() {
        const wordSets = this.wordLists[this.difficulty];
        const randomIndex = Math.floor(Math.random() * wordSets.length);
        this.words = [...wordSets[randomIndex]];
        this.wordLocations = new Map();

        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(''));
        
        this.placeWords();
        
        this.fillEmptyCells();
        
        this.createGridHTML();
        this.createWordsListHTML();
    }

    placeWords() {
        this.words.forEach(word => {
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
                const startRow = Math.floor(Math.random() * this.gridSize);
                const startCol = Math.floor(Math.random() * this.gridSize);
                
                if (this.canPlaceWord(word, startRow, startCol, direction)) {
                    this.placeWord(word, startRow, startCol, direction);
                    placed = true;
                }
                attempts++;
            }
        });
    }

    canPlaceWord(word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + direction[0] * i;
            const newCol = col + direction[1] * i;
            
            if (newRow < 0 || newRow >= this.gridSize || 
                newCol < 0 || newCol >= this.gridSize) {
                return false;
            }
            
            if (this.grid[newRow][newCol] !== '' && 
                this.grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    placeWord(word, row, col, direction) {
        const locations = [];
        for (let i = 0; i < word.length; i++) {
            const newRow = row + direction[0] * i;
            const newCol = col + direction[1] * i;
            this.grid[newRow][newCol] = word[i];
            locations.push({ row: newRow, col: newCol });
        }
        this.wordLocations.set(word, locations);
    }

    fillEmptyCells() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === '') {
                    this.grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    createGridHTML() {
        const gridElement = document.getElementById('wordGrid');
        gridElement.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        gridElement.innerHTML = '';

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = this.grid[row][col];
                cell.dataset.row = row;
                cell.dataset.col = col;
                gridElement.appendChild(cell);
            }
        }
    }

    createWordsListHTML() {
        const listElement = document.getElementById('wordsList');
        listElement.innerHTML = '';

        this.words.forEach(word => {
            const li = document.createElement('li');
            li.className = 'word-item';
            li.textContent = word;
            li.dataset.word = word;
            listElement.appendChild(li);
        });

        document.getElementById('totalCount').textContent = this.words.length;
        document.getElementById('foundCount').textContent = this.foundWords.length;
    }

    handleMouseDown(e) {
        if (e.target.classList.contains('grid-cell')) {
            this.isSelecting = true;
            this.selectedCells = [e.target];
            e.target.classList.add('selected');
            e.preventDefault();
        }
    }

    handleMouseMove(e) {
        if (this.isSelecting && e.target.classList.contains('grid-cell')) {
            const lastCell = this.selectedCells[this.selectedCells.length - 1];
            const currentCell = e.target;
            
            if (this.isValidSelection(lastCell, currentCell)) {
                if (!this.selectedCells.includes(currentCell)) {
                    this.selectedCells.push(currentCell);
                    currentCell.classList.add('selected');
                }
            }
        }
    }

    handleMouseUp(e) {
        if (this.isSelecting) {
            this.checkSelectedWord();
            this.isSelecting = false;
        }
    }

    isValidSelection(cell1, cell2) {
        const row1 = parseInt(cell1.dataset.row);
        const col1 = parseInt(cell1.dataset.col);
        const row2 = parseInt(cell2.dataset.row);
        const col2 = parseInt(cell2.dataset.col);

        const deltaRow = Math.abs(row2 - row1);
        const deltaCol = Math.abs(col2 - col1);
        
        return deltaRow === 0 || deltaCol === 0 || deltaRow === deltaCol;
    }

    checkSelectedWord() {
        if (this.selectedCells.length < 2) {
            this.clearSelection();
            return;
        }

        const selectedWord = this.selectedCells.map(cell => cell.textContent).join('');
        const reversedWord = selectedWord.split('').reverse().join('');

        const foundWord = this.words.find(word => 
            word === selectedWord || word === reversedWord
        );

        if (foundWord && !this.foundWords.includes(foundWord)) {
            this.foundWords.push(foundWord);
            this.selectedCells.forEach(cell => cell.classList.add('found'));
            
            const wordItem = document.querySelector(`[data-word="${foundWord}"]`);
            if (wordItem) {
                wordItem.classList.add('found');
            }

            this.score += foundWord.length * 10 + (this.hintUsed ? 0 : 50);
            this.updateDisplay();

            if (this.foundWords.length === this.words.length) {
                this.gameComplete();
            }
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selectedCells.forEach(cell => {
            if (!cell.classList.contains('found')) {
                cell.classList.remove('selected');
            }
        });
        this.selectedCells = [];
    }

    showHint() {
        if (this.hintUsed) return;
        
        const unFoundWords = this.words.filter(word => !this.foundWords.includes(word));
        if (unFoundWords.length === 0) return;

        const randomWord = unFoundWords[Math.floor(Math.random() * unFoundWords.length)];
        
        // Destaque na lista de palavras
        const wordItem = document.querySelector(`[data-word="${randomWord}"]`);
        if (wordItem) {
            wordItem.style.background = 'linear-gradient(45deg, #ffd89b, #19547b)';
            wordItem.style.color = 'white';
            wordItem.style.animation = 'found-pulse 1s ease-in-out 3';
            
            setTimeout(() => {
                wordItem.style.background = '';
                wordItem.style.color = '';
                wordItem.style.animation = '';
            }, 3000);
        }

        // Destaque na grade
        const locations = this.wordLocations.get(randomWord);
        const cells = document.querySelectorAll('.grid-cell');
        
        locations.forEach(loc => {
            const cell = cells[loc.row * this.gridSize + loc.col];
            if (cell) {
                cell.classList.add('hint-cell');
                setTimeout(() => {
                    cell.classList.remove('hint-cell');
                }, 3000);
            }
        });
        
        this.hintUsed = true;
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.gameOver();
            }
        }, 1000);
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('foundCount').textContent = this.foundWords.length;
        
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    gameComplete() {
        clearInterval(this.timer);
        const timeUsed = this.timeLimit - this.timeRemaining;
        const timeBonus = Math.max(0, this.timeRemaining * 5);
        this.score += timeBonus;
        
        document.getElementById('finalScore').textContent = this.score;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;
        document.getElementById('finalTime').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('gameComplete').style.display = 'flex';
    }

    gameOver() {
        alert(`Tempo esgotado! Você encontrou ${this.foundWords.length} de ${this.words.length} palavras.\nPontuação: ${this.score}`);
        this.newGame();
    }

    nextLevel() {
        this.level++;
        this.closeModal();
        this.newGame();
    }

    closeModal() {
        document.getElementById('gameComplete').style.display = 'none';
    }
    
    newRandomWords() {
        this.level = 1;
        this.score = 0;
        this.newGame();
    }
}

let game;

function newGame() {
    game.newGame();
}

function clearSelection() {
    game.clearSelection();
}

function showHint() {
    game.showHint();
}

function nextLevel() {
    game.nextLevel();
}

function closeModal() {
    game.closeModal();
}

function newRandomWords() {
    game.newRandomWords();
}

window.addEventListener('DOMContentLoaded', () => {
    game = new WordSearchGame();
});