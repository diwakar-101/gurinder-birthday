/**
 * GURINDER'S BIRTHDAY CELEBRATION
 * Interactive Script: Subtle Ambient Sparkles, Event-Driven Confetti,
 * Web Audio Synthesizer with 3 Melodies, Boop Station, Gift Unboxer,
 * Wish Wall, Password Vault, and Cake Candle Blow.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (No external audio file dependencies)
     ========================================================================== */
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicTimer = null;
  let currentVibe = 'bday'; // 'bday', 'stadium', 'nawab'
  let noteIndex = 0;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.4, gainLevel = 0.12) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error', e);
    }
  }

  // Melodies
  const bdayMelody = [
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.6 },
    { f: 261.63, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 1.0 },
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.6 },
    { f: 261.63, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.0 },
    { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.3 }, { f: 523.25, d: 0.6 },
    { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 0.6 },
    { f: 293.66, d: 1.0 }, { f: 466.16, d: 0.3 }, { f: 466.16, d: 0.3 },
    { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 392.00, d: 0.6 },
    { f: 349.23, d: 1.4 }
  ];

  const stadiumMelody = [
    { f: 392.00, d: 0.2 }, { f: 523.25, d: 0.2 }, { f: 659.25, d: 0.25 },
    { f: 783.99, d: 0.35 }, { f: 659.25, d: 0.2 }, { f: 783.99, d: 0.4 },
    { f: 587.33, d: 0.25 }, { f: 659.25, d: 0.25 }, { f: 523.25, d: 0.5 }
  ];

  const nawabMelody = [
    { f: 523.25, d: 0.5 }, { f: 587.33, d: 0.5 }, { f: 659.25, d: 0.8 },
    { f: 587.33, d: 0.5 }, { f: 523.25, d: 0.8 }, { f: 392.00, d: 0.6 },
    { f: 440.00, d: 0.6 }, { f: 523.25, d: 1.2 }
  ];

  function playNextMelodyNote() {
    if (!isMusicPlaying) return;
    let playlist = bdayMelody;
    let oscType = 'triangle';
    if (currentVibe === 'stadium' || currentVibe === 'runner') {
      playlist = stadiumMelody;
      oscType = 'triangle';
    } else if (currentVibe === 'nawab') {
      playlist = nawabMelody;
      oscType = 'sine';
    }

    const note = playlist[noteIndex % playlist.length];
    playTone(note.f, oscType, note.d * 1.1, 0.14);

    noteIndex++;
    const delay = note.d * 1000 * 0.95;
    musicTimer = setTimeout(playNextMelodyNote, delay);
  }

  // Sound FX Functions
  function playUnlockFanfare() {
    initAudio();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'sine', 0.8, 0.2), idx * 110);
    });
  }

  function playBlowSound() {
    initAudio();
    playTone(440, 'sine', 0.15, 0.08);
    playTone(587.33, 'triangle', 0.3, 0.12);
    playTone(880, 'sine', 0.5, 0.16);
  }

  function playBoopSound() {
    initAudio();
    playTone(784, 'sine', 0.08, 0.15);
    setTimeout(() => playTone(1046.5, 'triangle', 0.15, 0.18), 70);
  }

  function playGiftOpenSound() {
    initAudio();
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.5, 0.18), idx * 90);
    });
  }

  // Music Controller Setup
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');

  musicToggleBtn.addEventListener('click', () => {
    initAudio();
    if (!isMusicPlaying) {
      isMusicPlaying = true;
      musicToggleBtn.classList.add('playing');
      musicIcon.textContent = '⏸️';
      musicLabel.textContent = 'Pause Music';
      playNextMelodyNote();
    } else {
      isMusicPlaying = false;
      clearTimeout(musicTimer);
      musicToggleBtn.classList.remove('playing');
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Play Music';
    }
  });

  // Mobile Friendly Vibe Menu Trigger
  const vibeMenuTrigger = document.getElementById('vibeMenuTrigger');
  const vibeSelectorMenu = document.getElementById('vibeSelectorMenu');

  if (vibeMenuTrigger && vibeSelectorMenu) {
    vibeMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      vibeSelectorMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!vibeSelectorMenu.contains(e.target) && !vibeMenuTrigger.contains(e.target)) {
        vibeSelectorMenu.classList.remove('show');
      }
    });
  }

  // Vibe Selector buttons
  const vibeButtons = document.querySelectorAll('.vibe-btn');
  vibeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      vibeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVibe = btn.dataset.vibe;
      noteIndex = 0;
      clearTimeout(musicTimer);
      if (vibeSelectorMenu) vibeSelectorMenu.classList.remove('show');
      if (!isMusicPlaying) {
        isMusicPlaying = true;
        musicToggleBtn.classList.add('playing');
        musicIcon.textContent = '⏸️';
        musicLabel.textContent = 'Pause Music';
      }
      playNextMelodyNote();
    });
  });


  /* ==========================================================================
     2. GENTLE AMBIENT SPARKLES & EVENT-DRIVEN CONFETTI
     (Fixed: Reduced from 45 chunky fast particles to 10 soft, slow fairy dust)
     ========================================================================== */
  const canvas = document.getElementById('celebration-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const celebrationColors = [
    '#F7D070', '#FF6B8B', '#FF8E53', '#00F2FE', '#FFF1C5', '#B388FF'
  ];

  class Particle {
    constructor(x, y, isBurst = false) {
      this.isBurst = isBurst;
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : (isBurst ? height / 2 : Math.random() * height);

      if (isBurst) {
        // Vibrant celebration confetti on click/events
        this.size = Math.random() * 7 + 5;
        this.color = celebrationColors[Math.floor(Math.random() * celebrationColors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 11 + 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 6;
        this.opacity = 1;
        this.decay = Math.random() * 0.009 + 0.005;
        this.symbol = Math.random() < 0.15 ? '🐾' : null;
      } else {
        // Soft, gentle ambient fairy-dust star
        this.size = Math.random() * 2.5 + 1.5;
        this.color = '#F7D070';
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.35 + 0.15); // gentle upward drift
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.decay = 0;
        this.symbol = null;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.isBurst) {
        this.vy += 0.07; // gravity for burst confetti
        this.rotation += this.rotationSpeed;
        this.opacity -= this.decay;
      } else {
        // Ambient soft stars wrap gently around screen
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.translate(this.x, this.y);

      if (this.isBurst) {
        ctx.rotate((this.rotation * Math.PI) / 180);
        if (this.symbol) {
          ctx.font = `${this.size * 1.5}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.symbol, 0, 0);
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.3);
        }
      } else {
        // Soft glowing circular fairy star
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffe599';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Only 12 very subtle, calm ambient fairy-dust particles (not distracting)
  for (let i = 0; i < 12; i++) {
    particles.push(new Particle());
  }

  function launchConfetti(count = 80, x = width / 2, y = height / 2) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, true));
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();

      if (p.isBurst && p.opacity <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // Throw Confetti Button
  const burstConfettiBtn = document.getElementById('burstConfettiBtn');
  burstConfettiBtn.addEventListener('click', (e) => {
    initAudio();
    playTone(523.25, 'sine', 0.2, 0.15);
    playTone(659.25, 'sine', 0.3, 0.15);
    launchConfetti(80, e.clientX || width / 2, e.clientY || height / 2);
  });


  /* ==========================================================================
     3. NAWAB'S NOSE BOOP & JOY METER
     ========================================================================== */
  let boopCount = 0;
  let nawabJoy = 75;
  const boopBtn = document.getElementById('boopBtn');
  const boopCountBadge = document.getElementById('boopCountBadge');
  const progressFill = document.getElementById('progressFill');
  const meterStatus = document.getElementById('meterStatus');
  const nawabSpeech = document.getElementById('nawabSpeech');
  const nawabPhoto = document.getElementById('nawabPhoto');

  const boopMessages = [
    '"Hehe! Nawab\'s tail is wagging at 200 RPM! 🐾"',
    '"Boop received! Nawab\'s ears perked up with pure joy! 🐕"',
    '"Nawab rolled onto his back asking Dad for belly rubs! 🥰"',
    '"A big wet nose boop right back to Dad Gurinder! 🐶💋"',
    '"Nawab officially declares Gurinder the Best Dog Dad in the Galaxy! 👑✨"'
  ];

  if (boopBtn) {
    boopBtn.addEventListener('click', (e) => {
      boopCount++;
      playBoopSound();
      boopCountBadge.textContent = `${boopCount} Boop${boopCount === 1 ? '' : 's'}`;
      
      const msg = boopMessages[(boopCount - 1) % boopMessages.length];
      nawabSpeech.innerHTML = msg;

      // Photo wiggle
      nawabPhoto.style.transform = 'scale(1.08) rotate(4deg)';
      nawabPhoto.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        nawabPhoto.style.transform = 'scale(1) rotate(0deg)';
      }, 250);

      // Mini sparkle burst from button
      const rect = boopBtn.getBoundingClientRect();
      launchConfetti(25, rect.left + rect.width / 2, rect.top);
    });
  }

  function updateNawabJoy(gain, message, statusText) {
    initAudio();
    playTone(392, 'sine', 0.1, 0.15);
    setTimeout(() => playTone(587.33, 'triangle', 0.2, 0.18), 100);

    nawabJoy = Math.min(100, nawabJoy + gain);
    progressFill.style.width = `${nawabJoy}%`;
    meterStatus.textContent = statusText;
    nawabSpeech.innerHTML = message;

    nawabPhoto.style.transform = 'scale(1.06) rotate(-3deg)';
    setTimeout(() => {
      nawabPhoto.style.transform = 'scale(1) rotate(0deg)';
    }, 250);

    if (nawabJoy >= 100) {
      launchConfetti(60, window.innerWidth * 0.3, window.innerHeight * 0.6);
    }
  }

  const btnTreat = document.getElementById('btnTreat');
  if (btnTreat) {
    btnTreat.addEventListener('click', () => {
      updateNawabJoy(15, '🦴 <em>"CRUNCH CRUNCH! Best bone treat ever! Dad Gurinder is #1!"</em>', 'Full & Delighted! 🐶🦴');
    });
  }

  const btnBall = document.getElementById('btnBall');
  if (btnBall) {
    btnBall.addEventListener('click', () => {
      updateNawabJoy(20, '🏏 <em>"I caught the cricket ball! Nawab is the best fielder for his dad! ZOOMIES ACTIVATED!"</em>', 'Fielding Zoomies! ⚡🐕');
    });
  }

  const btnFootball = document.getElementById('btnFootball') || document.getElementById('btnScratches');
  if (btnFootball) {
    btnFootball.addEventListener('click', () => {
      updateNawabJoy(25, '⚽ <em>"*Dribbles ball with nose* GOLAZO! Dad Gurinder & Nawab win the Championship Cup!"</em>', 'World Cup Champions! 🏆⚽');
    });
  }


  /* ==========================================================================
     4. VIRTUAL BIRTHDAY GIFT UNBOXER
     ========================================================================== */
  const giftBox = document.getElementById('giftBox');
  const vouchersReveal = document.getElementById('vouchersReveal');
  let giftOpened = false;

  if (giftBox) {
    giftBox.addEventListener('click', () => {
      if (giftOpened) return;
      giftOpened = true;
      giftBox.classList.add('opened');
      playGiftOpenSound();

      const rect = giftBox.getBoundingClientRect();
      launchConfetti(90, rect.left + rect.width / 2, rect.top);

      setTimeout(() => {
        vouchersReveal.style.display = 'block';
        vouchersReveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);
    });
  }


  /* ==========================================================================
     5. INTERACTIVE WISH WALL (Add a Note)
     ========================================================================== */
  const postNoteBtn = document.getElementById('postNoteBtn');
  const noteAuthorInput = document.getElementById('noteAuthorInput');
  const noteTextInput = document.getElementById('noteTextInput');
  const wishNotesGrid = document.getElementById('wishNotesGrid');

  const noteColors = ['note-yellow', 'note-pink', 'note-cyan', 'note-orange'];

  if (postNoteBtn) {
    postNoteBtn.addEventListener('click', () => {
      const author = noteAuthorInput.value.trim() || 'A Dear Friend';
      const text = noteTextInput.value.trim();

      if (!text) {
        noteTextInput.focus();
        return;
      }

      initAudio();
      playTone(659.25, 'triangle', 0.2, 0.15);

      const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      const randomRot = (Math.random() * 4 - 2).toFixed(1);

      const noteElem = document.createElement('div');
      noteElem.className = `sticky-note ${randomColor}`;
      noteElem.style.transform = `rotate(${randomRot}deg)`;
      noteElem.innerHTML = `
        <span class="pin">📌</span>
        <p class="note-text">"${text}"</p>
        <span class="note-author">— ${author} ✨</span>
      `;

      wishNotesGrid.prepend(noteElem);
      launchConfetti(30, window.innerWidth / 2, window.innerHeight * 0.7);

      noteAuthorInput.value = '';
      noteTextInput.value = '';
    });
  }


  /* ==========================================================================
     6. PASSWORD PROTECTED VAULT & LETTER REVEAL
     ========================================================================== */
  const passwordForm = document.getElementById('passwordForm');
  const vaultInput = document.getElementById('vaultPasswordInput');
  const unlockBtn = document.getElementById('unlockBtn');
  const vaultFeedback = document.getElementById('vaultFeedback');
  const padlock = document.getElementById('padlockGraphic');
  const vaultLockbox = document.getElementById('vaultLockbox');
  const letterRevealContainer = document.getElementById('letterRevealContainer');

  function handleVaultUnlock() {
    const rawInput = vaultInput.value;
    const normalizedInput = rawInput.trim().toLowerCase();

    // Required Password: "nawab" or "Nawab"
    if (normalizedInput === 'nawab') {
      vaultFeedback.className = 'vault-feedback success';
      vaultFeedback.innerHTML = '✨ <strong>Access Granted!</strong> Welcome, Gurinder & his boy Nawab! 🐾';
      padlock.classList.add('unlocked');
      
      playUnlockFanfare();
      launchConfetti(120, window.innerWidth / 2, window.innerHeight * 0.6);

      setTimeout(() => {
        vaultLockbox.style.opacity = '0';
        vaultLockbox.style.transform = 'scale(0.95)';
        vaultLockbox.style.transition = 'all 0.5s ease';

        setTimeout(() => {
          vaultLockbox.style.display = 'none';
          letterRevealContainer.style.display = 'block';
          letterRevealContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          launchConfetti(60);
        }, 500);
      }, 700);

    } else {
      initAudio();
      playTone(180, 'sawtooth', 0.25, 0.15);
      
      vaultFeedback.className = 'vault-feedback error';
      vaultFeedback.innerHTML = '❌ <em>Woof! That is not his royal name! Hint: Gurinder’s crowned pup! (Nawab) 🐕</em>';

      vaultLockbox.style.animation = 'none';
      void vaultLockbox.offsetWidth;
      vaultLockbox.style.animation = 'shake 0.4s ease';

      vaultInput.focus();
      vaultInput.select();
    }
  }

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleVaultUnlock();
  });

  unlockBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleVaultUnlock();
  });

  document.getElementById('printLetterBtn').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('cheerVaultBtn').addEventListener('click', (e) => {
    initAudio();
    playTone(783.99, 'sine', 0.3, 0.2);
    launchConfetti(80, e.clientX || width / 2, e.clientY || height / 2);
  });


  /* ==========================================================================
     7. INTERACTIVE BIRTHDAY CAKE & BLOWING CANDLES
     ========================================================================== */
  const cakeWrapper = document.getElementById('cakeWrapper');
  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3')
  ];
  const smokes = [
    document.getElementById('smoke1'),
    document.getElementById('smoke2'),
    document.getElementById('smoke3')
  ];
  const wishStatusBox = document.getElementById('wishStatusBox');
  let candlesBlown = false;

  cakeWrapper.addEventListener('click', () => {
    if (candlesBlown) {
      candlesBlown = false;
      flames.forEach(flame => flame.classList.remove('extinguished'));
      smokes.forEach(smoke => smoke.classList.remove('active'));
      wishStatusBox.innerHTML = '<p class="wish-instruction">🔥 Candles lit! Click again whenever you want to make another wish!</p>';
      playTone(523.25, 'sine', 0.15, 0.15);
      return;
    }

    candlesBlown = true;
    playBlowSound();

    flames.forEach(flame => flame.classList.add('extinguished'));
    smokes.forEach(smoke => smoke.classList.add('active'));

    wishStatusBox.innerHTML = `
      <div class="wish-granted">
        🎂✨ <strong>Wish Granted, Champion Gurinder!</strong> ✨🎂
        <div style="font-size: 1rem; color: #fff; font-weight: 500; margin-top: 6px;">
          May this year bring match-winning sixes, top-corner golazos, and infinite tail-wags with your boy Nawab!
        </div>
      </div>
    `;

    const rect = cakeWrapper.getBoundingClientRect();
    launchConfetti(100, rect.left + rect.width / 2, rect.top + rect.height / 3);
  });


  /* ==========================================================================
     8. ATHLETE, SPORTSMAN & DOG-DAD AFFIRMATIONS DISPENSER
     ========================================================================== */
  const affirmations = [
    "\"Hit life's curveballs straight over the boundary ropes for a six!\"",
    "\"To Nawab, you're the GOAT dog dad. To your crew, an absolute legend!\"",
    "\"Precision of a striker on the pitch, heart of gold at home with your boy.\"",
    "\"May your bat swing clean, your strikes find the net, and your belly-rub supply for Nawab stay endless!\"",
    "\"True champions aren't defined by easy days—they're built on dedication and heart, just like Gurinder!\"",
    "\"Nawab voted, and it's unanimous: You are the greatest dog-dad in the galaxy! 🐾🏆\""
  ];

  let currentAffirmationIdx = 0;
  const cheerQuote = document.getElementById('cheerQuote');
  const nextCheerBtn = document.getElementById('nextCheerBtn');

  nextCheerBtn.addEventListener('click', () => {
    initAudio();
    playTone(659.25, 'triangle', 0.2, 0.15);
    currentAffirmationIdx = (currentAffirmationIdx + 1) % affirmations.length;
    cheerQuote.style.opacity = '0';
    setTimeout(() => {
      cheerQuote.textContent = affirmations[currentAffirmationIdx];
      cheerQuote.style.opacity = '1';
      cheerQuote.style.transition = 'opacity 0.3s ease';
    }, 200);
  });


  /* ==========================================================================
     9. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileMenuToggle.classList.toggle('open', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when tapping any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuToggle.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        mobileMenuToggle.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
