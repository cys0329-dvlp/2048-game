class Game2048 {
    constructor() {
        this.size = 4;
        this.board = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore2048') || 0;
        this.gameOver = false;
        this.won = false;
        this.tileId = 0;
        this.tiles = new Map(); // 타일 ID -> {value, id}
        this.previousBoard = [];
        this.init();
    }

    init() {
        this.board = Array(this.size * this.size).fill(0);
        this.tiles.clear();
        this.tileId = 0;
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.previousBoard = [];
        this.addNewTile();
        this.addNewTile();
        this.render();
    }

    addNewTile() {
        const emptyCells = [];
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === 0) {
                emptyCells.push(i);
            }
        }

        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        this.board[randomCell] = value;
        this.tiles.set(this.tileId, { value, position: randomCell, id: this.tileId, isNew: true });
        this.tileId++;
    }

    getRow(index) {
        return this.board.slice(index * this.size, (index + 1) * this.size);
    }

    setRow(index, row) {
        for (let i = 0; i < this.size; i++) {
            this.board[index * this.size + i] = row[i];
        }
    }

    getColumn(index) {
        const column = [];
        for (let i = 0; i < this.size; i++) {
            column.push(this.board[i * this.size + index]);
        }
        return column;
    }

    setColumn(index, column) {
        for (let i = 0; i < this.size; i++) {
            this.board[i * this.size + index] = column[i];
        }
    }

    compress(line) {
        const newLine = line.filter(val => val !== 0);
        return [...newLine, ...Array(this.size - newLine.length).fill(0)];
    }

    merge(line) {
        let newLine = line.slice();
        let merged = false;

        for (let i = 0; i < this.size - 1; i++) {
            if (newLine[i] === newLine[i + 1] && newLine[i] !== 0) {
                newLine[i] *= 2;
                newLine[i + 1] = 0;
                this.score += newLine[i];
                merged = true;

                // 2048 도달 확인
                if (newLine[i] === 2048) {
                    this.won = true;
                }
            }
        }

        return this.compress(newLine);
    }

    move(direction) {
        if (this.gameOver || this.won) return false;

        let moved = false;
        const oldBoard = this.board.slice();

        if (direction === 'left' || direction === 'right') {
            for (let i = 0; i < this.size; i++) {
                let row = this.getRow(i);
                row = this.compress(row);
                row = this.merge(row);

                if (direction === 'right') {
                    row = row.reverse();
                    row = this.compress(row);
                    row = row.reverse();
                }

                this.setRow(i, row);
            }
        } else if (direction === 'up' || direction === 'down') {
            for (let i = 0; i < this.size; i++) {
                let column = this.getColumn(i);
                column = this.compress(column);
                column = this.merge(column);

                if (direction === 'down') {
                    column = column.reverse();
                    column = this.compress(column);
                    column = column.reverse();
                }

                this.setColumn(i, column);
            }
        }

        // 보드가 변경되었는지 확인
        for (let i = 0; i < this.board.length; i++) {
            if (oldBoard[i] !== this.board[i]) {
                moved = true;
                break;
            }
        }

        if (moved) {
            // 타일 위치 업데이트
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i] !== 0) {
                    // 이미 존재하는 타일 찾기
                    let found = false;
                    for (let [id, tile] of this.tiles) {
                        if (tile.value === this.board[i] && tile.position !== i) {
                            // 타일 위치 업데이트
                            tile.position = i;
                            tile.isNew = false;
                            found = true;
                            break;
                        }
                    }
                }
            }
            this.addNewTile();
            this.checkGameOver();
        }

        this.render();
        return moved;
    }

    checkGameOver() {
        // 빈 칸이 있으면 게임 오버 아님
        if (this.board.includes(0)) return;

        // 수평 이동 가능한지 확인
        for (let i = 0; i < this.size; i++) {
            const row = this.getRow(i);
            for (let j = 0; j < this.size - 1; j++) {
                if (row[j] === row[j + 1]) {
                    return;
                }
            }
        }

        // 수직 이동 가능한지 확인
        for (let i = 0; i < this.size; i++) {
            const column = this.getColumn(i);
            for (let j = 0; j < this.size - 1; j++) {
                if (column[j] === column[j + 1]) {
                    return;
                }
            }
        }

        this.gameOver = true;
    }

    render() {
        const gameBoard = document.getElementById('gameBoard');
        const boardSize = gameBoard.offsetWidth;
        const cellSize = (boardSize - 50) / 4; // 패딩 10px * 5개 간격 + gap 10px * 4개

        for (let i = 0; i < this.board.length; i++) {
            const value = this.board[i];
            let tile = document.querySelector(`[data-tile-pos="${i}"]`);

            if (!tile) {
                tile = document.createElement('div');
                tile.className = 'tile';
                tile.setAttribute('data-tile-pos', i);
                gameBoard.appendChild(tile);
            }

            if (value === 0) {
                tile.classList.add('empty');
                tile.removeAttribute('data-value');
                tile.textContent = '';
            } else {
                tile.classList.remove('empty');
                tile.setAttribute('data-value', value);
                tile.textContent = value;

                // 새로운 타일 확인
                if (this.tiles.size > 0) {
                    for (let [id, tileData] of this.tiles) {
                        if (tileData.position === i && tileData.isNew) {
                            tile.classList.add('new-tile');
                            tileData.isNew = false;
                        }
                    }
                }
            }
        }

        document.getElementById('score').textContent = this.score;
        document.getElementById('bestScore').textContent = this.bestScore;
    }

    updateBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore2048', this.bestScore);
            document.getElementById('bestScore').textContent = this.bestScore;
        }
    }
}

// 랭킹 관리
const RANKING_KEY = 'game2048_ranking';
const MAX_RANKING = 10;

function getRanking() {
    const data = localStorage.getItem(RANKING_KEY);
    return data ? JSON.parse(data) : [];
}

function saveRanking(ranking) {
    localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
}

function addScoreToRanking(score, name = '익명') {
    if (!name.trim()) {
        name = '익명';
    }
    
    let ranking = getRanking();
    ranking.push({
        score: score,
        name: name.trim().substring(0, 20),
        date: new Date().toLocaleDateString('ko-KR')
    });
    
    // 점수 기준으로 정렬 (내림차순)
    ranking.sort((a, b) => b.score - a.score);
    
    // 상위 10개만 유지
    ranking = ranking.slice(0, MAX_RANKING);
    
    saveRanking(ranking);
    updateRankingDisplay();
}

function updateRankingDisplay() {
    const ranking = getRanking();
    const rankingList = document.getElementById('rankingList');
    
    if (ranking.length === 0) {
        rankingList.innerHTML = '<div class="ranking-item">아직 기록이 없습니다</div>';
        return;
    }
    
    rankingList.innerHTML = '';
    ranking.forEach((item, index) => {
        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
        const rankItem = document.createElement('div');
        rankItem.className = `ranking-item ${rankClass}`;
        rankItem.innerHTML = `
            <span class="rank-number">#${index + 1}</span>
            <span class="rank-name">${item.name}</span>
            <span class="rank-score">${item.score.toLocaleString()}</span>
        `;
        rankingList.appendChild(rankItem);
    });
}

function toggleRanking() {
    const rankingPanel = document.getElementById('rankingPanel');
    rankingPanel.classList.toggle('show');
}

let game = new Game2048();

// 초기 랭킹 표시
updateRankingDisplay();

function saveScore() {
    const playerName = document.getElementById('playerName').value;
    addScoreToRanking(game.score, playerName);
    document.getElementById('playerName').value = '';
    document.getElementById('nameInputGroup').style.display = 'none';
    newGame();
}

function newGame() {
    game.updateBestScore();
    game = new Game2048();
    document.getElementById('gameOverModal').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright') {
        e.preventDefault();

        if (key === 'arrowup') game.move('up');
        else if (key === 'arrowdown') game.move('down');
        else if (key === 'arrowleft') game.move('left');
        else if (key === 'arrowright') game.move('right');

        if (game.gameOver) {
            setTimeout(() => {
                const gameOverModal = document.getElementById('gameOverModal');
                document.getElementById('gameOverTitle').textContent = '게임 오버!';
                document.getElementById('gameOverMessage').textContent = `최종 점수: ${game.score}`;
                document.getElementById('nameInputGroup').style.display = 'flex';
                gameOverModal.style.display = 'flex';
            }, 100);
        } else if (game.won) {
            setTimeout(() => {
                const gameOverModal = document.getElementById('gameOverModal');
                document.getElementById('gameOverTitle').textContent = '축하합니다! 🎉';
                document.getElementById('gameOverMessage').textContent = `2048을 달성했습니다! 계속 플레이하실 수 있습니다.`;
                document.getElementById('nameInputGroup').style.display = 'none';
                gameOverModal.style.display = 'flex';
                game.won = false;
            }, 100);
        }
    }
});

// 모바일 터치 지원
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            game.move('left');
        } else {
            game.move('right');
        }
    } else {
        if (diffY > 0) {
            game.move('up');
        } else {
            game.move('down');
        }
    }

    if (game.gameOver) {
        setTimeout(() => {
            const gameOverModal = document.getElementById('gameOverModal');
            document.getElementById('gameOverTitle').textContent = '게임 오버!';
            document.getElementById('gameOverMessage').textContent = `최종 점수: ${game.score}`;
            document.getElementById('nameInputGroup').style.display = 'flex';
            gameOverModal.style.display = 'flex';
        }, 100);
    } else if (game.won) {
        setTimeout(() => {
            const gameOverModal = document.getElementById('gameOverModal');
            document.getElementById('gameOverTitle').textContent = '축하합니다! 🎉';
            document.getElementById('gameOverMessage').textContent = `2048을 달성했습니다! 계속 플레이하실 수 있습니다.`;
            document.getElementById('nameInputGroup').style.display = 'none';
            gameOverModal.style.display = 'flex';
            game.won = false;
        }, 100);
    }
});

