function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        document.body.appendChild(snowflake);
    }
}

// FRÅGE-DATA
        // Strukturen: varje kategori har en array med 6 frågor (100-600 poäng)
        const questions = {
            "Musik": [
                { points: 100, question: 'Vilken artist släppte albumet "21"?', answer: "Adele" },
                { points: 200, question: 'I vilket land hölls Eurovison Song Contest året ABBA vann med "Waterloo"?', answer: "England" },
                { points: 300, question: "Vilket album är det mest sålda genom tiderna?", answer: 'Michael Jacksons "Thriller"' },
                { points: 400, question: 'Vem sjunger låten "Stairway to Heaven"?', answer: "Led Zeppelin" },
                { points: 500, question: 'Från vilken låt känner vi till texten "I wish you could swim. Like the dolphins, like dolphins can swim"?', answer: "Heroes med David Bowie" },
                { points: 600, question: 'Vilket svenskt band sjunger en låt som är med i filmen "Pretty Woman"?', answer: "Roxette" }
            ],
            "Kultur": [
                { points: 100, question: "Vem är Ziggy Stardust?", answer: "David Bowie" },
                { points: 200, question: "Vad kallas solguden i den grekiska mytologin?", answer: "Helios" },
                { points: 300, question: 'Vilken svensk skådespelare fick sitt genombrott i filmen "Danish Girl"?', answer: "Alicia Vikander" },
                { points: 400, question: "Vilken film vann Leonardi Dicaprio en Oscar för?", answer: "The Revenant" },
                { points: 500, question: "Vilket år var den legendariska Woodstock-festivalen?", answer: "1969" },
                { points: 600, question: 'Vem sa "Den största äran i livet ligger inte i att aldrig falla, utan att resa sig varje gång vi faller"?', answer: "Nelson Mandela" }
            ],
            "Geografi": [
                { points: 100, question: "I vilken delstat i USA är festivalen Burning Man?", answer: "Nevada" },
                { points: 200, question: "Vilken är Italiens näst största stad?", answer: "Milano" },
                { points: 300, question: "Vilken är Kroatiens störta ö?", answer: "Krk" },
                { points: 400, question: "Ange rätt land för fäljande motorcykelmärken: Harley Davidson, Triumph och Zündapp", answer: "USA (Harley Davidson), England (Triumph) och Tyskland (Zündapp)" },
                { points: 500, question: "Hur många länder delar Tjeckien landsgräns med?", answer: "4 (Tyskland, Polen, Österrike och Slovakien)" },
                { points: 600, question: "Vad heter bergskedjan som ligger på den sydöstra gränsen mellan Europa och västra Asien?", answer: "Kaukasus" }
            ],
            "Allmänbildning": [
                { points: 100, question: "Ungefär hur många procent av jordens yta täcks av hav?", answer: "Ca 70%" },
                { points: 200, question: "Hur många planeter i vårt solsystem har ringar?", answer: "4 (Saturnus, Jupiter, Uranus & Neptunus)" },
                { points: 300, question: "Vad består solen till tre fjärdedelar av för ämne?", answer: "Väte" },
                { points: 400, question: "Vad heter färgkoden som används inom digital design med sex siffror och bokstäver?", answer: "Hex-kod" },
                { points: 500, question: "Vad står förkortningen cc för i e-postmeddelanden?", answer: "Carbon Copy" },
                { points: 600, question: "Vilket grundämne har det högsta smältpunkten?", answer: "Volfram" } 
            ],
            "Jul": [
                { points: 100, question: "Vilken är den mest spelade jullåten på Spotify?", answer: "Mariah Carey - All I Want For Christmas Is You" },
                { points: 200, question: "Vem gör rösten till konduktören i The Polar Express (2004)?", answer: "Tom Hanks" },
                { points: 300, question: "Hur många renar drar jultomtens släde?", answer: "9 (inklusive Rudolf)" },
                { points: 400, question: "Hur många gåvor nämns i 'The Twelve Days of Christmas'?", answer: "364" },
                { points: 500, question: "Vilket land exporterar flest julgranar i Europa?", answer: "Danmark" },
                { points: 600, question: "Enligt julberättelsen, vilka gåvor gav de tre vise männen till Jesus?", answer: "Guld, myrra & rökelse" }
            ]
        };

        //ta bort snöflingor
function removeSnowflakes() {
document.querySelectorAll('.snowflake').forEach(flake => flake.remove());
}

        // SPELSTATE
    let teams = [];
    let answeredQuestions = new Set();
    let currentQuestion = null;

function saveGameState() {
    const gameState = {
        teams: teams,
        answeredQuestions: Array.from(answeredQuestions),
        gameStarted: document.getElementById('game-board').style.display === 'block'
    };
    localStorage.setItem('jeopardyGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('jeopardyGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        teams = gameState.teams;
        answeredQuestions = new Set(gameState.answeredQuestions);
        
        if (gameState.gameStarted) {
            document.getElementById('team-setup').style.display = 'none';
            document.getElementById('game-board').style.display = 'block';
            buildBoard();
            updateScoreboard();
        }
    }
}

        // TEAM SETUP FUNKTIONER
function addTeamInput() {
    const teamInputs = document.getElementById('team-inputs');
    const newInput = document.createElement('div');
    newInput.className = 'team-input-group';
    newInput.innerHTML = `<input type="text" placeholder="Lag ${teamInputs.children.length + 1} namn" class="team-name-input">`;
    teamInputs.appendChild(newInput);
}

function startGame() {
// Hämta alla lagnamn från inputs
    const teamInputs = document.querySelectorAll('.team-name-input');
    teams = [];
            
        teamInputs.forEach((input, index) => {
        const name = input.value.trim();
            if (name) {
            teams.push({ name: name, score: 0 });
}
    });

            // Validering: minst 1 lag måste finnas
        if (teams.length === 0) {
        customConfirm('Ange minst ett lagnamn!', function() {});
        return;
        }

            // Visa spelbrädet, dölj team setup
        document.body.classList.remove('snow-active');
        removeSnowflakes();
        document.getElementById('team-setup').style.display = 'none';
        document.getElementById('game-board').style.display = 'block';

            // Bygg spelplanen
        buildBoard();
        updateScoreboard();
        saveGameState();
        }

        // BYGG SPELBRÄDET
function buildBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    const categories = Object.keys(questions);

            // Skapa kategorirubriker
    categories.forEach(category => {
    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = category;
    board.appendChild(header);
    });

            // Skapa frågeceller (6 rader per kategori)
            for (let i = 0; i < 6; i++) {
                categories.forEach(category => {
                    const cell = document.createElement('div');
                    cell.className = 'question-cell';
                    const questionData = questions[category][i];
                    cell.textContent = questionData.points;
                    cell.dataset.category = category;
                    cell.dataset.index = i;
                    
                    // Click-event för att öppna frågan
                    cell.addEventListener('click', () => openQuestion(category, i, cell));
                    
                    board.appendChild(cell);
                });
            }
        }

        // ÖPPNA FRÅGA
        function openQuestion(category, index, cell) {
            // Kolla om frågan redan besvarats
            const questionId = `${category}-${index}`;
            if (answeredQuestions.has(questionId)) {
                return;
            }

            currentQuestion = {
                category: category,
                index: index,
                id: questionId,
                cell: cell,
                data: questions[category][index]
            };

            // Visa modal med frågan
            document.getElementById('modal-points').textContent = `${currentQuestion.data.points} poäng`;
            document.getElementById('modal-question').textContent = currentQuestion.data.question;
            document.getElementById('modal-answer').textContent = `Svar: ${currentQuestion.data.answer}`;
            
            // Dölj svaret initialt
            document.getElementById('answer-section').style.display = 'none';
            document.getElementById('show-answer-btn').style.display = 'block';
            
            // Bygg lagknappar
            buildTeamButtons();
            
            document.getElementById('question-modal').style.display = 'flex';
        }

        // VISA SVAR
        function showAnswer() {
            document.getElementById('answer-section').style.display = 'block';
            document.getElementById('show-answer-btn').style.display = 'none';
        }

        // BYGG LAGKNAPPAR
        function buildTeamButtons() {
            const container = document.getElementById('team-buttons');
            container.innerHTML = '';
            
            teams.forEach((team, index) => {
                const button = document.createElement('button');
                button.className = 'team-button';
                button.textContent = team.name;
                button.onclick = () => teamScored(index);
                container.appendChild(button);
            });
        }

        // LAG FÅR POÄNG
        function teamScored(teamIndex) {
            teams[teamIndex].score += currentQuestion.data.points;
            updateScoreboard();
            saveGameState();
            closeQuestion();
        }

        // INGET LAG FÅR POÄNG
        function noTeamScored() {
            saveGameState();
            closeQuestion();
        }

        // STÄNG FRÅGA
        function closeQuestion() {
            // Markera frågan som besvarad
            answeredQuestions.add(currentQuestion.id);
            currentQuestion.cell.classList.add('answered');
            
            // Stäng modal
            document.getElementById('question-modal').style.display = 'none';
            currentQuestion = null;
        }

        // UPPDATERA SCOREBOARD
        function updateScoreboard() {
            const scoreboard = document.getElementById('scoreboard');
            scoreboard.innerHTML = '';
            
            teams.forEach(team => {
                const teamScore = document.createElement('div');
                teamScore.className = 'team-score';
                teamScore.innerHTML = `
                    <h3>${team.name}</h3>
                    <p>${team.score} poäng</p>
                `;
                scoreboard.appendChild(teamScore);
            });
        }

    // NOLLSTÄLL SPEL
    function resetGame() {
        customConfirm('Är du säker på att du vill nollställa spelet?', function() {
                // Återställ all state
            teams.forEach(team => team.score = 0);
            answeredQuestions.clear();
                
                // Återbygg brädet och uppdatera poäng
            buildBoard();
            updateScoreboard();
            localStorage.removeItem('jeopardyGameState');
            saveGameState();
        });
    }

        function backToSetup() {
    customConfirm('Vill du avsluta spelet och börja om?', function() {
        localStorage.removeItem('jeopardyGameState');
        location.reload();
    })
}

function customConfirm(message, onConfirm) {
    const modal = document.getElementById('custom-modal');
    const messageEl = document.getElementById('custom-modal-message');
    const buttonsEl = document.getElementById('custom-modal-buttons');
    
    messageEl.textContent = message;
    buttonsEl.innerHTML = `
    <button class="cancel-button" onclick="document.getElementById('custom-modal').style.display='none'">Avbryt</button>
    <button class="team-button" id="confirm-yes">OK</button>
`;
    
    modal.style.display = 'flex';
    
    document.getElementById('confirm-yes').onclick = function() {
        modal.style.display = 'none';
        onConfirm();
    };
}

    window.addEventListener('DOMContentLoaded', function() {
    
    loadGameState();
    
    // Skapa snöflingor bara om vi är på setup-sidan
    if (document.getElementById('team-setup').style.display !== 'none') {
    createSnowflakes();
    }
});