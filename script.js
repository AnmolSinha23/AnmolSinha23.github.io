const CONFIG = {
  mobileBreakpoint: 900
};

// Prevent browser from restoring scroll position on page refresh
if ('scrollRestoration' in window.history) { window.history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// --- Update Navbar Date & Clock ---
const navDateEl = document.getElementById('nav-date-text');
const navClockEl = document.getElementById('nav-clock-text');

function updateSidebarTime() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  navDateEl.textContent = `${dd}/${mm}/${yy}`;
  
  const hh = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  navClockEl.textContent = `${hh}:${mins}:${ss}`;
}

function updateTerminalUptime() {
  const birthDate = new Date('2005-08-23T00:00:00');
  const now = new Date();
  
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const uptimeEl = document.getElementById('terminal-uptime');
  if (uptimeEl) {
    uptimeEl.textContent = `${years} years, ${months} months, ${days} days`;
  }
}

updateSidebarTime();
updateTerminalUptime();
setInterval(() => {
  updateSidebarTime();
  updateTerminalUptime();
}, 1000);

// boot screen animation
window.addEventListener('load', () => {
  const bootSeq = document.getElementById('boot-sequence');
  if (!bootSeq) return;

  const grub = document.getElementById('boot-grub');
  const os = document.getElementById('boot-os');
  const skipBtn = document.getElementById('skip-boot-btn');

  // Session Memory Check
  let hasBooted = false;
  try {
    hasBooted = sessionStorage.getItem('hasBooted') === 'true';
  } catch(e) {}

  if (hasBooted) {
    // Fast boot sequence to prevent "glitch" feeling
    const grubHeader = grub.querySelector('.grub-header');
    const grubBorder = grub.querySelector('.grub-border');
    const grubFooter = grub.querySelector('.grub-footer');
    
    if (grubHeader) grubHeader.textContent = "FAST BOOT INITIATED...";
    if (grubBorder) grubBorder.innerHTML = "<div style='text-align: center; color: #4cd137; padding: 40px 20px; font-weight: bold;'>Resuming previous session from memory...<br><br>[ OK ] Kernel loaded.<br>[ OK ] Modules loaded.</div>";
    if (grubFooter) grubFooter.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
    
    setTimeout(() => {
      bootSeq.style.opacity = '0';
      bootSeq.style.transform = 'scale(0.98)';
      setTimeout(() => {
        bootSeq.remove();
        document.body.classList.remove('is-booting');
        if (typeof updateScrollMetrics === 'function') updateScrollMetrics();
        window.dispatchEvent(new Event('scroll'));
        if (typeof updateScrollUI === 'function') updateScrollUI();
      }, 500);
    }, 800);
    return; // skip full boot
  }

  const opt1 = document.getElementById('grub-opt-1');
  const opt2 = document.getElementById('grub-opt-2');
  const opt3 = document.getElementById('grub-opt-3');
  let skipTimeout;
  
  function skipBoot() {
    clearTimeout(skipTimeout);
    try { sessionStorage.setItem('hasBooted', 'true'); } catch(e) {}
    bootSeq.style.opacity = '0';
    setTimeout(() => {
      bootSeq.remove();
      document.body.classList.remove('is-booting');
      if (typeof updateScrollMetrics === 'function') updateScrollMetrics();
      window.dispatchEvent(new Event('scroll'));
      if (typeof updateScrollUI === 'function') updateScrollUI();
    }, 300);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', skipBoot);
  }

  // simulate arrow keys down
  setTimeout(() => {
    let booted = false; try { booted = sessionStorage.getItem('hasBooted'); } catch(e) {}
    if (booted) return;
    opt1.classList.remove('grub-active');
    opt2.classList.add('grub-active');
  }, 600);

  setTimeout(() => {
    let booted = false; try { booted = sessionStorage.getItem('hasBooted'); } catch(e) {}
    if (booted) return;
    opt2.classList.remove('grub-active');
    opt3.classList.add('grub-active');
  }, 800);

  // hit enter and show gui
  setTimeout(() => {
    let booted = false; try { booted = sessionStorage.getItem('hasBooted'); } catch(e) {}
    if (booted) return;
    
    // Smooth transition out for GRUB
    grub.style.opacity = '0';
    grub.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      grub.style.display = 'none';
      os.style.display = 'flex';
      
      // Force reflow to trigger CSS transition
      void os.offsetWidth;
      
      // Smooth transition in for OS
      os.style.opacity = '1';
      os.style.transform = 'scale(1)';
    }, 500);

    skipBtn.style.color = '#fff'; // adjust button contrast against black bg
    skipBtn.style.background = '#000';
    skipBtn.style.borderColor = '#fff';
  }, 1300);

  // fade out automatically
  skipTimeout = setTimeout(() => {
    let booted = false; try { booted = sessionStorage.getItem('hasBooted'); } catch(e) {}
    if (!booted) skipBoot();
  }, 4300);
});

// terminal commands data
const portfolioData = {
  // ─── ARCHITECTURE ──────────────────────────────────────────────────
  "architecture": `
<span class="c-peach c-bold">🏗️ architecture</span>
<span class="c-dim">──────────────────────────────</span>

  Built with raw HTML/CSS/JS. Zero external frameworks, zero image assets (everything is CSS, SVG, or Canvas). AI was utilized as a compiler for tedious boilerplate (like rasterizing game sprites), allowing focus on raw performance and system logic.
`,

  // ─── HELP ──────────────────────────────────────────────────────────
  "help": `
<span class="c-mauve c-bold">Available Commands</span> <span class="c-dim">──────────────</span>

  <span class="c-green">education</span>      <span class="c-dim">│</span>  University
  <span class="c-green">skills</span>         <span class="c-dim">│</span>  Tech stack
  <span class="c-green">specs</span>          <span class="c-dim">│</span>  Hardware & OS
  <span class="c-green">current_status</span> <span class="c-dim">│</span>  What I'm doing
  <span class="c-green">inspiration</span>    <span class="c-dim">│</span>  Inspiration
  <span class="c-green">meditate</span>       <span class="c-dim">│</span>  Take a breather
  <span class="c-green">game</span>           <span class="c-dim">│</span>  Dino game
  <span class="c-green">sudo</span>           <span class="c-dim">│</span>  ???
  <span class="c-green">clear</span>          <span class="c-dim">│</span>  Clear terminal
  <span class="c-green">help</span>           <span class="c-dim">│</span>  Show this
`,

  // ─── INSPIRATION ───────────────────────────────────────────────────
  "inspiration": `
<span class="c-peach c-bold">✨ inspiration</span>
<span class="c-dim">──────────────────────────────</span>

  This site's incredible aesthetic and structure were heavily 
  inspired by <a href="https://aditi-portfolio-six.vercel.app/" target="_blank" style="color:var(--accent-blue); text-decoration:underline; font-weight:bold;">Aditi's Portfolio</a>. 
  Check it out for some amazing design work!
`,

  // ─── SPECS ─────────────────────────────────────────────────────────
  "specs": `
<span class="c-peach c-bold">💻 specs</span>
<span class="c-dim">──────────────────────────────</span>

  <span class="c-mauve c-bold">Hardware</span>
  <span class="c-dim">├──</span> <span class="c-blue c-bold">Laptop</span> — Lenovo IdeaPad S145
  <span class="c-dim">├──</span> <span class="c-blue c-bold">RAM</span>    — 8GB 2400MHz
  <span class="c-dim">├──</span> <span class="c-blue c-bold">ROM</span>    — 256GB SSD
  <span class="c-dim">└──</span> <span class="c-blue c-bold">GPU</span>    — Radeon Vega 8 (2GB Int)

  <span class="c-mauve c-bold">Operating System</span>
  <span class="c-dim">├──</span> <span class="c-blue c-bold">Current</span> — Fedora Linux
  <span class="c-dim">└──</span> <span class="c-blue c-bold">Alt</span>     — Arch Linux 
                <span class="c-dim">(thinking of completely shifting to it)</span>
`,

  // ─── EDUCATION ─────────────────────────────────────────────────────
  "education": `
<span class="c-peach c-bold">📚 education</span>
<span class="c-dim">──────────────────────────────</span>

  <span class="c-blue c-bold">University</span> <span class="c-dim">│</span> IIIT BHOPAL
  <span class="c-blue c-bold">Degree</span>     <span class="c-dim">│</span> B.Tech in CS
  <span class="c-blue c-bold">Year</span>       <span class="c-dim">│</span> 2nd Yr (Grad: 2029)

<span class="c-teal c-bold">  Performance:</span>
  <span class="c-dim">├──</span> 10th (CBSE): 99.4%
  <span class="c-dim">└──</span> 12th (CBSE): 86.4% <span class="c-red">(Crazy downfall ik!)</span>

<span class="c-teal c-bold">  Coursework:</span>
  <span class="c-dim">├──</span> FLAT (Formal Language & Automata Theory)
  <span class="c-dim">├──</span> DAA (Design and Analysis of Algorithms)
  <span class="c-dim">├──</span> DBMS (Database Management Systems)
  <span class="c-dim">├──</span> SCS (Signals and Communication Systems)
  <span class="c-dim">└──</span> COA (Computer Organization and Architecture)
`,

  // ─── SKILLS ────────────────────────────────────────────────────────
  "skills": `
<span class="c-peach c-bold">🛠️  skills</span>
<span class="c-dim">──────────────────────────────</span>

  <span class="c-mauve c-bold">Languages</span>
  <span class="c-dim">├──</span> <span class="c-green c-bold">C++</span>    — STL, comp prog
  <span class="c-dim">├──</span> Python — scripts, auto
  <span class="c-dim">├──</span> JS     — web projects
  <span class="c-dim">└──</span> SQL    — databases

  <span class="c-mauve c-bold">Tools</span>
  <span class="c-dim">├──</span> Git / GitHub
  <span class="c-dim">├──</span> Linux (Arch btw)
  <span class="c-dim">├──</span> Docker (basics)
  <span class="c-dim">└──</span> VS Code

  <span class="c-mauve c-bold">Focus</span>
  <span class="c-dim">├──</span> Competitive Prog
  <span class="c-dim">├──</span> Systems Prog
  <span class="c-dim">└──</span> Open Source
`,

  "current_status": `
<span class="c-yellow c-bold">[STATUS]</span> <span class="c-white">Currently watching Breaking Bad, after that Better Call Saul.</span>
<span class="c-dim">         Fun fact: I keep tricking myself into watching it instead of studying</span>
<span class="c-dim">         thinking at least it will improve my attention span.</span>
`
};

const termBody  = document.getElementById('term-body');
const cmdInput  = document.getElementById('cmd-input');
const inputLine = document.getElementById('input-line');

const history = [];
let histIdx = -1;
let validCommandCount = 0;

const WELCOME = `<span class="c-lavender c-bold"> Portfolio OS v1.1.0</span>
<span class="c-dim"> Type </span><span class="c-green">help</span><span class="c-dim"> to see available commands.</span>
`;
printOutput('', WELCOME, true);

document.querySelector('.terminal-card').addEventListener('click', (e) => {
  if (window.innerWidth > CONFIG.mobileBreakpoint) {
    cmdInput.focus();
  }
});

cmdInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const raw = cmdInput.value;
    const cmd = raw.trim().toLowerCase();
    cmdInput.value = '';
    if (cmd) { history.push(raw); histIdx = history.length; }
    processCommand(cmd, raw);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx > 0) { histIdx--; cmdInput.value = history[histIdx]; }
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx < history.length - 1) { histIdx++; cmdInput.value = history[histIdx]; }
    else { histIdx = history.length; cmdInput.value = ''; }
  }
});

let awaitingPlayerName = false;
let awaitingGameConfirm = false;
let gameActive = false;
let currentPlayer = "";

function processCommand(cmd, raw) {
  if (awaitingPlayerName) {
    currentPlayer = raw.trim();
    if (currentPlayer) {
      try {
        let players = JSON.parse(localStorage.getItem('dino_players') || '[]');
        players.push({ name: currentPlayer, date: new Date().toLocaleString() });
        localStorage.setItem('dino_players', JSON.stringify(players));
      } catch (e) {}
    }
    
    awaitingPlayerName = false;
    awaitingGameConfirm = true;
    printOutput(raw, `<span class="c-dim">it will be remembered young lad</span>\n\nThe legendary dino game has been called upon would you like to start y/n\n<span class="c-yellow">If you beat the high score of 10,000 something special is waiting for you, who knows it might be a lot of money (from my standards)</span>`);
    return;
  }

  if (awaitingGameConfirm) {
    if (cmd === 'y' || cmd === 'yes') {
      printOutput(raw, `<span class="c-green">Starting the legendary dino game...</span>`);
      startGame();
    } else {
      printOutput(raw, `<span class="c-dim">Game cancelled.</span>`);
    }
    awaitingGameConfirm = false;
    return;
  }

  if (cmd === 'game') {
    awaitingPlayerName = true;
    printOutput(raw, `what is your name daring lad :`);
    validCommandCount++;
    if (validCommandCount >= 3) achievements.unlock('hacker', 'Achievement Unlocked', 'Hacker Mode');
    return;
  }

  if (cmd === 'clear') {
    termBody.querySelectorAll('.output-block').forEach(el => el.remove());
    scrollToBottom();
    validCommandCount++;
    if (validCommandCount >= 3) achievements.unlock('hacker', 'Achievement Unlocked', 'Hacker Mode');
    return;
  }
  if (cmd === 'meditate') {
    printOutput(raw, '<span class="c-dim">Starting meditation session…</span>');
    validCommandCount++;
    if (validCommandCount >= 3) achievements.unlock('hacker', 'Achievement Unlocked', 'Hacker Mode');
    startMeditation();
    return;
  }
  if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
    printOutput(raw, `<span class="c-red c-bold">🚨 police is on the way my lad!</span>`);
    validCommandCount++;
    if (validCommandCount >= 3) achievements.unlock('hacker', 'Achievement Unlocked', 'Hacker Mode');
    return;
  }
  if (portfolioData[cmd]) {
    printOutput(raw, portfolioData[cmd]);
    validCommandCount++;
    if (validCommandCount >= 3) achievements.unlock('hacker', 'Achievement Unlocked', 'Hacker Mode');
    return;
  }
  printOutput(raw, `<span class="c-red">command not found:</span> ${escapeHtml(raw)}\n<span class="c-dim">Type </span><span class="c-green">help</span><span class="c-dim"> for available commands.</span>`);
}

function printOutput(echoCmd, html, skipScroll = false) {
  const block = document.createElement('div');
  block.className = 'output-block';
  if (echoCmd) {
    block.innerHTML = `<div class="cmd-echo"><span class="prompt-prefix">root@anmol</span><span class="prompt-symbol">:~$</span> ${escapeHtml(echoCmd)}</div>` + html;
  } else {
    block.innerHTML = html;
  }
  termBody.insertBefore(block, inputLine);
  if (!skipScroll) {
    scrollToBottom();
  }
}

function scrollToBottom() {
  requestAnimationFrame(() => { termBody.scrollTop = termBody.scrollHeight; });
}
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function startGame() {
  gameActive = true;
  inputLine.style.display = 'none';
  
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 150;
  canvas.style.border = '2px solid var(--pure-black)';
  canvas.style.background = '#fff';
  canvas.style.marginTop = '16px';
  canvas.style.borderRadius = '4px';
  canvas.style.boxShadow = '4px 4px 0 var(--pure-black)';
  canvas.style.maxWidth = '100%';
  canvas.style.height = 'auto';
  
  const block = document.createElement('div');
  block.className = 'output-block';
  block.appendChild(canvas);
  termBody.insertBefore(block, inputLine);
  scrollToBottom();

  const ctx = canvas.getContext('2d');
  
  // Note: Using string arrays and fillRect for sprites instead of external PNGs to enforce a strict zero-dependency, zero-HTTP-request architecture. Asset generation was AI-assisted to save time. Trading minor CPU compute overhead for absolute zero network latency.
  const dinoPixels = [
    "             xxxxxxxxxxx",
    "            xxxxxxxxxxxx",
    "            xxxxxxxxxxxx",
    "            xx xxxxxxxxx",
    "            xxxxxxxxxxxx",
    "            xxxxxxxxxxxx",
    "            xxxxxxxxxxxx",
    "            xxxxxxxx    ",
    "x           xxxxxxx     ",
    "xx         xxxxxxxx     ",
    "xxx        xxxxxxxx     ",
    "xxxx      xxxxxxxxx     ",
    "xxxx      xxxxxxxxx     ",
    "xxxx     xxxxxxxxxx     ",
    "xxxxx    xxxxxxxxxx     ",
    " xxxxx  xxxxxxxxxx      ",
    " xxxxx xxxxxxxxxxx      ",
    "  xxxxxxxxxxxxxxx       ",
    "   xxxxxxxxxxxxx        ",
    "    xxxxxxxxxxx         ",
    "     xxxxxxxxx          ",
    "      xxxxxxx           ",
    "       xxxxx            ",
    "       xx  x            ",
    "       xx  x            ",
    "       xx  xx           "
  ];
  const cactusPixels = [
    "   xx   ",
    "   xx   ",
    "x  xx  x",
    "x  xx  x",
    "xx xx xx",
    "xx xx xx",
    " xxxxx  ",
    "   xx   ",
    "   xx   ",
    "   xx   ",
    "   xx   ",
    "   xx   ",
    "   xx   ",
    "   xx   "
  ];
  const crowPixels = [
    "      x       ",
    "     xxx      ",
    "    xxxxx     ",
    "   xxxxxxx  x ",
    "x  xxxxxxxxxx ",
    "xxxxxxxxxxxxx ",
    " xxxxxxxxxxx  ",
    "   xxxxxxxxx  ",
    "     xxx      ",
    "      x       "
  ];

  function drawSprite(pixels, startX, startY, pixelSize, color) {
    ctx.fillStyle = color;
    for (let r = 0; r < pixels.length; r++) {
      for (let c = 0; c < pixels[r].length; c++) {
        if (pixels[r][c] === 'x') {
          ctx.fillRect(startX + c * pixelSize, startY + r * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }
  
  let dino = { x: 50, y: 100, width: 24 * 1.5, height: 26 * 1.5, dy: 0, gravity: 0.6, jumpPower: -10, isJumping: false, antiGrav: false };
  let obstacles = [];
  let score = 0;
  let gameLoopId;
  let frames = 0;
  let spawnTimer = 0;
  let hintShown = false;

  function jump() {
    if (!dino.isJumping && gameActive) {
      dino.dy = dino.jumpPower;
      dino.isJumping = true;
    }
  }

  const keyHandler = (e) => {
    if (!gameActive) return;
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      jump();
    }
    if (e.code === 'KeyS' && score >= 9500) {
      e.preventDefault();
      dino.antiGrav = true;
    }
  };

  const keyUpHandler = (e) => {
    if (e.code === 'KeyS') {
      dino.antiGrav = false;
    }
  };
  
  const touchHandler = (e) => {
    if (!gameActive) return;
    e.preventDefault();
    jump();
  };

  document.addEventListener('keydown', keyHandler);
  document.addEventListener('keyup', keyUpHandler);
  canvas.addEventListener('touchstart', touchHandler, { passive: false });
  canvas.addEventListener('mousedown', touchHandler);

  function drawDino() {
    drawSprite(dinoPixels, dino.x, dino.y, 1.5, '#555');
  }

  function drawObstacles() {
    obstacles.forEach(obs => {
      if (obs.type === 'crow') {
        drawSprite(crowPixels, obs.x, obs.y, 2, '#555');
      } else {
        drawSprite(cactusPixels, obs.x, obs.y, 2.5, '#4cd137');
      }
    });
  }

  function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '16px "JetBrains Mono"';
    ctx.fillText(`Score: ${Math.floor(score)}`, 450, 30);
  }

  function gameOver() {
    gameActive = false;
    cancelAnimationFrame(gameLoopId);
    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('keyup', keyUpHandler);
    canvas.removeEventListener('touchstart', touchHandler);
    canvas.removeEventListener('mousedown', touchHandler);
    inputLine.style.display = 'flex';
    if (window.innerWidth > CONFIG.mobileBreakpoint) {
      cmdInput.focus();
    }
    
    setTimeout(() => {
      let finalScoreText = `<span class="c-yellow">your score was : ${Math.floor(score)}</span>`;
      if (score >= 10000) {
        printOutput('', `<br>${finalScoreText}<br>🎉 <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="color:var(--accent-green); font-weight:bold; text-decoration:underline; font-size: 16px;">10 dollar giftcard</a> 🎉`);
      } else {
        printOutput('', `<br>${finalScoreText}<br><span class="c-red">You are not the chosen one I believe</span>`);
      }
    }, 500);
  }

  function update() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // dino physics
    if (dino.antiGrav) {
      dino.dy = 0;
      dino.y = 50; // Float high above obstacles
    } else {
      dino.dy += dino.gravity;
      dino.y += dino.dy;
    }
    
    if (dino.y + dino.height >= 130) {
      dino.y = 130 - dino.height;
      dino.dy = 0;
      dino.isJumping = false;
    }
    
    // Draw ground
    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.lineTo(600, 130);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Obstacles
    spawnTimer++;
    // hardcap the speed so it's actually winnable
    let currentSpeed = Math.min(12, 6 + (score / 2500));
    let spawnThreshold = Math.max(40, 90 - Math.floor(score / 150));
    
    if (spawnTimer >= spawnThreshold) {
      spawnTimer = 0;
      let isCrow = score > 2000 && Math.random() < 0.35;
      if (isCrow) {
        let crowY = Math.random() < 0.5 ? 90 : 60;
        obstacles.push({ x: 600, y: crowY, width: 28, height: 20, type: 'crow' });
      } else {
        obstacles.push({ x: 600, y: 130 - 35, width: 20, height: 35, type: 'cactus' });
      }
    }
    
    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i];
      obs.x -= currentSpeed;
      
      // Collision
      if (dino.x < obs.x + obs.width &&
          dino.x + dino.width - 10 > obs.x && // -10 hitbox leniency for tail
          dino.y < obs.y + obs.height &&
          dino.height + dino.y > obs.y) {
        drawDino();
        drawObstacles();
        gameOver();
        return;
      }
    }
    
    // Clean up passed obstacles
    obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

    let scoreIncrease = 10;
    if (score >= 8600) {
      let tier = Math.floor((score - 8600) / 200) + 1;
      scoreIncrease = 10 / Math.pow(2, tier);
      if (scoreIncrease < 0.005) {
        scoreIncrease = 0.005; // Absolute minimum bearable rate
      }
    }
    score += scoreIncrease;
    
    // Check for 9500 score hint
    if (score >= 9500 && !hintShown) {
      hintShown = true;
      printOutput('', `<span class="c-yellow c-bold">[SYSTEM OVERRIDE] Cheat Unlocked! Hold 'S' for Anti-Gravity! (Be careful, the floating crows can still hit you!)</span>`);
    }
    
    drawDino();
    drawObstacles();
    drawScore();
    
    frames++;
    gameLoopId = requestAnimationFrame(update);
  }
  
  update();
}

function startMeditation() {
  document.body.classList.add('meditate-mode');
  const block = document.createElement('div');
  block.className = 'output-block';
  block.innerHTML = `
    <div class="loading-bar-container">
      <div class="loading-bar-fill"></div>
      <div class="breathe-text">BREATHE</div>
    </div>
  `;
  termBody.insertBefore(block, inputLine);
  scrollToBottom();
  
  cmdInput.disabled = true;
  
  const fill = block.querySelector('.loading-bar-fill');
  const text = block.querySelector('.breathe-text');
  let progress = 0;
  
  fill.style.width = '0%';
  
  const interval = setInterval(() => {
    progress += 10;
    fill.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      achievements.unlock('zen', 'Achievement Unlocked', 'Zen Master');
      setTimeout(() => {
        document.body.classList.remove('meditate-mode');
        cmdInput.disabled = false;
        if (window.innerWidth > CONFIG.mobileBreakpoint) {
          cmdInput.focus();
        }
        text.style.animation = 'none';
        text.textContent = 'DONE';
        printOutput('', '<span class="c-green">Meditation complete. Mind cleared.</span>');
      }, 1000);
    }
  }, 1000);
}


// Initialize Lenis for smooth scrolling ONLY on larger devices to save performance
let lenis;
if (window.innerWidth > CONFIG.mobileBreakpoint) {
  lenis = new Lenis({
    lerp: 0.15,
    wheelMultiplier: 1.2,
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', (e) => {
    if (!isDraggingPiston) {
      updateScrollUI(e.progress);
    }
  });
} else {
  // Ultra-light mobile fallback
  lenis = {
    scrollTo: (target, options) => {
      const offset = options?.offset || 0;
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) window.scrollTo({ top: el.offsetTop + offset, behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    },
    on: () => {}
  };
  
  // Mobile needs a native scroll listener for scroll progress bar
  window.addEventListener('scroll', () => {
    if (!isDraggingPiston) {
      updateScrollUI();
    }
  }, { passive: true });
}

// --- Custom Scrollbar Logic ---
const pistonTrack = document.getElementById('custom-scrollbar-track');
const pistonHead = document.getElementById('piston-head');
const progressBar = document.getElementById('scroll-progress');

let isDraggingPiston = false;

let cachedInnerWidth = window.innerWidth;
let cachedWinHeight = window.innerHeight;
let cachedDocHeight = document.documentElement.scrollHeight;

function updateScrollMetrics() {
  cachedInnerWidth = window.innerWidth;
  cachedWinHeight = window.innerHeight;
  cachedDocHeight = document.documentElement.scrollHeight;
}
window.addEventListener('resize', updateScrollMetrics);
window.addEventListener('load', updateScrollMetrics);
// Delayed update to ensure fonts/images are loaded
setTimeout(updateScrollMetrics, 1000);

let isScrollUIUpdating = false;
function updateScrollUI(progress) {
  if (isScrollUIUpdating) return;
  isScrollUIUpdating = true;
  requestAnimationFrame(() => {
    _updateScrollUI(progress);
    isScrollUIUpdating = false;
  });
}

function _updateScrollUI(progress) {
  if (cachedInnerWidth <= CONFIG.mobileBreakpoint) return; // Disable custom scrollbar on mobile
  
  if (document.body.classList.contains('is-booting')) {
    progress = 0;
  } else {
    const height = cachedDocHeight - cachedWinHeight;
    const winScroll = window.scrollY;
    
    if (!isDraggingPiston && (height <= 0 || winScroll <= 0)) {
      progress = 0;
    } else if (!isDraggingPiston && winScroll >= height) {
      progress = 1;
    } else if (typeof progress === 'undefined' || isNaN(progress)) {
      progress = winScroll / height;
    }
  }
  
  progress = Math.max(0, Math.min(1, progress || 0));
  
  if (progressBar) {
    progressBar.style.width = `${progress * 100}%`;
  }
  
  if (pistonTrack && pistonHead) {
    // Avoid clientHeight reads to prevent forced synchronous layout (lag)
    // track height is calc(100vh - 8px), head height is 60px
    const maxTop = cachedWinHeight - 68;
    
    const currentTop = progress * maxTop;
    pistonHead.style.transform = `translate3d(0, ${currentTop}px, 0)`;
  }
}

// (Scroll listener is now handled in the lenis initialization block)

// Force correct UI on load
window.addEventListener('DOMContentLoaded', () => updateScrollUI());
window.addEventListener('load', () => updateScrollUI());
window.addEventListener('resize', () => updateScrollUI());

// Interactivity for piston drag
if (pistonHead && pistonTrack) {
  let startY, startProgress;
  
  pistonHead.addEventListener('mousedown', (e) => {
    if (window.innerWidth <= CONFIG.mobileBreakpoint) return; // Disable drag on mobile
    isDraggingPiston = true;
    startY = e.clientY;
    
    const height = document.documentElement.scrollHeight - window.innerHeight;
    startProgress = height > 0 ? window.scrollY / height : 0;
    
    document.body.style.userSelect = 'none';
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDraggingPiston) return;
    
    const maxTop = window.innerHeight - 68;
    const deltaY = e.clientY - startY;
    
    let newProgress = startProgress + (deltaY / maxTop);
    newProgress = Math.max(0, Math.min(1, newProgress));
    
    const targetScroll = newProgress * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'instant' });
    
    updateScrollUI(newProgress);
  });
  
  window.addEventListener('mouseup', () => {
    isDraggingPiston = false;
    document.body.style.userSelect = '';
  });
}

// scrollspy for navbar
const sections = document.querySelectorAll('.brutal-section');
const navLinks = document.querySelectorAll('.nav-btn');
let skillsTimer = null;

// Add smooth scrolling click event for all sidebar buttons
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    lenis.scrollTo(targetId, {
      offset: -100,
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4) // Quart Out easing for a snappy stop
    });
  });
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(() => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 250)) {
      current = section.getAttribute('id');
    }
  });
  
  if (current === 'skills') {
    if (!skillsTimer) {
      skillsTimer = setTimeout(() => {
        achievements.unlock('stalker', 'Achievement Unlocked', 'Tech Stalker');
      }, 5000);
    }
  } else {
    clearTimeout(skillsTimer);
    skillsTimer = null;
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, 50));
window.dispatchEvent(new Event('scroll'));

// btn interactions
function handleEmailClick(btn) {
  if (btn.dataset.state === "sent") return;
  const email = "anmol23sinha@gmail.com";
  
  if (btn.dataset.state === "confirm") {
    window.location.href = `mailto:${email}`;
    btn.dataset.state = "sent";
    btn.innerHTML = `✅ OPENING MAIL...`;
    btn.style.background = "var(--accent-green)";
    
    setTimeout(() => {
      resetEmailBtn(btn);
    }, 2500);
  } else {
    btn.dataset.originalHtml = btn.innerHTML;
    btn.dataset.originalBg = btn.style.background || "";
    
    btn.dataset.state = "confirm";
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" style="vertical-align:middle;margin-right:6px;"><path fill="#fbc531" stroke="#000" stroke-width="2" stroke-linejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> SEND A MAIL`;
    btn.style.background = "var(--bg-white)";
    
    btn.dataset.timeoutId = setTimeout(() => {
      if (btn.dataset.state === "confirm") {
        resetEmailBtn(btn);
      }
    }, 4000);
  }
}

function resetEmailBtn(btn) {
  if (btn.dataset.originalHtml) {
    btn.innerHTML = btn.dataset.originalHtml;
    btn.style.background = btn.dataset.originalBg;
  }
  btn.dataset.state = "";
  clearTimeout(btn.dataset.timeoutId);
}

document.getElementById('contact-btn-profile').addEventListener('click', function() { handleEmailClick(this); });
document.getElementById('contact-btn-main').addEventListener('click', function() { handleEmailClick(this); });

let resumeOriginalHtml = null;
document.getElementById('resume-btn').addEventListener('click', function() {
  if (this.dataset.loading === 'true') return;
  this.dataset.loading = 'true';
  
  if (!resumeOriginalHtml) resumeOriginalHtml = this.innerHTML;
  
  this.innerHTML = `⏳ COMING SOON...`;
  this.style.background = "var(--accent-yellow)";
  this.style.color = "var(--pure-black)";
  
  setTimeout(() => {
    this.innerHTML = resumeOriginalHtml;
    this.style.background = "";
    this.style.color = "";
    this.dataset.loading = 'false';
  }, 2500);
});

// profile flip
let flipCount = 0;
const profileFlipper = document.getElementById('profile-flipper');
document.getElementById('flip-to-stats-btn').addEventListener('click', () => {
  profileFlipper.classList.add('is-flipped');
  flipCount++;
  if (flipCount >= 3) {
    achievements.unlock('curious', 'Achievement Unlocked', 'Curious Mind');
  }
});
document.getElementById('flip-back-btn').addEventListener('click', () => {
  profileFlipper.classList.remove('is-flipped');
});

// typewriter text
const hiTextRaw = "Hi People, {NAME} this side";
const typeH1 = document.getElementById('typewriter-h1');
let typeIndex = 0;
let currentH1HTML = "";

const pTextRaw = `I write code, break things, and occasionally fix them. Currently doing that at [IIIT Bhopal].`;
const typeP = document.getElementById('typewriter-p');
let typeIndexP = 0;
let currentHTML = "";

function typeWriterP() {
  if (typeIndexP < pTextRaw.length) {
    let char = pTextRaw.charAt(typeIndexP);
    if (char === '[') {
      currentHTML += `<span class="hl">[`;
    } else if (char === ']') {
      currentHTML += `]</span>`;
    } else {
      currentHTML += char;
    }
    typeP.innerHTML = currentHTML;
    typeIndexP++;
    setTimeout(typeWriterP, 25);
  }
}

function typeWriter() {
  if (typeIndex < hiTextRaw.length) {
    if (hiTextRaw.substring(typeIndex, typeIndex + 6) === "{NAME}") {
      currentH1HTML += `<span class="name-swap"><span>Anmol</span><span>अनमोल</span></span>`;
      typeIndex += 6;
    } else {
      currentH1HTML += hiTextRaw.charAt(typeIndex);
      typeIndex++;
    }
    typeH1.innerHTML = currentH1HTML;
    setTimeout(typeWriter, 60);
  } else {
    setTimeout(typeWriterP, 300);
  }
}
window.addEventListener('load', typeWriter);

/* --- ENTRANCE ANIMATIONS (Intersection Observer) --- */
const ioOptions = {
  root: null,
  rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes into view
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('io-hidden');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, ioOptions);

document.querySelectorAll('.io-hidden').forEach(el => {
  observer.observe(el);
});

/* --- ACHIEVEMENT TOAST SYSTEM --- */
class AchievementManager {
  constructor() {
    let saved = '[]';
    try { saved = localStorage.getItem('portfolio_achievements') || '[]'; } catch(e) {}
    this.unlocked = JSON.parse(saved);
    this.container = document.getElementById('toast-container');
  }

  unlock(id, title, message) {
    if (this.unlocked.includes(id)) return;
    
    this.unlocked.push(id);
    try { localStorage.setItem('portfolio_achievements', JSON.stringify(this.unlocked)); } catch(e) {}
    
    if (!this.container) return; // safety check
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '🏆';
    if (id === 'hacker') icon = '💻';
    if (id === 'curious') icon = '🃏';
    if (id === 'zen') icon = '🧘‍♂️';
    if (id === 'completionist') icon = '👑';

    toast.innerHTML = `
      <div class="icon">${icon}</div>
      <div class="content">
        <div class="title">${title}</div>
        <div class="message">${message}</div>
      </div>
    `;
    
    this.container.appendChild(toast);
    
    // Remove toast from DOM after animation completes
    setTimeout(() => {
      if (this.container.contains(toast)) {
        toast.remove();
      }
    }, 5500);

    this.checkCompletionist();
  }

  checkCompletionist() {
    if (this.unlocked.length === 4 && !this.unlocked.includes('completionist')) {
      setTimeout(() => {
        this.unlock('completionist', 'Achievement Unlocked', 'The Completionist');
      }, 1500);
    }
  }
}

// Global initialization so it can be referenced in earlier code
window.achievements = new AchievementManager();
