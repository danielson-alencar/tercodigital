# 📿 Terço Digital Mariano

Um aplicativo web moderno, intuitivo e responsivo desenvolvido para guiar a oração diária do Santo Terço Mariano. O projeto une a beleza da tradição católica com a facilidade da tecnologia, funcionando como um PWA (Progressive Web App) que pode ser instalado diretamente no celular.

<div align="center">

  [![Status do Projeto](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)](#)
  [![Licença](https://img.shields.io/badge/Licença-MIT-blue?style=for-the-badge)](#)
  [![Tecnologias](https://img.shields.io/badge/Tech-HTML_|_CSS_|_JS-f39f37?style=for-the-badge)](#)

  <br>
  
  <a href="https://danielson-alencar.github.io/tercomariano/">
    <img src="https://img.shields.io/badge/Acessar_Web_App-Navegador-0078D4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Acessar Web App" />
  </a>
  <a href="https://github.com/danielson-alencar/tercomariano/releases/download/v2.0/app-release-v2.apk">
    <img src="https://img.shields.io/badge/Download_APK-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Baixar APK" />
  </a>

</div>

---

## 📦 Download do Aplicativo

Você pode instalar o Terço Digital diretamente no seu celular Android baixando o arquivo APK oficial:

👉 **[Clique aqui para baixar a versão mais recente (.apk)](https://github.com/danielson-alencar/tercomariano/releases/download/v2.0/app-release-v2.apk)**

*Nota: Ao instalar, o seu celular pode pedir permissão para "Instalar aplicativos de fontes desconhecidas". Basta autorizar para concluir a instalação com segurança.*

## ✨ Funcionalidades

O Terço Digital foi pensado para oferecer a melhor experiência durante a oração, contando com recursos nativos de aplicativos modernos:

* **Acompanhamento Visual:** As contas do terço (em formato SVG) brilham e mudam de estado conforme você avança nas orações.
* **Seleção Automática de Mistérios:** O app identifica o dia da semana e sugere automaticamente os mistérios correspondentes (Gozosos, Dolorosos, Gloriosos ou Luminosos).
* **Persistência de Estado (Auto-Save):** Fechou o navegador sem querer? O app salva seu progresso automaticamente. Ao voltar, basta clicar em "Continuar de onde parou".
* **Navegação por Gestos (Swipe):** No celular, basta deslizar o dedo para a esquerda ou direita na tela de texto para avançar ou voltar as orações.
* **Screen Wake Lock:** A tela do dispositivo permanece ligada automaticamente enquanto você estiver rezando (em navegadores compatíveis).
* **Personalização Total:**
  * Modo Claro e Escuro (Dark/Light mode).
  * 5 estilos diferentes para as contas (Clássico, Pérola Mariana, Madeira Rústica, Rosa Místico e Noturno).
* **Design Responsivo:** Interface otimizada para funcionar perfeitamente em smartphones, tablets e computadores (com ajuste lateral).

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web puras (Vanilla), garantindo leveza e alta performance sem a necessidade de frameworks pesados:

* **HTML5:** Semântica e estruturação, além da construção do SVG dinâmico.
* **CSS3:** Estilização, variáveis nativas para temas, Flexbox, CSS Grid, animações fluidas e responsividade.
* **JavaScript (ES6+):** Lógica do aplicativo, manipulação do DOM, LocalStorage, Screen Wake Lock API e detecção de eventos de toque (Touch Events).
* **PWA (Progressive Web App):** Configurado com `manifest.json` para permitir a instalação como aplicativo nativo.

## 📂 Estrutura de Arquivos

A base do código foi separada para facilitar a manutenção e escalabilidade:

```text
/
├── index.html       # Estrutura principal, botões e marcação SVG
├── style.css        # Estilos, variáveis de tema e animações
├── script.js        # Lógica de negócio, controle de progresso e eventos
└── README.md        # Documentação do projeto
