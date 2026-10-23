/**
 * GLITCHES AND GIGGLES - THE WORST UI/UX CHALLENGE
 * Interactive Experience Engine
 * Google Developer Groups (GDG)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initCountdown();
  initCardTilt();
  initStickyDock();
  initModals();
  initFaqAccordion();
  initPlaygroundWidgets();
  initChaosMode();
  initMobileMenu();
  initBookmark();
});

/* ==========================================================================
   1. WEB AUDIO API SYNTHESIZER (NO EXTERNAL AUDIO ASSETS NEEDED)
   ========================================================================== */

let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  const toggleBtn = document.getElementById('sfx-toggle');
  const icon = document.getElementById('sfx-icon');

  toggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    icon.textContent = soundEnabled ? '🔊' : '🔇';
    toggleBtn.title = soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX';
    if (soundEnabled) playSynthSound('click');
  });
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'glitch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.setValueAtTime(800, now + 0.03);
      osc.frequency.setValueAtTime(220, now + 0.07);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'chaos') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
}

// Add click sounds to all interactive elements
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a, .quick-pill, .captcha-tile')) {
    playSynthSound('click');
  }
});

/* ==========================================================================
   2. COUNTDOWN TIMER (2 NOV 2026)
   ========================================================================== */

function initCountdown() {
  const targetDate = new Date('2026-11-02T10:00:00+05:30').getTime();
  const display = document.getElementById('countdown-display');
  if (!display) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      display.textContent = 'EVENT IN SESSION! 🚀';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    display.textContent = `${days}D : ${String(hours).padStart(2, '0')}H : ${String(mins).padStart(2, '0')}M : ${String(secs).padStart(2, '0')}S`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. 3D CARD TILT ON MOUSE MOVE
   ========================================================================== */

function initCardTilt() {
  const card = document.getElementById('hero-card');
  if (!card) return;

  const wrapper = card.parentElement;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/* ==========================================================================
   4. STICKY DOCK BAR
   ========================================================================== */

function initStickyDock() {
  const dock = document.getElementById('sticky-dock');
  const hero = document.getElementById('hero');
  if (!dock || !hero) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      dock.classList.add('visible');
    } else {
      dock.classList.remove('visible');
    }
  });
}

/* ==========================================================================
   5. MODAL SYSTEM (BRIEF & FAQS)
   ========================================================================== */

function initModals() {
  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });

  // Close when clicking on backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    playSynthSound('glitch');
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */

function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close other accordions for sleek single-open view
      questions.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE BAD UX PLAYGROUND (CHAOS LAB)
   ========================================================================== */

function initPlaygroundWidgets() {
  // Widget 1: Evasive Button
  const arena = document.getElementById('evasive-arena');
  const evasiveBtn = document.getElementById('evasive-btn');
  const feedback = document.getElementById('evasive-feedback');
  let tries = 0;
  let catches = 0;

  if (arena && evasiveBtn) {
    function flee() {
      tries++;
      feedback.textContent = `Tries: ${tries} | Catches: ${catches} (Good luck catching it!)`;
      playSynthSound('glitch');

      const arenaRect = arena.getBoundingClientRect();
      const btnRect = evasiveBtn.getBoundingClientRect();

      const maxX = arenaRect.width - btnRect.width - 20;
      const maxY = arenaRect.height - btnRect.height - 20;

      const randomX = Math.max(10, Math.floor(Math.random() * maxX));
      const randomY = Math.max(10, Math.floor(Math.random() * maxY));

      evasiveBtn.style.left = `${randomX}px`;
      evasiveBtn.style.top = `${randomY}px`;
    }

    evasiveBtn.addEventListener('mouseenter', flee);
    evasiveBtn.addEventListener('click', (e) => {
      catches++;
      feedback.textContent = `Tries: ${tries} | Catches: ${catches} - IMPOSSIBLE! You broke physics!`;
      playSynthSound('success');
      alert('🎉 INCREDIBLE! You caught the coward button! But the reward was a coupon for free oxygen.');
      flee();
    });
  }

  // Widget 2: Catastrophic Slider
  const slider = document.getElementById('chaos-slider');
  const sliderVal = document.getElementById('slider-val');
  const sliderApprox = document.getElementById('slider-approx');
  const scrambleBtn = document.getElementById('scramble-slider-btn');

  const descriptions = [
    { max: 10, label: 'Whisper of a Ghost' },
    { max: 25, label: 'Muffled Library Sneeze' },
    { max: 50, label: 'Acceptable Dialogue' },
    { max: 68, label: 'Loud TV Commercial' },
    { max: 69, label: 'PERFECTION (NICE)' },
    { max: 85, label: 'Jet Engine Inside Bedroom' },
    { max: 100, label: 'Eardrum Liquefier 3000' }
  ];

  if (slider) {
    slider.addEventListener('input', () => {
      let val = parseInt(slider.value, 10);

      // Evil mechanic: It refuses to stay at 69
      if (val === 69 && Math.random() > 0.3) {
        val = Math.random() > 0.5 ? 68 : 70;
        slider.value = val;
      }

      sliderVal.textContent = `${val}%`;
      const desc = descriptions.find(d => val <= d.max) || { label: 'Deafening' };
      sliderApprox.textContent = desc.label;
    });

    if (scrambleBtn) {
      scrambleBtn.addEventListener('click', () => {
        playSynthSound('glitch');
        slider.min = Math.floor(Math.random() * 20);
        slider.max = Math.floor(Math.random() * 80) + 100;
        slider.value = Math.floor(Math.random() * 50);
        sliderVal.textContent = `${slider.value}% (Scale: ${slider.min}-${slider.max})`;
        sliderApprox.textContent = 'Chaos Injected!';
      });
    }
  }

  // Widget 3: Impossible Password Validator
  const pwdInput = document.getElementById('chaos-pwd-input');
  const reqRoman = document.getElementById('req-roman');
  const reqFood = document.getElementById('req-food');
  const reqLength = document.getElementById('req-length');
  const reqMath = document.getElementById('req-math');

  function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  if (pwdInput) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;

      // Roman Numeral check (I, V, X, L, C, D, M)
      const hasRoman = /[IVXLCDM]/.test(val);
      updateReq(reqRoman, hasRoman, 'Contains Roman numeral', 'Must contain a Roman numeral (e.g. IV, XII)');

      // Indian sweet check
      const sweets = ['gulabjamun', 'jalebi', 'ladoo', 'kaju', 'barfi', 'rasgulla', 'halwa', 'pedha'];
      const hasSweet = sweets.some(s => val.toLowerCase().includes(s));
      updateReq(reqFood, hasSweet, 'Contains verified sweet treat', 'Must contain the name of an Indian sweet (e.g. gulabjamun)');

      // Prime length check
      const prime = isPrime(val.length);
      updateReq(reqLength, prime, `Length (${val.length}) is prime!`, `Must be a prime number of chars (Current: ${val.length})`);

      // Digits sum to 42
      const digits = val.match(/\d/g);
      const sum = digits ? digits.reduce((acc, d) => acc + parseInt(d, 10), 0) : 0;
      updateReq(reqMath, sum === 42, 'Digits sum to 42 (The Answer!)', `Digits must sum to 42 (Current sum: ${sum})`);
    });
  }

  function updateReq(el, isValid, goodText, badText) {
    if (!el) return;
    if (isValid) {
      el.className = 'good';
      el.textContent = `✅ ${goodText}`;
    } else {
      el.className = 'bad';
      el.textContent = `❌ ${badText}`;
    }
  }

  // Widget 4: Existential CAPTCHA
  const tiles = document.querySelectorAll('.captcha-tile');
  const verifyBtn = document.getElementById('captcha-verify-btn');
  const captchaFeedback = document.getElementById('captcha-feedback');

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      tile.classList.toggle('selected');
    });
  });

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const selected = document.querySelectorAll('.captcha-tile.selected').length;
      playSynthSound('glitch');
      if (selected === 0) {
        captchaFeedback.textContent = '❌ You must select at least one form of quiet despair.';
      } else if (selected === 4) {
        captchaFeedback.textContent = '⚠️ Overdose of pessimism detected. Please relax and hydrate.';
      } else {
        captchaFeedback.textContent = '✅ Verified: You possess the soul of a true frontend engineer.';
      }
    });
  }
}

/* ==========================================================================
   8. CHAOS MODE TOGGLE (EASTER EGG & BAD UX PREVIEW)
   ========================================================================== */

function initChaosMode() {
  const toggle = document.getElementById('chaos-mode-toggle');
  const status = document.getElementById('chaos-status');
  const cardIndicator = document.getElementById('card-chaos-indicator');
  let active = false;

  const badPopups = [
    '⚠️ ALERT: You have clicked a button. Are you sure you meant to click it?',
    '🎉 YOU ARE THE 1,000,000TH VISITOR! Click here to download 16GB more RAM.',
    '💾 WARNING: Your mouse pointer is losing battery! Please shake vigorously.',
    '🚨 CRITICAL SYSTEM NOTICE: Good design has been temporarily banned.'
  ];

  if (toggle) {
    toggle.addEventListener('click', () => {
      active = !active;
      status.textContent = active ? 'ON 🔥' : 'OFF';
      document.body.classList.toggle('chaos-mode-active', active);

      if (active) {
        playSynthSound('chaos');
        spawnChaosPopup(badPopups[Math.floor(Math.random() * badPopups.length)]);
      } else {
        playSynthSound('success');
        removeChaosPopups();
      }
    });
  }
}

function spawnChaosPopup(text) {
  removeChaosPopups();
  const popup = document.createElement('div');
  popup.className = 'chaos-popup-alert';
  popup.innerHTML = `
    <strong>⚠️ SYSTEM CHAOS POPUP</strong>
    <p>${text}</p>
    <button onclick="this.parentElement.remove()">Dismiss At Your Own Risk</button>
  `;
  document.body.appendChild(popup);
}

function removeChaosPopups() {
  document.querySelectorAll('.chaos-popup-alert').forEach(p => p.remove());
}

/* ==========================================================================
   9. MOBILE MENU
   ========================================================================== */

function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
  }
}

window.closeMobileMenu = function() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.remove('open');
  }
};

/* ==========================================================================
   10. BOOKMARK BUTTON
   ========================================================================== */

function initBookmark() {
  const btn = document.getElementById('bookmark-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('saved');
    const isSaved = btn.classList.contains('saved');
    playSynthSound(isSaved ? 'success' : 'click');
    btn.title = isSaved ? 'Event Bookmarked!' : 'Save Event';
    
    // Quick micro feedback
    const originalSvg = btn.innerHTML;
    btn.innerHTML = isSaved ? '✓' : originalSvg;
    setTimeout(() => {
      btn.innerHTML = originalSvg;
    }, 1200);
  });
}
