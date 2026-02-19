const RosaryApp = (() => {
  'use strict';

  // Dicionário de orações
  const PRAYERS = {
    sinalCruz: "Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém.",
    oferecimento: "Oferecimento: Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos as virtudes necessárias.",
    credo: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, de onde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
    paiNosso: "Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.",
    aveMaria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
    gloria: "Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém. \n\nJaculatória: Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.",
    gracas: "Infinitas graças vos damos, Soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos liberais. Dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo e para mais vos obrigar, vos saudamos com uma Salve Rainha...",
    salveRainha: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. V. Rogai por nós, Santa Mãe de Deus. R. Para que sejamos dignos das promessas de Cristo. Amém."
  };

  const MYSTERIES_DB = {
    gozosos: {
      name: "Mistérios Gozosos",
      decades: [
        { t: "1º Mistério: A Anunciação", d: "No primeiro mistério contemplamos a Anunciação do Arcanjo Gabriel à Nossa Senhora.\n\nDisse-lhe o anjo: 'Ave, cheia de graça, o Senhor é contigo'. E Maria respondeu: 'Eis aqui a serva do Senhor, faça-se em mim segundo a tua palavra'." },
        { t: "2º Mistério: A Visitação", d: "No segundo mistério contemplamos a Visitação de Nossa Senhora a sua prima Santa Isabel.\n\nMaria foi apressadamente às montanhas. Entrou em casa de Zacarias e saudou Isabel, que ficou cheia do Espírito Santo e exclamou: 'Bendita és tu entre as mulheres'." },
        { t: "3º Mistério: O Nascimento", d: "No terceiro mistério contemplamos o Nascimento de Jesus em Belém.\n\nE deu à luz seu filho primogênito, e envolveu-o em panos, e deitou-o numa manjedoura, porque não havia lugar para eles na estalagem." },
        { t: "4º Mistério: A Apresentação", d: "No quarto mistério contemplamos a Apresentação do Menino Jesus no Templo.\n\nLevaram o menino a Jerusalém para o apresentarem ao Senhor, como está escrito na Lei. Simeão tomou-o nos braços e louvou a Deus." },
        { t: "5º Mistério: O Encontro", d: "No quinto mistério contemplamos o Encontro de Jesus no Templo.\n\nApós três dias de procura, encontraram-no no templo, sentado no meio dos doutores, ouvindo-os e interrogando-os." }
      ]
    },
    dolorosos: {
      name: "Mistérios Dolorosos",
      decades: [
        { t: "1º Mistério: A Agonia", d: "No primeiro mistério contemplamos a Agonia de Jesus no Horto das Oliveiras.\n\nJesus orou: 'Pai, se é do teu agrado, afasta de mim este cálice; contudo, não se faça a minha vontade, mas a tua'. E seu suor tornou-se como gotas de sangue." },
        { t: "2º Mistério: A Flagelação", d: "No segundo mistério contemplamos a Flagelação de Nosso Senhor Jesus Cristo.\n\nPilatos, querendo satisfazer a multidão, soltou-lhes Barrabás; e, depois de mandar flagelar Jesus, entregou-o para ser crucificado." },
        { t: "3º Mistério: A Coroação", d: "No terceiro mistério contemplamos a Coroação de Espinhos.\n\nOs soldados teceram uma coroa de espinhos, puseram-na sobre a sua cabeça e vestiram-no com um manto de púrpura, zombando dele: 'Salve, Rei dos Judeus!'." },
        { t: "4º Mistério: O Caminho", d: "No quarto mistério contemplamos Jesus a caminho do Calvário carregando a Cruz.\n\nE ele, carregando a sua própria cruz, saiu para o lugar chamado Calvário, onde o crucificaram." },
        { t: "5º Mistério: A Crucificação", d: "No quinto mistério contemplamos a Crucificação e Morte de Jesus.\n\nJesus disse: 'Pai, nas tuas mãos entrego o meu espírito'. E, havendo dito isto, expirou." }
      ]
    },
    gloriosos: {
      name: "Mistérios Gloriosos",
      decades: [
        { t: "1º Mistério: A Ressurreição", d: "No primeiro mistério contemplamos a Ressurreição de Jesus Cristo.\n\nO anjo disse às mulheres: 'Não tenhais medo. Sei que buscais Jesus, o crucificado. Ele não está aqui; ressuscitou, como havia dito'." },
        { t: "2º Mistério: A Ascensão", d: "No segundo mistério contemplamos a Ascensão de Jesus ao Céu.\n\nEnquanto os abençoava, afastou-se deles e foi elevado ao céu. E eles o adoraram e voltaram para Jerusalém com grande alegria." },
        { t: "3º Mistério: Pentecostes", d: "No terceiro mistério contemplamos a Vinda do Espírito Santo sobre os Apóstolos.\n\nFicaram todos cheios do Espírito Santo e começaram a falar em outras línguas, conforme o Espírito lhes concedia que falassem." },
        { t: "4º Mistério: A Assunção", d: "No quarto mistério contemplamos a Assunção de Nossa Senhora ao Céu.\n\nFez-se em mim grandes coisas o Todo-Poderoso. Maria é elevada ao céu em corpo e alma, como primícia da glória a que todos somos chamados." },
        { t: "5º Mistério: A Coroação", d: "No quinto mistério contemplamos a Coroação de Maria como Rainha do Céu e da Terra.\n\nApareceu no céu um grande sinal: uma mulher vestida de sol, com a lua debaixo dos pés e uma coroa de doze estrelas na cabeça." }
      ]
    },
    luminosos: {
      name: "Mistérios Luminosos",
      decades: [
        { t: "1º Mistério: O Batismo", d: "No primeiro mistério contemplamos o Batismo de Jesus no Rio Jordão.\n\nAssim que Jesus foi batizado, o céu se abriu, e viu o Espírito de Deus descer como pomba. E uma voz do céu disse: 'Este é o meu Filho amado'." },
        { t: "2º Mistério: Bodas de Caná", d: "No segundo mistério contemplamos a Auto-revelação de Jesus nas Bodas de Caná.\n\nSua mãe disse aos serventes: 'Fazei tudo o que ele vos disser'. Jesus transformou a água em vinho, manifestando a sua glória e seus discípulos creram nele." },
        { t: "3º Mistério: O Reino", d: "No terceiro mistério contemplamos o Anúncio do Reino de Deus e o convite à conversão.\n\nJesus pregava: 'O tempo completou-se e o Reino de Deus está próximo. Arrependei-vos e crede no Evangelho'." },
        { t: "4º Mistério: A Transfiguração", d: "No quarto mistério contemplamos a Transfiguração de Jesus no Monte Tabor.\n\nSeu rosto brilhou como o sol e suas vestes tornaram-se brancas como a luz. Da nuvem saiu uma voz: 'Este é o meu Filho amado, ouvi-o'." },
        { t: "5º Mistério: A Eucaristia", d: "No quinto mistério contemplamos a Instituição da Eucaristia.\n\nJesus tomou o pão e disse: 'Tomai e comei, isto é o meu corpo'. E o cálice: 'Bebei dele todos, pois isto é o meu sangue da nova aliança'." }
      ]
    }
  };

  const MODELS = {
    classico: { s: ['#00c6ff', '#002244'], l: ['#ff4b1f', '#660000'] },
    perola: { s: ['#fcfcfc', '#b0b0b0'], l: ['#e6c200', '#b8860b'] },
    madeira: { s: ['#deb887', '#8b4513'], l: ['#a0522d', '#5c4033'] },
    rosa: { s: ['#ffb6c1', '#ff69b4'], l: ['#ff1493', '#8b0000'] },
    noturno: { s: ['#7f8c8d', '#2c3e50'], l: ['#95a5a6', '#000000'] }
  };

  let currentStep = -1, currentMysteryType = 'auto', rosaryStructure = [], beadElementsList = [], stepToElementMap = [], els = {};
  let wakeLock = null;

  const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

  function init() {
    els = {
      container: document.querySelector('.app-container'),
      rosaryPane: document.getElementById('rosary-pane'),
      dragBar: document.getElementById('drag-bar'),
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
      btnResume: document.getElementById('btn-resume')
    };

    setupTheme(); setupDraggable(); setupModals();
    drawRosaryGeometry();
    setupEvents();
    setupKeyboard();

    checkSavedProgress();
    requestWakeLock();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    });
  }

  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) { console.log('Wake Lock Error:', err); }
  }

  function checkSavedProgress() {
    const saved = localStorage.getItem('tercoProgress');
    if (saved) {
      const data = JSON.parse(saved);
      els.btnResume.style.display = 'flex';
      loadMystery(data.type || 'auto');
    } else {
      loadMystery('auto');
    }
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

  function setupDraggable() {
    let isDragging = false;
    const onMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      const touch = e.touches ? e.touches[0] : e;
      const rect = els.container.getBoundingClientRect();
      let pct = window.innerWidth >= 768 ? ((touch.clientX - rect.left) / rect.width) * 100 : ((touch.clientY - rect.top) / rect.height) * 100;
      els.rosaryPane.style.flex = `0 0 ${Math.max(20, Math.min(80, pct))}%`;
    };
    els.dragBar.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', onMove);
    els.dragBar.addEventListener('touchstart', (e) => { isDragging = true; if (e.cancelable) e.preventDefault(); }, { passive: false });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => { if (isDragging && e.cancelable) e.preventDefault(); onMove(e); }, { passive: false });
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
        els.modalAbout.style.display = 'none'; els.modalModels.style.display = 'none'; els.modalRestart.style.display = 'none';
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

    els.textPane.addEventListener('click', (e) => {
      if (window.getSelection().toString().length > 0) return;
      if (window.innerWidth >= 768) return;
      if (e.target.closest('button') || e.target.closest('.action-btn')) return;
    });
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