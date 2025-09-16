const bigDiv = document.getElementById("bigDiv");
const searchBar = document.getElementById("searchbar");
const iframeContainer = document.getElementById("iframeContainer");
const fullscreenIframe = document.getElementById("fullscreenIframe");
const iframeTitle = document.getElementById("iframeTitle");

// TV modal
const tvModal = document.getElementById("tvModal");
const seasonList = document.getElementById("seasonList");
const episodeList = document.getElementById("episodeList");

let currentTV = null;
let currentTitle = null;

// --- Load Trending Home ---
async function loadHomeContent() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=9a2954cb0084e80efa20b3729db69067`);
    const data = await res.json();
    displayResults(data.results || []);
  } catch (err) {
    console.error(err);
  }
}

// --- Search Media ---
async function searchMedia(query) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=9a2954cb0084e80efa20b3729db69067&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    displayResults(data.results || []);
  } catch(err) {
    console.error(err);
  }
}

// --- Display results ---
function displayResults(results) {
  bigDiv.innerHTML = "";
  if (!results.length) {
    bigDiv.innerHTML = "<p style='text-align:center;'>No results found.</p>";
    return;
  }

  results.forEach(item => {
    if (!item.poster_path) return;
    const poster = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    const rating = item.vote_average ? `⭐ ${Math.round(item.vote_average*10)/10}` : "";
    const year = item.release_date ? item.release_date.slice(0,4) : item.first_air_date ? item.first_air_date.slice(0,4) : "N/A";

    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <div class="poster-container"><img src="${poster}" alt="${item.title || item.name}"></div>
      <div class="card-info">
        <div class="card-title">${item.title || item.name}</div>
        <div class="card-meta"><span>${rating}</span><span>${year}</span></div>
      </div>
    `;
    card.addEventListener("click", () => {
      if(item.media_type === "tv") showTVModal(item.id, item.name || item.title);
      else openIframe(`https://stuffgoogle.vercel.app/W/customsource?id=${item.id}&type=movie`, item.title || item.name);
    });
    bigDiv.appendChild(card);
  });
}

// --- TV Modal ---
async function showTVModal(tvId, title) {
  currentTV = tvId;
  currentTitle = title;
  seasonList.innerHTML = "";
  episodeList.innerHTML = "";
  tvModal.style.display = "flex";

  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=9a2954cb0084e80efa20b3729db69067`);
    const show = await res.json();
    const seasons = show.seasons.filter(s => s.season_number > 0);

    seasons.forEach(s => {
      const btn = document.createElement("button");
      btn.textContent = `Season ${s.season_number}`;
      btn.addEventListener("click", () => loadEpisodes(tvId, s.season_number, btn));
      seasonList.appendChild(btn);
    });

    if(seasons.length) loadEpisodes(tvId, seasons[0].season_number, seasonList.firstChild);
  } catch(err) {
    console.error(err);
  }
}

async function loadEpisodes(tvId, seasonNumber, activeBtn) {
  // Highlight selected season
  Array.from(seasonList.children).forEach(b => b.classList.remove("active"));
  activeBtn.classList.add("active");

  episodeList.innerHTML = "";
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=9a2954cb0084e80efa20b3729db69067`);
    const seasonData = await res.json();

    seasonData.episodes.forEach(ep => {
      const btn = document.createElement("button");
      btn.textContent = `Episode ${ep.episode_number}: ${ep.name}`;
      btn.addEventListener("click", () => {
        const url = `https://stuffgoogle.vercel.app/W/customsource?id=${tvId}&type=tv&season=${seasonNumber}&episode=${ep.episode_number}`;
        openIframe(url, `${currentTitle} - S${seasonNumber}E${ep.episode_number}`);
        closeTVModal();
      });
      episodeList.appendChild(btn);
    });
  } catch(err) {
    console.error(err);
  }
}

function closeTVModal() {
  tvModal.style.display = "none";
  seasonList.innerHTML = "";
  episodeList.innerHTML = "";
}

// --- Iframe functions ---
function openIframe(url, title="Now Playing") {
  fullscreenIframe.src = url;
  iframeTitle.textContent = title;
  iframeContainer.style.display = "flex";
}
function closeIframe() {
  fullscreenIframe.src = "";
  iframeContainer.style.display = "none";
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  loadHomeContent();
  searchBar.addEventListener("keypress", e => {
    if(e.key === "Enter") {
      const query = searchBar.value.trim();
      if(query) searchMedia(query);
    }
  });
});
