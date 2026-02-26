const RosaryApp = (() => {
  'use strict';

  // COLOQUE AQUI O LINK DA SUA API OU ARQUIVO JSON
  const API_URL = 'https://raw.githubusercontent.com/danielson-alencar/tercomariano/refs/heads/main/api.json'; 

  // Variáveis vazias que serão preenchidas pela API
  let PRAYERS = {};
  let MYSTERIES_DB = {};
  let isDataLoaded = false;

  const MODELS = {
    classico: { s: ['#00c6ff', '#002244'], l: ['#ff4b1f', '#660000'] },
    perola: { s: ['#fcfcfc', '#b0b0b0'], l: ['#e6c200', '#b8860b'] },
    madeira: { s: ['#deb887', '#8b4513'], l: ['#a0522d', '#5c4033'] },
    rosa: { s: ['#ffb6c1', '#ff69b4'], l: ['#ff1493', '#8b0000'] },
    noturno: { s: ['#7f8c8d', '#2c3e50'], l: ['#95a5a6', '#000000'] }
  };

  let currentStep = -1, currentMysteryType = 'auto', rosaryStructure = [], beadElementsList = [], stepToElementMap = [], els = {};
  let wakeLock = null;
  let currentFontSize = 1.2;

  const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

  async function init() {
    els = {
      container: document.querySelector('.app-container'),
      rosaryPane: document.getElementById('rosary-pane'),
      svg: document.getElementById('rosary-svg'),
      path: document.getElementById('rosary-string'),
      date: document.getElementById('date-display'),
      mystery: document.getElementById('mystery-display'),
      label: document.getElementById('label-display'),
      text: document.getElementById('text-display'),
      scroll: document.getElementById('prayer-scroll-area'),
      progress: document.getElementById('progress-fill'),
      progressText: document.getElementById('progress-text'),
      btnNext: document.getElementById('btn-next'),
      btnPrev: document.getElementById('btn-prev'),
      themeBtn: document.getElementById('theme-toggle'),
      themeIcon: document.getElementById('theme-icon'),
      menuBtn: document.getElementById('menu-toggle'),
      modelBtn: document.getElementById('model-toggle'),
      modalAbout: document.getElementById('modal-about'),
      modalSelection: document.getElementById('modal-selection'),
      modalModels: document.getElementById('modal-models'),
      modalRestart: document.getElementById('modal-restart'),
      textPane: document.getElementById('text-pane'),
      stopS1: document.getElementById('stop-small-1'),
      stopS2: document.getElementById('stop-small-2'),
      stopL1: document.getElementById('stop-large-1'),
      stopL2: document.getElementById('stop-large-2'),
      btnResume: document.getElementById('btn-resume'),
      fontBtn: document.getElementById('font-toggle'),
      fontPanel: document.getElementById('font-control-panel'),
      fontMinus: document.getElementById('btn-font-minus'),
      fontPlus: document.getElementById('btn-font-plus'),
      fontClose: document.getElementById('font-close'),
      fontSizeDisplay: document.getElementById('font-size-display'),
      modalLoading: document.getElementById('modal-loading'),
      modalError: document.getElementById('modal-error'),
      apiErrorText: document.getElementById('api-error-text')
    };

    setupTheme(); setupModals();
    drawRosaryGeometry();
    setupEvents();
    setupKeyboard();

    // Recuperar preferências salvas
    const savedFont = localStorage.getItem('prayerFontSize');
    if (savedFont) {
      currentFontSize = parseFloat(savedFont);
      els.text.style.fontSize = `${currentFontSize}rem`;
    }
    if (els.fontSizeDisplay) els.fontSizeDisplay.innerText = currentFontSize.toFixed(1) + 'x';

    // Carregar dados da API antes de inicializar a oração
    await fetchDataFromAPI();

    // Só carrega o progresso e mostra a seleção se a API retornar com sucesso
    if (isDataLoaded) {
      checkSavedProgress();
    }

    requestWakeLock();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    });
  }


// Função para buscar os dados na API com suporte OFFLINE anti-bloqueio
  async function fetchDataFromAPI() {
    // TRUQUE: Verifica imediatamente se o dispositivo está offline
    // Se estiver offline, nem tenta fazer o fetch para não irritar o WebIntoApp!
    if (!navigator.onLine) {
      console.warn("Sem internet detetada. A saltar a API e a ir direto para o cache...");
      carregarDadosOffline("Dispositivo offline.");
      return; // Para a execução da função aqui
    }

    try {
      // Como tem internet, tenta ir ao GitHub com o quebrador de cache
      const cacheBuster = `?t=${new Date().getTime()}`;
      const response = await fetch(API_URL + cacheBuster, { cache: 'no-store' });
      
      if (!response.ok) throw new Error('Servidor retornou código ' + response.status);
      
      const data = await response.json();
      
      // Guarda a cópia mais fresca no telemóvel
      localStorage.setItem('cachedRosaryData', JSON.stringify(data));
      
      PRAYERS = data.prayers;
      MYSTERIES_DB = data.mysteries;
      isDataLoaded = true;
      
      els.modalLoading.style.display = 'none';
      
    } catch (error) {
      // Se tiver internet mas o GitHub estiver em baixo, tenta ler o cache na mesma
      console.warn("Falha no fetch. A tentar carregar modo offline...");
      carregarDadosOffline(error.message);
    }
  }

  // NOVA FUNÇÃO AUXILIAR: Lê os dados locais se a net falhar
  function carregarDadosOffline(mensagemErro) {
    const cachedData = localStorage.getItem('cachedRosaryData');
    
    if (cachedData) {
      const data = JSON.parse(cachedData);
      PRAYERS = data.prayers;
      MYSTERIES_DB = data.mysteries;
      isDataLoaded = true;
      els.modalLoading.style.display = 'none';
      
      // Apresenta o aviso de offline
      const toast = document.getElementById("toast-message");
      toast.innerText = "Modo Offline: A utilizar orações guardadas.";
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); }, 4000);
    } else {
      // Se não houver dados e não houver net, mostra o erro
      els.modalLoading.style.display = 'none';
      els.modalError.style.display = 'flex';
      els.apiErrorText.innerText = "Sem ligação e sem dados guardados. Detalhe: " + mensagemErro;
    }
  }

  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) { console.log('Wake Lock Error:', err); }
  }

  function checkSavedProgress() {
    const saved = localStorage.getItem('tercoProgress');
    
    // Mostra ou esconde o botão de retomar
    if (saved) {
      els.btnResume.style.display = 'flex';
    } else {
      els.btnResume.style.display = 'none';
    }
    
    // Apresenta a seleção inicial
    els.modalSelection.style.display = 'flex';
    
    const typeToLoad = saved ? JSON.parse(saved).type || 'auto' : 'auto';
    loadMystery(typeToLoad);
  }

  function saveProgress() {
    if (currentStep >= 0 && currentStep < rosaryStructure.length - 1) {
      localStorage.setItem('tercoProgress', JSON.stringify({ step: currentStep, type: currentMysteryType }));
    } else {
      localStorage.removeItem('tercoProgress');
    }
  }

  function resumeProgress() {
    const saved = localStorage.getItem('tercoProgress');
    if (saved) {
      const data = JSON.parse(saved);
      currentMysteryType = data.type;
      loadMystery(data.type);
      currentStep = data.step;
      els.modalSelection.style.display = 'none';
      updateUI();
    }
  }

  function vibrate() { if (navigator.vibrate) navigator.vibrate(12); }

  function startWith(type) {
    if (!isDataLoaded) return; // Impede iniciar se a API falhou
    currentMysteryType = type;
    loadMystery(type);
    els.modalSelection.style.display = 'none';
    restartRosary();
  }

  function changeModel(modelKey) {
    const m = MODELS[modelKey];
    if (m) {
      els.stopS1.setAttribute('stop-color', m.s[0]);
      els.stopS2.setAttribute('stop-color', m.s[1]);
      els.stopL1.setAttribute('stop-color', m.l[0]);
      els.stopL2.setAttribute('stop-color', m.l[1]);
      els.modalModels.style.display = 'none';
      localStorage.setItem('tercoModel', modelKey);
    }
  }

  function loadMystery(type) {
    let mysteryData;
    if (type === 'auto') {
      const d = new Date().getDay();
      const map = [MYSTERIES_DB.gloriosos, MYSTERIES_DB.gozosos, MYSTERIES_DB.dolorosos, MYSTERIES_DB.gloriosos, MYSTERIES_DB.luminosos, MYSTERIES_DB.dolorosos, MYSTERIES_DB.gozosos];
      mysteryData = map[d];
    } else if (MYSTERIES_DB[type]) {
      mysteryData = MYSTERIES_DB[type];
    } else { return; }

    els.date.innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    els.mystery.innerText = mysteryData.name;

    buildStructure(mysteryData);
    if (beadElementsList.length > 0) mapLogicToPhysics();
  }

  function buildStructure(mysteryData) {
    rosaryStructure = [{ label: "Sinal da Cruz", text: PRAYERS.sinalCruz }, { label: "Oferecimento", text: PRAYERS.oferecimento }, { label: "Credo", text: PRAYERS.credo }, { label: "Pai Nosso", text: PRAYERS.paiNosso }, { label: "Ave Maria (Fé)", text: PRAYERS.aveMaria }, { label: "Ave Maria (Esperança)", text: PRAYERS.aveMaria }, { label: "Ave Maria (Caridade)", text: PRAYERS.aveMaria }];

    mysteryData.decades.forEach((m, index) => {
      rosaryStructure.push({ label: m.t, text: m.d, isShared: true }, { label: "Pai Nosso", text: PRAYERS.paiNosso, isShared: true });
      for (let j = 1; j <= 10; j++) rosaryStructure.push({ label: `Ave Maria (${j}/10)`, text: PRAYERS.aveMaria });
      rosaryStructure.push({ label: "Glória ao Pai", text: PRAYERS.gloria, isShared: true });
      if (index === 4) rosaryStructure.push({ label: "Infinitas Graças", text: PRAYERS.gracas, isShared: true });
    });

    rosaryStructure.push({ label: "Salve Rainha", text: PRAYERS.salveRainha });
  }

  function setupTheme() {
    els.themeBtn.onclick = () => {
      const isLight = document.body.classList.toggle('light-theme');
      els.themeIcon.innerHTML = isLight ? moonIcon : sunIcon;
    };
  }

  function setupModals() {
    const closeModal = (modal) => modal.style.display = 'none';

    document.getElementById('about-toggle').onclick = () => els.modalAbout.style.display = 'flex';
    document.getElementById('about-close').onclick = () => closeModal(els.modalAbout);
    els.modalAbout.onclick = (e) => { if (e.target == els.modalAbout) closeModal(els.modalAbout); }

    els.menuBtn.onclick = () => els.modalSelection.style.display = 'flex';

    els.modelBtn.onclick = () => els.modalModels.style.display = 'flex';
    document.getElementById('model-close').onclick = () => closeModal(els.modalModels);
    els.modalModels.onclick = (e) => { if (e.target == els.modalModels) closeModal(els.modalModels); }

    els.fontBtn.onclick = () => {
      els.fontPanel.style.display = (els.fontPanel.style.display === 'flex') ? 'none' : 'flex';
    };
    els.fontClose.onclick = () => els.fontPanel.style.display = 'none';

    document.addEventListener('click', (e) => {
      if (els.fontPanel && els.fontPanel.style.display === 'flex') {
        if (!els.fontPanel.contains(e.target) && !els.fontBtn.contains(e.target)) {
          els.fontPanel.style.display = 'none';
        }
      }
    });

    els.fontMinus.onclick = () => {
      if (currentFontSize > 0.8) {
        currentFontSize -= 0.1;
        els.text.style.fontSize = `${currentFontSize.toFixed(1)}rem`;
        els.fontSizeDisplay.innerText = currentFontSize.toFixed(1) + 'x';
        localStorage.setItem('prayerFontSize', currentFontSize);
      }
    };

    els.fontPlus.onclick = () => {
      if (currentFontSize < 2.5) {
        currentFontSize += 0.1;
        els.text.style.fontSize = `${currentFontSize.toFixed(1)}rem`;
        els.fontSizeDisplay.innerText = currentFontSize.toFixed(1) + 'x';
        localStorage.setItem('prayerFontSize', currentFontSize);
      }
    };

    document.getElementById('btn-finish-home').onclick = () => {
      els.modalRestart.style.display = 'none';
      restartRosary();
      els.modalSelection.style.display = 'flex';
    };

    document.getElementById('btn-finish-restart').onclick = () => {
      els.modalRestart.style.display = 'none';
      restartRosary();
    };

    document.getElementById('btn-finish-cancel').onclick = () => {
      els.modalRestart.style.display = 'none';
    };

    els.modalRestart.onclick = (e) => { if (e.target == els.modalRestart) els.modalRestart.style.display = 'none'; }
  }

  function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        els.modalAbout.style.display = 'none'; 
        els.modalModels.style.display = 'none'; 
        els.modalRestart.style.display = 'none'; 
        if (els.fontPanel) els.fontPanel.style.display = 'none';
        if (currentStep >= 0) els.modalSelection.style.display = 'none';
      }
      if (els.modalAbout.style.display === 'flex' || els.modalModels.style.display === 'flex' || els.modalRestart.style.display === 'flex' || els.modalSelection.style.display === 'flex') return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextStep(); }
      else if (e.key === 'ArrowLeft') prevStep();
    });
  }

  function drawRosaryGeometry() {
    const cx = 150, cy = 180, r = 135;
    const medalY = cy + r;
    const tailCoords = [{ x: 150, y: 515 }, { x: 150, y: 465 }, { x: 150, y: 430 }, { x: 150, y: 405 }, { x: 150, y: 380 }, { x: 150, y: 345 }];
    let pathD = `M 150 515 L 150 ${medalY + 16}`;
    createBeadElement(tailCoords[0].x, tailCoords[0].y, 0);
    for (let i = 1; i < tailCoords.length; i++) createBeadElement(tailCoords[i].x, tailCoords[i].y, (i === 1 || i === 5) ? 1 : 2);
    for (let i = 0; i < 54; i++) {
      const deg = 102.5 + ((360 - 25) / 53 * i);
      const rad = deg * (Math.PI / 180);
      createBeadElement(cx - r * Math.cos(rad), cy + r * Math.sin(rad), ((i + 1) % 11 === 0) ? 1 : 2);
    }
    createBeadElement(150, medalY, 0, true);
    els.path.setAttribute('d', pathD);
    mapLogicToPhysics();
  }

  function createBeadElement(x, y, type, isMedal = false) {
    let el = document.createElementNS("http://www.w3.org/2000/svg", isMedal ? "polygon" : (type === 0 ? "path" : "circle"));
    if (isMedal) el.setAttribute("points", `${x - 16},${y - 14} ${x + 16},${y - 14} ${x},${y + 18}`);
    else if (type === 0) el.setAttribute("d", `M ${x - 4},${y - 35} L ${x + 4},${y - 35} L ${x + 4},${y - 12} L ${x + 22},${y - 12} L ${x + 22},${y - 2} L ${x + 4},${y - 2} L ${x + 4},${y + 25} L ${x - 4},${y + 25} L ${x - 4},${y - 2} L ${x - 22},${y - 2} L ${x - 22},${y - 12} L ${x - 4},${y - 12} Z`);
    else { el.setAttribute("cx", x); el.setAttribute("cy", y); el.setAttribute("r", type === 1 ? 10 : 6.5); }
    el.setAttribute("class", isMedal ? "medal-base" : (type === 0 ? "cross" : (type === 1 ? "bead large" : "bead small")));
    els.svg.appendChild(el);
    beadElementsList.push(el);
  }

  function mapLogicToPhysics() {
    if (beadElementsList.length === 0) return;
    for (let i = 0; i < 3; i++) stepToElementMap[i] = beadElementsList[0];
    stepToElementMap[3] = beadElementsList[1];
    for (let i = 4; i < 7; i++) stepToElementMap[i] = beadElementsList[i - 2];
    let pIdx = 5;
    for (let i = 7; i < rosaryStructure.length; i++) {
      const s = rosaryStructure[i];
      if (s.label === "Salve Rainha" || s.label === "Infinitas Graças") {
        stepToElementMap[i] = beadElementsList[beadElementsList.length - 1];
      } else {
        if (pIdx < beadElementsList.length) stepToElementMap[i] = beadElementsList[pIdx];
        if (!s.isShared || s.label === "Pai Nosso") pIdx++;
      }
    }
  }

  function nextStep() {
    if (currentStep < rosaryStructure.length - 1) {
      currentStep++; updateUI(); vibrate();
    } else {
      els.modalRestart.style.display = 'flex';
    }
  }

  function prevStep() {
    if (currentStep >= 0) { currentStep--; updateUI(); vibrate(); }
  }

  function setupEvents() {
    els.btnNext.onclick = (e) => { e.stopPropagation(); nextStep(); };
    els.btnPrev.onclick = (e) => { e.stopPropagation(); prevStep(); };

    let touchStartX = 0;
    let touchEndX = 0;

    els.textPane.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    els.textPane.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      if (window.getSelection().toString().length > 0) return;
      if (touchEndX < touchStartX - 60) nextStep();
      if (touchEndX > touchStartX + 60) prevStep();
    }
  }

  function restartRosary() {
    currentStep = -1;
    localStorage.removeItem('tercoProgress');
    els.btnResume.style.display = 'none';
    updateUI();
  }

  function updateUI() {
    saveProgress();

    if (currentStep < 0) {
      els.text.innerText = "Toque em 'Iniciar' ou deslize a tela para a esquerda para começar.";
      els.btnNext.innerText = "Iniciar"; els.btnPrev.style.display = "none";
      els.progress.style.width = "0%"; els.progressText.innerText = "0%";
      els.label.innerText = "Início";
      beadElementsList.forEach(e => e.classList.remove('active', 'done'));
      return;
    }

    const item = rosaryStructure[currentStep];
    els.text.classList.remove('text-fade-in');
    void els.text.offsetWidth;
    els.text.innerText = item.text;
    els.text.classList.add('text-fade-in');

    els.label.innerText = item.label;
    els.btnNext.innerText = "Próximo"; els.btnPrev.style.display = "block";

    const pct = Math.round(((currentStep + 1) / rosaryStructure.length) * 100);
    els.progress.style.width = pct + "%";
    els.progressText.innerText = pct + "%";

    const activeEl = stepToElementMap[currentStep];
    beadElementsList.forEach(el => {
      el.classList.remove('active', 'done');
      if (!activeEl) return;
      const idx = beadElementsList.indexOf(el);
      const activeIdx = beadElementsList.indexOf(activeEl);
      if (idx < activeIdx) el.classList.add('done');
      if (idx === activeIdx) el.classList.add('active');
    });
    els.scroll.scrollTop = 0;
  }

  return { init, startWith, changeModel, resumeProgress };
})();

window.onload = RosaryApp.init;

function copyPix() {
  const key = document.getElementById('pix-key').innerText;
  navigator.clipboard.writeText(key).then(() => {
    const toast = document.getElementById("toast-message");
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  });
}

// Registo do Service Worker para cache dos ficheiros (HTML, CSS, JS)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('Service Worker registado com sucesso!', registration.scope);
    }).catch(err => {
      console.log('Falha ao registar o Service Worker:', err);
    });
  });
}