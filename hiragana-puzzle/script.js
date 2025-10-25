document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const titleScreen = document.querySelector('.title-screen');
    const startTitleButton = document.getElementById('start-title');
    const gameImage = document.getElementById('game-image');
    const nextImageButton = document.getElementById('next-image');
    const checkAnswerButton = document.getElementById('check-answer');
    const resetGameButton = document.getElementById('reset-game');
    const lettersSource = document.getElementById('letters-source');
    const answerDropArea = document.getElementById('answer-drop-area');
    const resultMessage = document.getElementById('result-message');
    const gameArea = document.querySelector('.game-area');
    const confirmDialog = document.getElementById('confirm-dialog');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');
    
    // imageSetsはimage-data.jsから提供される
    
    // ゲームの状態を管理する変数
    let shuffledImageSets = [];
    let currentImageIndex = 0;
    let originalText = '';
    let shuffledLetters = [];
    let isCurrentPuzzleSolved = false; // 現在の問題が解かれたかどうか
    
    // 配列をシャッフルする関数
    function shuffleArray(array) {
        const newArray = [...array];
        let currentIndex = newArray.length;
        let temporaryValue, randomIndex;
        
        // Fisher-Yatesアルゴリズムでシャッフル
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            temporaryValue = newArray[currentIndex];
            newArray[currentIndex] = newArray[randomIndex];
            newArray[randomIndex] = temporaryValue;
        }
        
        return newArray;
    }
    
    // 文字列をシャッフルする関数
    function shuffleText(text) {
        const array = text.split('');
        const shuffled = shuffleArray(array);
        
        // 元の文字列と同じにならないようにする
        if (shuffled.join('') === text && text.length > 1) {
            return shuffleText(text); // 再帰的に再シャッフル
        }
        
        return shuffled;
    }
    
    // 画像セットをシャッフルする関数
    function shuffleImageSets() {
        shuffledImageSets = shuffleArray(window.imageSets);
    }
    
    // 確認ダイアログを表示する関数
    function showConfirmDialog() {
        confirmDialog.style.display = 'flex';
    }
    
    // 確認ダイアログを非表示にする関数
    function hideConfirmDialog() {
        confirmDialog.style.display = 'none';
    }
    
    // 次の画像に切り替える関数
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % shuffledImageSets.length;
        isCurrentPuzzleSolved = false; // 新しい問題に切り替えたらリセット
        startGame();
    }
    
    // ドロップインジケータを削除する共通関数
    function removeDropIndicators() {
        const dropIndicators = document.querySelectorAll('.drop-indicator');
        dropIndicators.forEach(indicator => indicator.remove());
    }
    
    // ドラッグアンドドロップの初期化
    function initDragAndDrop() {
        // ドラッグ開始時の処理
        function handleDragStart(e) {
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.dataset.index);
            e.dataTransfer.effectAllowed = 'move';
        }
        
        // ドラッグ終了時の処理
        function handleDragEnd(e) {
            this.classList.remove('dragging');
            // ドロップ位置のインジケーターを削除
            removeDropIndicators();
        }
        
        // ドラッグオーバー時の処理
        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.classList.add('drag-over');
            
            // 回答欄内での位置を計算
            if (this === answerDropArea) {
                updateDropIndicator(e);
            }
            
            return false;
        }
        
        // ドラッグリーブ時の処理
        function handleDragLeave(e) {
            this.classList.remove('drag-over');
        }
        
        // ドロップ時の処理
        function handleDrop(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const index = e.dataTransfer.getData('text/plain');
            const letterItem = document.querySelector(`.letter-item[data-index="${index}"]`);
            
            // ドロップ位置のインジケーターを削除
            removeDropIndicators();
            
            if (letterItem) {
                if (this === answerDropArea) {
                    // 回答欄内での位置を計算
                    const insertPosition = getInsertPosition(e);
                    
                    if (letterItem.parentNode === lettersSource) {
                        // 文字元から回答欄への移動
                        if (insertPosition !== null) {
                            answerDropArea.insertBefore(letterItem, insertPosition);
                        } else {
                            answerDropArea.appendChild(letterItem);
                        }
                    } else if (letterItem.parentNode === answerDropArea) {
                        // 回答欄内での移動
                        if (insertPosition !== null && insertPosition !== letterItem && insertPosition !== letterItem.nextSibling) {
                            answerDropArea.insertBefore(letterItem, insertPosition);
                        }
                    }
                } else if (this === lettersSource && letterItem.parentNode === answerDropArea) {
                    // 回答欄から文字元への移動
                    lettersSource.appendChild(letterItem);
                }
            }
            
            return false;
        }
        
        // ドロップ位置のインジケーターを更新する関数
        function updateDropIndicator(e) {
            // 既存のインジケーターを削除
            removeDropIndicators();
            
            // ドラッグ中の要素を取得
            const draggingElement = document.querySelector('.dragging');
            if (!draggingElement) return;
            
            // 回答欄内の文字要素を取得
            const letterItems = Array.from(answerDropArea.querySelectorAll('.letter-item:not(.dragging)'));
            
            // 挿入位置を計算
            const insertPosition = getInsertPosition(e);
            
            // インジケーターを作成
            if (insertPosition !== null) {
                const indicator = document.createElement('div');
                indicator.classList.add('drop-indicator');
                answerDropArea.insertBefore(indicator, insertPosition);
            } else if (letterItems.length > 0) {
                const indicator = document.createElement('div');
                indicator.classList.add('drop-indicator');
                answerDropArea.appendChild(indicator);
            }
        }
        
        // 挿入位置を計算する関数
        function getInsertPosition(e) {
            const answerRect = answerDropArea.getBoundingClientRect();
            const mouseX = e.clientX - answerRect.left;
            
            // 回答欄内の文字要素を取得
            const letterItems = Array.from(answerDropArea.querySelectorAll('.letter-item:not(.dragging)'));
            
            if (letterItems.length === 0) {
                return null;
            }
            
            // マウス位置に最も近い要素を見つける
            for (let i = 0; i < letterItems.length; i++) {
                const item = letterItems[i];
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2 - answerRect.left;
                
                if (mouseX < itemCenterX) {
                    return item;
                }
            }
            
            return null;
        }
        
        // ドロップエリアにイベントリスナーを追加
        answerDropArea.addEventListener('dragover', handleDragOver);
        answerDropArea.addEventListener('dragleave', handleDragLeave);
        answerDropArea.addEventListener('drop', handleDrop);
        
        lettersSource.addEventListener('dragover', handleDragOver);
        lettersSource.addEventListener('dragleave', handleDragLeave);
        lettersSource.addEventListener('drop', handleDrop);
        
        // 文字アイテムにドラッグイベントリスナーを追加
        const letterItems = document.querySelectorAll('.letter-item');
        letterItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });
    }
    
    // 現在の回答を取得する関数
    function getCurrentAnswer() {
        const letterItems = answerDropArea.querySelectorAll('.letter-item');
        let answer = '';
        letterItems.forEach(item => {
            answer += item.textContent;
        });
        return answer;
    }
    
    // シャッフルされた文字を表示する関数
    function displayShuffledLetters() {
        lettersSource.innerHTML = '';
        
        shuffledLetters.forEach((letter, index) => {
            const letterElement = document.createElement('div');
            letterElement.classList.add('letter-item');
            letterElement.textContent = letter;
            letterElement.dataset.index = index;
            letterElement.draggable = true;
            
            // クリックイベントを追加
            letterElement.addEventListener('click', function() {
                // 文字元にある場合のみ処理
                if (this.parentNode === lettersSource) {
                    // 回答欄に追加
                    answerDropArea.appendChild(this);
                } else if (this.parentNode === answerDropArea) {
                    // 回答欄にある場合は文字元に戻す
                    lettersSource.appendChild(this);
                }
            });
            
            lettersSource.appendChild(letterElement);
        });
        
        // ドラッグアンドドロップの初期化
        initDragAndDrop();
    }
    
    // タイトル画面からゲーム画面への遷移
    function startFromTitle() {
        titleScreen.style.display = 'none';
        
        // 画像セットをシャッフル
        shuffleImageSets();
        
        // ゲームを開始
        startGame();
        
        // ゲームエリアを表示
        gameArea.style.display = 'block';
    }
    
    // ゲームを開始する関数
    function startGame() {
        const currentSet = shuffledImageSets[currentImageIndex];
        originalText = currentSet.text;
        
        // 文字をシャッフル
        shuffledLetters = shuffleText(originalText);
        
        // 回答エリアをクリア
        answerDropArea.innerHTML = '';
        
        // 表示を更新
        gameImage.src = currentSet.imagePath;
        gameImage.alt = `テーマ画像: ${currentSet.text}`;
        displayShuffledLetters();
        resultMessage.textContent = '';
        resultMessage.className = 'result';
    }
    
    // 答え合わせをする関数
    function checkAnswer() {
        const currentAnswer = getCurrentAnswer();
        
        if (currentAnswer === originalText) {
            resultMessage.textContent = '正解です！おめでとうございます！';
            resultMessage.className = 'result correct';
            isCurrentPuzzleSolved = true; // 正解したらフラグを立てる
            
            // パーティクルエフェクトを発動
            particleSystem.createCelebration();
            
            // 1秒後に解説ダイアログを表示
            setTimeout(() => {
                const currentSet = shuffledImageSets[currentImageIndex];
                showExplanationDialog(currentSet);
            }, 1000);
        } else {
            resultMessage.textContent = '不正解です。もう一度試してみてください。';
            resultMessage.className = 'result incorrect';
        }
    }
    
    // ゲームをリセットする関数
    function resetGame() {
        // 文字を元の位置に戻す
        const letterItems = document.querySelectorAll('.letter-item');
        letterItems.forEach(item => {
            lettersSource.appendChild(item);
        });
        
        // 結果メッセージをクリア
        resultMessage.textContent = '';
        resultMessage.className = 'result';
    }
    
    // イベントリスナーの設定
    startTitleButton.addEventListener('click', startFromTitle);
    
    // 次の画像ボタンのイベントリスナー
    nextImageButton.addEventListener('click', function() {
        // 正解済みの場合は直接次の問題へ
        if (isCurrentPuzzleSolved) {
            nextImage();
        } else {
            // 未正解の場合は確認ダイアログを表示
            showConfirmDialog();
        }
    });
    
    // 確認ダイアログの「はい」ボタン
    confirmYesButton.addEventListener('click', function() {
        hideConfirmDialog();
        nextImage();
    });
    
    // 確認ダイアログの「いいえ」ボタン
    confirmNoButton.addEventListener('click', function() {
        hideConfirmDialog();
    });
    
    checkAnswerButton.addEventListener('click', checkAnswer);
    resetGameButton.addEventListener('click', resetGame);
    
    // ヒント機能の実装
    const hintButton = document.getElementById('hint-button');
    const hintDialog = document.getElementById('hint-dialog');
    const hintMessage = document.getElementById('hint-message');
    const hintCloseButton = document.getElementById('hint-close');
    
    // ヒントダイアログを表示する関数
    function showHintDialog(message) {
        hintMessage.textContent = message;
        hintDialog.style.display = 'flex';
    }
    
    // ヒントダイアログを非表示にする関数
    function hideHintDialog() {
        hintDialog.style.display = 'none';
    }
    
    // ヒントボタンのイベントリスナー
    hintButton.addEventListener('click', function() {
        // 答え欄が空かどうかチェック
        if (answerDropArea.children.length === 0) {
            // 答え欄が空の場合、正解の最初の文字を自動的に移動
            const correctFirstChar = originalText[0];
            // 正解の最初の文字を持つブロックを探す
            const letterItems = lettersSource.querySelectorAll('.letter-item');
            for (const item of letterItems) {
                if (item.textContent === correctFirstChar) {
                    answerDropArea.appendChild(item);
                    break;
                }
            }
        } else {
            // 答え欄に文字がある場合、間違っている文字の位置を特定
            const currentAnswer = getCurrentAnswer();
            const correctAnswer = originalText;
            
            // 現在の回答と正解を比較して間違いを見つける
            let wrongPosition = -1;
            for (let i = 0; i < currentAnswer.length; i++) {
                if (i >= correctAnswer.length || currentAnswer[i] !== correctAnswer[i]) {
                    wrongPosition = i + 1; // 1から始まる位置
                    break;
                }
            }
            
            if (wrongPosition > 0) {
                showHintDialog(`${wrongPosition}文字目が間違っています。`);
            } else if (currentAnswer.length < correctAnswer.length) {
                // 現在の回答が正解の一部と一致している場合、次の正解の文字を自動的に移動
                const nextCorrectChar = correctAnswer[currentAnswer.length];
                // 次の正解の文字を持つブロックを探す
                const letterItems = lettersSource.querySelectorAll('.letter-item');
                for (const item of letterItems) {
                    if (item.textContent === nextCorrectChar) {
                        answerDropArea.appendChild(item);
                        break;
                    }
                }
            } else {
                showHintDialog('文字の並び順が間違っています。');
            }
        }
    });
    
    // ヒントダイアログの閉じるボタン
    hintCloseButton.addEventListener('click', hideHintDialog);
    
    // ことわざ解説機能の実装
    const explanationDialog = document.getElementById('explanation-dialog');
    const explanationTitle = document.getElementById('explanation-title');
    const meaningText = document.getElementById('meaning-text');
    const explanationCloseButton = document.getElementById('explanation-close');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 解説ダイアログを表示する関数
    function showExplanationDialog(imageSet) {
        explanationTitle.textContent = `「${imageSet.text}」の解説`;
        meaningText.textContent = imageSet.explanation.meaning;
        
        // 最初のタブ（意味）をアクティブにする
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
        
        explanationDialog.style.display = 'flex';
    }
    
    // 解説ダイアログを非表示にする関数
    function hideExplanationDialog() {
        explanationDialog.style.display = 'none';
    }
    
    // タブ切り替え機能
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // すべてのタブボタンとコンテンツからactiveクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // クリックされたタブボタンをアクティブにする
            this.classList.add('active');
            
            // 対応するコンテンツを表示
            document.getElementById(`${targetTab}-content`).classList.add('active');
        });
    });
    
    // 解説ダイアログの閉じるボタン
    explanationCloseButton.addEventListener('click', function() {
        hideExplanationDialog();
        nextImage();
    });
    
    // パーティクルシステムの実装
    class ParticleSystem {
        constructor() {
            this.canvas = document.getElementById('particle-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.animationId = null;
            
            // キャンバスサイズを設定
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
        
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        createParticle(x, y, type = 'star') {
            const colors = {
                star: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2'],
                heart: ['#FF1493', '#FF69B4', '#FFB6C1'],
                sakura: ['#FFB7C5', '#FFC0CB', '#FFCCCB']
            };
            
            return {
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * -3 - 2,
                size: Math.random() * 8 + 4,
                color: colors[type][Math.floor(Math.random() * colors[type].length)],
                type: type,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.01,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            };
        }
        
        drawParticle(particle) {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            if (particle.type === 'star') {
                this.drawStar(particle);
            } else if (particle.type === 'heart') {
                this.drawHeart(particle);
            } else if (particle.type === 'sakura') {
                this.drawSakura(particle);
            }
            
            this.ctx.restore();
        }
        
        drawStar(particle) {
            const size = particle.size;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            
            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5;
                const x = Math.cos(angle) * size;
                const y = Math.sin(angle) * size;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
                
                const innerAngle = ((i + 0.5) * Math.PI * 2) / 5;
                const innerX = Math.cos(innerAngle) * size * 0.5;
                const innerY = Math.sin(innerAngle) * size * 0.5;
                this.ctx.lineTo(innerX, innerY);
            }
            
            this.ctx.closePath();
            this.ctx.fill();
        }
        
        drawHeart(particle) {
            const size = particle.size;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            
            const x = 0;
            const y = 0;
            this.ctx.moveTo(x, y + size / 4);
            this.ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
            this.ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size / 2, x, y + size);
            this.ctx.bezierCurveTo(x, y + size / 2, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
            this.ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
            
            this.ctx.fill();
        }
        
        drawSakura(particle) {
            const size = particle.size;
            this.ctx.fillStyle = particle.color;
            
            for (let i = 0; i < 5; i++) {
                this.ctx.save();
                this.ctx.rotate((i * Math.PI * 2) / 5);
                this.ctx.beginPath();
                this.ctx.ellipse(0, -size / 2, size / 3, size, 0, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
        }
        
        updateParticle(particle) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // 重力
            particle.life -= particle.decay;
            particle.rotation += particle.rotationSpeed;
            
            return particle.life > 0;
        }
        
        createCelebration() {
            this.canvas.classList.add('active');
            
            // より多くの発射地点を設定
            const positions = [
                { x: this.canvas.width * 0.1, y: this.canvas.height * 0.9 },
                { x: this.canvas.width * 0.25, y: this.canvas.height * 0.85 },
                { x: this.canvas.width * 0.4, y: this.canvas.height * 0.9 },
                { x: this.canvas.width * 0.6, y: this.canvas.height * 0.9 },
                { x: this.canvas.width * 0.75, y: this.canvas.height * 0.85 },
                { x: this.canvas.width * 0.9, y: this.canvas.height * 0.9 }
            ];
            
            const types = ['star', 'heart', 'sakura'];
            
            // 初回の大量パーティクル生成
            positions.forEach(pos => {
                for (let i = 0; i < 25; i++) {
                    const type = types[Math.floor(Math.random() * types.length)];
                    const particle = this.createParticle(
                        pos.x + (Math.random() - 0.5) * 150,
                        pos.y + (Math.random() - 0.5) * 80,
                        type
                    );
                    // より強い初期速度
                    particle.vx = (Math.random() - 0.5) * 8;
                    particle.vy = Math.random() * -6 - 3;
                    this.particles.push(particle);
                }
            });
            
            // 中央からの爆発エフェクト
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            for (let i = 0; i < 50; i++) {
                const angle = (Math.PI * 2 * i) / 50;
                const speed = Math.random() * 6 + 4;
                const particle = this.createParticle(centerX, centerY, types[Math.floor(Math.random() * types.length)]);
                particle.vx = Math.cos(angle) * speed;
                particle.vy = Math.sin(angle) * speed;
                particle.size = Math.random() * 12 + 6; // より大きなサイズ
                this.particles.push(particle);
            }
            
            this.animate();
            
            // 継続的なパーティクル生成（1秒間）
            let burstCount = 0;
            const burstInterval = setInterval(() => {
                if (burstCount < 5) {
                    // 追加のパーティクルバースト
                    const randomPos = positions[Math.floor(Math.random() * positions.length)];
                    for (let i = 0; i < 15; i++) {
                        const type = types[Math.floor(Math.random() * types.length)];
                        const particle = this.createParticle(
                            randomPos.x + (Math.random() - 0.5) * 100,
                            randomPos.y + (Math.random() - 0.5) * 60,
                            type
                        );
                        particle.vx = (Math.random() - 0.5) * 6;
                        particle.vy = Math.random() * -5 - 2;
                        this.particles.push(particle);
                    }
                    burstCount++;
                } else {
                    clearInterval(burstInterval);
                }
            }, 200);
            
            // 5秒後にエフェクトを停止
            setTimeout(() => {
                this.stopAnimation();
            }, 5000);
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles = this.particles.filter(particle => {
                const alive = this.updateParticle(particle);
                if (alive) {
                    this.drawParticle(particle);
                }
                return alive;
            });
            
            if (this.particles.length > 0) {
                this.animationId = requestAnimationFrame(() => this.animate());
            } else {
                this.stopAnimation();
            }
        }
        
        stopAnimation() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            this.canvas.classList.remove('active');
            this.particles = [];
        }
    }
    
    // パーティクルシステムのインスタンスを作成
    const particleSystem = new ParticleSystem();
});
