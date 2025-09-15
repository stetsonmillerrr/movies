// === GLOBAL STATE ===
let gamesData = [];
let filteredGames = [];

// === DOM ELEMENTS ===
const gameSearch = document.getElementById('gameSearch');
const gamesGrid = document.getElementById('gamesGrid');
const vmContainer = document.getElementById('vmContainer');

// (Removed vmUrlDisplay creation)

// === GAMES ===
async function loadGames() {
  try {
    const res = await fetch('./json/games.json');
    const json = res.ok ? await res.json() : {};
    gamesData = json.games || [];
  } catch {
    gamesData = [];
  }
  filteredGames = [...gamesData];
  renderGames();
}

function renderGames() {
  if (!gamesGrid) return;
  if (!filteredGames.length) {
    gamesGrid.innerHTML = `<div class="loading"><i class="fas fa-search"></i><p>No games found</p></div>`;
    return;
  }
  gamesGrid.innerHTML = filteredGames.map(g => {
    const baseUrl = g.url ? g.url.replace(/\/[^/]*$/, '') : "";
    const faviconUrl = baseUrl ? `${baseUrl}/favicon.ico` : "";
    return `
      <div class="game-card" onclick="playGame('${g.url}','${g.title}')">
        <div class="game-image">
          <img class="game-favicon" src="${faviconUrl}" alt="icon"
               onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/833/833472.png';">
        </div>
        <div class="game-info">
          <h3 class="game-title">${g.title}</h3>
          <p class="game-description">${g.description || ''}</p>
        </div>
      </div>`;
  }).join('');
}

function filterGames(term) {
  term = term.toLowerCase();
  filteredGames = gamesData.filter(g =>
    g.title?.toLowerCase().includes(term) ||
    (g.description || '').toLowerCase().includes(term)
  );
  renderGames();
}

// === VM ===
import Hyperbeam from "https://unpkg.com/@hyperbeam/web@latest/dist/index.js";

window.startVM = async function() {
  if (!vmContainer) return;
  vmContainer.innerHTML = `<div class="vm-placeholder"><p>Launching VM...</p></div>`;

  try {
    const res = await fetch("https://vmapi.vercel.app/api/api?add&url=aHR0cHM6Ly93bWF0aC5wYWdlcy5kZXYvcHJlc2V0cy5odG1s");
    const data = await res.json();

    if (data?.embed_url) {
      vmContainer.innerHTML = `<div id="virtualComputerDiv" style="height:600px;width:100%;border-radius:12px;overflow:hidden;"></div>`;
      const virtualComputerDiv = document.getElementById('virtualComputerDiv');

      const hb = await Hyperbeam(virtualComputerDiv, data.embed_url);
      // (Removed vmUrlDisplay updates)
    } else {
      vmContainer.innerHTML = `<div class="vm-placeholder"><p>Failed to launch VM. Invalid response.</p></div>`;
    }
  } catch (err) {
    console.error(err);
    vmContainer.innerHTML = `<div class="vm-placeholder"><p>Failed to connect to VM service.</p></div>`;
  }
};

window.resetVM = function() {
  if (!vmContainer) return;
  vmContainer.innerHTML = `
    <div class="vm-placeholder">
      <div class="vm-icon"><i class="fas fa-desktop"></i></div>
      <h3>Virtual Machine Ready</h3>
      <p>Click "Start VM" to launch your virtual environment</p>
    </div>
  `;
};

// === NOTIFICATIONS ===
function showNotification(msg, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${msg}`);
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  loadGames();
  if (gameSearch) gameSearch.addEventListener('input', e => filterGames(e.target.value));
});
