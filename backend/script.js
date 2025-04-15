const commands = {
    'help': {
        type: 'system',
        content: `<div class="command-help">
                    <strong>Available Commands:</strong>
                    <ul>
                        <li><code>about</code> - Display personal profile</li>
                        <li><code>education</code> - Show academic background & achievements</li>
                        <li><code>skills</code> - Show technical capabilities</li>
                        <li><code>gallery</code> - View Delhi photo gallery</li>
                        <li><code>contact</code> - Access contact information</li>
                        <li><code>textstats</code> - Analyze text statistics</li>
                        <li><code>clear</code> - Purge terminal history</li>
                    </ul>
                  </div>`
    },
    'about': { type: 'content', target: 'about-section' },
    'education': { type: 'content', target: 'education-section' },
    'skills': { type: 'content', target: 'skills-section' },
    'gallery': { type: 'content', target: 'gallery-section' },
    'contact': { type: 'content', target: 'contact-section' },
    'textstats': { type: 'content', target: 'text-analysis' }
};

const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');
const cursor = document.querySelector('.cursor');

let commandHistory = [];
let historyIndex = -1;

// Create command line element
function createCommandLine(text) {
    const div = document.createElement('div');
    div.className = 'command-line';
    div.innerHTML = `
        <span class="prompt">manav@terminal:~$</span>
        <span class="command-text">${text}</span>
    `;
    return div;
}

// Display hidden content
function displayContent(sectionId) {
    const content = document.getElementById(sectionId).cloneNode(true);
    content.style.display = 'block';
    return content;
}
function playSound() {
    const audio = document.getElementById('terminal-sound');
    audio.currentTime = 0;
    audio.play().catch(() => { /* Handle browser autoplay restrictions */ });
}
// Process commands
function processCommand(cmd) {
    playSound(); // Play sound on command
    const commandLine = createCommandLine(cmd);
    terminalOutput.appendChild(commandLine);

    if (cmd === 'clear') {
        terminalOutput.innerHTML = '<div class="system-message">Terminal history purged<br>Type \'help\' for command list</div>';
        return;
    }

    if (commands[cmd]) {
        if (commands[cmd].type === 'system') {
            terminalOutput.insertAdjacentHTML('beforeend', commands[cmd].content);
        } else {
            terminalOutput.appendChild(displayContent(commands[cmd].target));
        }
    } else {
        terminalOutput.insertAdjacentHTML('beforeend', 
            `<div class="error-message">
                Command '${cmd}' not recognized<br>
                Type 'help' for available commands
            </div>`
        );
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Update cursor position calculation
function updateCursorPosition() {
    const text = commandInput.value;
    const fakeDiv = document.createElement('div');
    fakeDiv.style.position = 'absolute';
    fakeDiv.style.whiteSpace = 'pre';
    fakeDiv.style.font = window.getComputedStyle(commandInput).font;
    fakeDiv.textContent = text;
    document.body.appendChild(fakeDiv);
    const width = fakeDiv.offsetWidth;
    document.body.removeChild(fakeDiv);
    
    cursor.style.left = `${width + 2}px`;
}

// Event listeners
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = commandInput.value.trim().toLowerCase();
        commandInput.value = '';
        if (cmd) {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            processCommand(cmd);
        }
        setTimeout(() => {
            commandInput.focus();
            updateCursorPosition();
        }, 0);
    }
    
    // Handle history navigation
    if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
            updateCursorPosition();
        }
    }
    
    if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
            updateCursorPosition();
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
            updateCursorPosition();
        }
    }
});

// Cursor handling
commandInput.addEventListener('input', (e) => {
    updateCursorPosition();
    cursor.style.visibility = 'visible';
});

commandInput.addEventListener('focus', () => {
    cursor.style.animation = 'blink 1s step-end infinite';
    cursor.style.backgroundColor = '#00FF00';
    updateCursorPosition();
});

commandInput.addEventListener('blur', () => {
    cursor.style.animation = 'none';
    cursor.style.backgroundColor = 'transparent';
});

// Linguistic databases
const PRONOUNS = ['I', 'you', 'he', 'she', 'it', 'we', 'they',  
    'me', 'him', 'her', 'us', 'them',  
    'mine', 'yours', 'his', 'hers', 'its', 'ours', 'theirs',  
    'my', 'your', 'his', 'her', 'its', 'our', 'their',  
    'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves',  
    'this', 'that', 'these', 'those',  
    'all', 'another', 'any', 'anybody', 'anyone', 'anything', 'both', 'each', 'either', 'everybody', 'everyone', 'everything',  
    'few', 'many', 'most', 'neither', 'nobody', 'none', 'no one', 'nothing', 'one', 'other', 'others', 'several', 'some', 'somebody', 'someone', 'something', 'such',  
    'who', 'whom', 'whose', 'which', 'that',  
    'what',  
    'each other', 'one another',  
    'each', 'either', 'neither']
    ;
const PREPOSITIONS = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'as', 'at',  
    'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'but', 'by',  
    'concerning', 'considering',  
    'despite', 'down', 'during',  
    'except', 'excluding',  
    'following', 'for', 'from',  
    'in', 'inside', 'into',  
    'like',  
    'minus',  
    'near',  
    'of', 'off', 'on', 'onto', 'opposite', 'out', 'outside', 'over',  
    'past', 'per', 'plus',  
    'regarding', 'round',  
    'save', 'since',  
    'through', 'throughout', 'till', 'to', 'toward', 'towards',  
    'under', 'underneath', 'unlike', 'until', 'up', 'upon',  
    'versus', 'via',  
    'with', 'within', 'without']
    ;
const ARTICLES = ['a', 'an', 'the'];

function runFullAnalysis() {
    const text = document.getElementById('text-input').value;
    const results = document.getElementById('analysis-results');
    results.innerHTML = '';
    
    countBasicStats();
    analyzePronouns();
    analyzePrepositions();
    analyzeArticles();
}

function countBasicStats() {
    const text = document.getElementById('text-input').value;
    const results = document.getElementById('analysis-results');
    
    const stats = {
        letters: text.replace(/[^a-z]/gi, '').length,
        words: text.match(/\b\w+\b/g)?.length || 0,
        spaces: text.match(/ /g)?.length || 0,
        newlines: text.match(/\n/g)?.length || 0,
        special: text.match(/[^\w\s]/g)?.length || 0
    };

    results.innerHTML += `
        <div class="result-section">
            <h3>Basic Statistics</h3>
            <table class="results-table">
                <tr><th>Metric</th><th>Count</th></tr>
                ${Object.entries(stats).map(([key, val]) => `
                    <tr><td>${key.toUpperCase()}</td><td>${val}</td></tr>
                `).join('')}
            </table>
        </div>
    `;
}

// In all analysis functions, add the validation check
function analyzePronouns() {
    analyzeCategory('Pronouns', PRONOUNS);
}

function analyzePrepositions() {
    analyzeCategory('Prepositions', PREPOSITIONS);
}

function analyzeArticles() {
    analyzeCategory('Articles', ARTICLES);
}

function analyzeCategory(category, wordList) {
    const text = document.getElementById('text-input').value.toLowerCase();
    const results = document.getElementById('analysis-results');
    const counts = {};
    
    wordList.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = text.match(regex);
        counts[word] = matches ? matches.length : 0;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    
    // Filter out zero counts for non-basic stats
    const entries = category === 'Basic Statistics' 
        ? Object.entries(counts)
        : Object.entries(counts).filter(([_, count]) => count > 0);

    results.innerHTML += `
        <div class="result-section">
            <h3>${category} Analysis</h3>
            <table class="results-table">
                <tr><th>${category === 'Basic Statistics' ? 'Metric' : category.slice(0, -1)}</th><th>Count</th></tr>
                ${entries.map(([word, count]) => `
                    <tr><td>${word}</td><td>${count}</td></tr>
                `).join('')}
                ${total > 0 ? `<tr><td>TOTAL</td><td>${total}</td></tr>` : ''}
            </table>
        </div>
    `;
}


// Add text input validation
document.getElementById('text-input').addEventListener('input', function(e) {
    const wordCount = this.value.trim().split(/\s+/).length;
    const counter = document.getElementById('word-counter');
    
    if (!counter) {
        const counterDiv = document.createElement('div');
        counterDiv.id = 'word-counter';
        this.parentNode.insertBefore(counterDiv, this.nextSibling);
    }
    
    document.getElementById('word-counter').innerHTML = `
        <span class="cyber-text">WORDS: ${wordCount}</span>
    `;
});

function captureUserActivity() {
    // Log a "page view" event when the page is loaded
    const pageViewTime = new Date().toISOString();
    console.log(`${pageViewTime} , view , Page loaded`);

    // Listen for click events on the entire document
    document.addEventListener('click', function(e) {
        const timestamp = new Date().toISOString();
        const eventType = 'click';
        // Get the target element type and a brief description (first 100 characters of its HTML)
        const targetElement = e.target;
        const elementType = targetElement.tagName.toLowerCase();
        const elementDesc = targetElement.outerHTML.replace(/\n/g, ' ').substring(0, 100) + '...';
        console.log(`${timestamp} , ${eventType} , ${elementType} , ${elementDesc}`);
    });
}

// Call the activity capture function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', captureUserActivity);
// Initialize terminal
commandInput.focus();
updateCursorPosition();