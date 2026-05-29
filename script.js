// Prevent browser from restoring scroll position on page refresh
if ('scrollRestoration' in window.history) { window.history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// --- Update Navbar Date & Clock ---
const navDateEl = document.getElementById('nav-date');
const navClockEl = document.getElementById('nav-clock');

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
updateSidebarTime();
setInterval(updateSidebarTime, 1000);

// boot screen animation
window.addEventListener('load', () => {
  const bootSeq = document.getElementById('boot-sequence');
  if (!bootSeq) return;

  // Session Memory Check
  if (sessionStorage.getItem('hasBooted') === 'true') {
    bootSeq.style.display = 'none';
    bootSeq.remove();
    document.body.classList.remove('is-booting');
    window.dispatchEvent(new Event('scroll'));
    return; // instantly skip if already booted this session
  }

  const opt1 = document.getElementById('grub-opt-1');
  const opt2 = document.getElementById('grub-opt-2');
  const opt3 = document.getElementById('grub-opt-3');
  const grub = document.getElementById('boot-grub');
  const os = document.getElementById('boot-os');
  const skipBtn = document.getElementById('skip-boot-btn');

  let skipTimeout;
  
  function skipBoot() {
    clearTimeout(skipTimeout);
    sessionStorage.setItem('hasBooted', 'true');
    bootSeq.style.opacity = '0';
    setTimeout(() => {
      bootSeq.remove();
      document.body.classList.remove('is-booting');
      window.dispatchEvent(new Event('scroll'));
    }, 300);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', skipBoot);
  }

  // simulate arrow keys down
  setTimeout(() => {
    if (sessionStorage.getItem('hasBooted')) return;
    opt1.classList.remove('grub-active');
    opt2.classList.add('grub-active');
  }, 600);

  setTimeout(() => {
    if (sessionStorage.getItem('hasBooted')) return;
    opt2.classList.remove('grub-active');
    opt3.classList.add('grub-active');
  }, 800);

  // hit enter and show gui
  setTimeout(() => {
    if (sessionStorage.getItem('hasBooted')) return;
    grub.style.display = 'none';
    os.style.display = 'flex';
    skipBtn.style.color = '#fff'; // adjust button contrast against black bg
    skipBtn.style.background = '#000';
    skipBtn.style.borderColor = '#fff';
  }, 1300);

  // fade out automatically
  skipTimeout = setTimeout(() => {
    if (!sessionStorage.getItem('hasBooted')) skipBoot();
  }, 4300);
});

// terminal commands data
const portfolioData = {
  // ─── HELP ──────────────────────────────────────────────────────────
  "help": `
<span class="c-mauve c-bold">Available Commands</span> <span class="c-dim">──────────────</span>

  <span class="c-green">education</span>      <span class="c-dim">│</span>  University
  <span class="c-green">skills</span>         <span class="c-dim">│</span>  Tech stack
  <span class="c-green">specs</span>          <span class="c-dim">│</span>  Hardware & OS
  <span class="c-green">current_status</span> <span class="c-dim">│</span>  What I'm doing
  <span class="c-green">meditate</span>       <span class="c-dim">│</span>  Take a breather
  <span class="c-green">game</span>           <span class="c-dim">│</span>  Dino game
  <span class="c-green">sudo</span>           <span class="c-dim">│</span>  ???
  <span class="c-green">clear</span>          <span class="c-dim">│</span>  Clear terminal
  <span class="c-green">help</span>           <span class="c-dim">│</span>  Show this
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
  <span class="c-blue c-bold">Year</span>       <span class="c-dim">│</span> 1st Yr (Grad: 2029)

<span class="c-teal c-bold">  Performance:</span>
  <span class="c-dim">├──</span> 10th (CBSE): 99.4%
  <span class="c-dim">└──</span> 12th (CBSE): 86.4% <span class="c-red">(Crazy downfall ik!)</span>

<span class="c-teal c-bold">  Coursework:</span>
  <span class="c-dim">├──</span> DSA
  <span class="c-dim">├──</span> Discrete Mathematics
  <span class="c-dim">├──</span> Operating Systems
  <span class="c-dim">└──</span> Computer Networks
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

const WELCOME = `<span class="c-lavender c-bold"> Portfolio OS v1.0.0 (tty1)</span>
<span class="c-dim"> Type </span><span class="c-green">help</span><span class="c-dim"> to see available commands.</span>
`;
printOutput('', WELCOME);

document.querySelector('.terminal-card').addEventListener('click', (e) => {
  if (window.innerWidth > 900) {
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
      let players = JSON.parse(localStorage.getItem('dino_players') || '[]');
      players.push({ name: currentPlayer, date: new Date().toLocaleString() });
      localStorage.setItem('dino_players', JSON.stringify(players));
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

function printOutput(echoCmd, html) {
  const block = document.createElement('div');
  block.className = 'output-block';
  if (echoCmd) {
    block.innerHTML = `<div class="cmd-echo"><span class="prompt-prefix">root@anmol</span><span class="prompt-symbol">:~$</span> ${escapeHtml(echoCmd)}</div>` + html;
  } else {
    block.innerHTML = html;
  }
  termBody.insertBefore(block, inputLine);
  scrollToBottom();
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
  canvas.style.border = '2px solid var(--black)';
  canvas.style.background = '#fff';
  canvas.style.marginTop = '16px';
  canvas.style.borderRadius = '4px';
  canvas.style.boxShadow = '4px 4px 0 var(--black)';
  canvas.style.maxWidth = '100%';
  canvas.style.height = 'auto';
  
  const block = document.createElement('div');
  block.className = 'output-block';
  block.appendChild(canvas);
  termBody.insertBefore(block, inputLine);
  scrollToBottom();

  const ctx = canvas.getContext('2d');
  
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
    if (window.innerWidth > 900) {
      cmdInput.focus();
    }
    
    setTimeout(() => {
      let finalScoreText = `<span class="c-yellow">your score was : ${Math.floor(score)}</span>`;
      if (score >= 10000) {
        printOutput('', `<br>${finalScoreText}<br>🎉 <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="color:var(--btn-green); font-weight:bold; text-decoration:underline; font-size: 16px;">10 dollar giftcard</a> 🎉`);
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
        if (window.innerWidth > 900) {
          cmdInput.focus();
        }
        text.style.animation = 'none';
        text.textContent = 'DONE';
        printOutput('', '<span class="c-green">Meditation complete. Mind cleared.</span>');
      }, 1000);
    }
  }, 1000);
}


// scrollspy for navbar
const sections = document.querySelectorAll('.brutal-section');
const navLinks = document.querySelectorAll('.nav-btn');
let skillsTimer = null;

window.addEventListener('scroll', () => {
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
});
window.dispatchEvent(new Event('scroll'));

// btn interactions
function handleEmailClick(btn) {
  const email = "anmol23sinha@gmail.com";
  if (btn.dataset.state === "revealed") {
    navigator.clipboard.writeText(email).catch(err => console.error('Clipboard copy failed:', err));
    const previousHtml = btn.innerHTML;
    btn.innerHTML = `✅ Copied!`;
    btn.style.background = "var(--btn-green)";
    setTimeout(() => {
      btn.innerHTML = previousHtml;
      btn.style.background = "";
    }, 2000);
  } else {
    btn.dataset.state = "revealed";
    btn.innerHTML = `${email} <span style="font-size:18px; margin-left:6px;" title="Copy to clipboard">📋</span>`;
  }
}

document.getElementById('contact-btn-profile').addEventListener('click', function() { handleEmailClick(this); });
document.getElementById('contact-btn-main').addEventListener('click', function() { handleEmailClick(this); });

document.getElementById('resume-btn').addEventListener('click', () => {
  const popup = document.getElementById('error-popup');
  popup.style.display = 'block';
  popup.style.animation = 'none'; 
  void popup.offsetWidth; // trigger reflow to restart animation
  popup.style.animation = 'shake 0.3s ease-in-out';
  setTimeout(() => popup.style.display = 'none', 3000);
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
const hiText = "Hi people! 👋";
const typeH1 = document.getElementById('typewriter-h1');
let typeIndex = 0;

const pTextRaw = `I'm [Anmol]. I write code, break things, and occasionally fix them. Currently doing that at [IIIT Bhopal].`;
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
  if (typeIndex < hiText.length) {
    if (hiText.codePointAt(typeIndex) > 0xFFFF) {
      typeH1.textContent += String.fromCodePoint(hiText.codePointAt(typeIndex));
      typeIndex += 2;
    } else {
      typeH1.textContent += hiText.charAt(typeIndex);
      typeIndex++;
    }
    setTimeout(typeWriter, 80);
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
    this.unlocked = JSON.parse(localStorage.getItem('portfolio_achievements') || '[]');
    this.container = document.getElementById('toast-container');
  }

  unlock(id, title, message) {
    if (this.unlocked.includes(id)) return;
    
    this.unlocked.push(id);
    localStorage.setItem('portfolio_achievements', JSON.stringify(this.unlocked));
    
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
