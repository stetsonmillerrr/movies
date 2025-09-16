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

// Tabs
const moviesTab = document.getElementById("moviesTab");
const tvTab = document.getElementById("tvTab");
let activeTab = "movies";

// API base URL
const apiKey = "9a2954cb0084e80efa20b3729db69067";
const tmdbUrl = "https://api.themoviedb.org/3";
let useEmbedAPI = false; // Default to TMDB API

// --- General Helper Functions ---
const fetchAPI = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    alert("An error occurred. Please try again later.");
    return [];
  }
};

// --- Card Creation ---
const createCard = (item) => {
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    : item.poster || "";

  const rating = item.vote_average
    ? `⭐ ${Math.round(item.vote_average * 10) / 10}`
    : item.rating
    ? `⭐ ${item.rating}`
    : "";

  const year = item.release_date
    ? item.release_date.slice(0, 4)
    : item.first_air_date
    ? item.first_air_date.slice(0, 4)
    : item.year || "N/A";

  const title = item.title || item.name || "Untitled";
  const mediaType = item.media_type || item.type || "movie";

  const card = document.createElement("div");
  card.className = "result-card";
  card.innerHTML = `
    <div class="poster-container"><img src="${poster}" alt="${title}"></div>
    <div class="card-info">
      <div class="card-title">${title}</div>
      <div class="card-meta"><span>${rating}</span><span>${year}</span></div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (mediaType === "tv") {
      if (useEmbedAPI) {
        const url = generateEmbedUrl(item.id, "tv", 1, 1);
        openIframe(url, `${title} - S1E1`);
      } else {
        showTVModal(item.id, title);
      }
    } else {
      openIframe(generateEmbedUrl(item.id, "movie"), title);
    }
  });

  return card;
};

// --- Embed URL Generation ---
const generateEmbedUrl = (id, type, season = null, episode = null) => {
  if (useEmbedAPI) {
    if (type === "movie") return `https://embed.su/embed/movie/${id}`;
    if (type === "tv" && season !== null && episode !== null) {
      return `https://embed.su/embed/tv/${id}/${season}/${episode}`;
    }
  } else {
    if (type === "movie") return `${tmdbUrl}/movie/${id}?api_key=${apiKey}`;
    if (type === "tv" && season !== null && episode !== null) {
      return `${tmdbUrl}/tv/${id}/season/${season}?api_key=${apiKey}`;
    }
  }
  return "";
};

// --- Load Content ---
async function loadHomeContent() {
  if (useEmbedAPI) {
    const url =
      activeTab === "movies"
        ? "https://embed.su/list/movie.json"
        : "https://embed.su/list/tv.json";
    const data = await fetchAPI(url);
    displayResults(data || []);
  } else {
    const url =
      activeTab === "movies"
        ? `${tmdbUrl}/movie/popular?api_key=${apiKey}`
        : `${tmdbUrl}/tv/popular?api_key=${apiKey}`;
    const data = await fetchAPI(url);
    displayResults(data.results || []);
  }
}

async function searchMedia(query) {
  if (useEmbedAPI) {
    const url =
      activeTab === "movies"
        ? "https://embed.su/list/movie.json"
        : "https://embed.su/list/tv.json";
    const list = await fetchAPI(url);
    const filtered = (list || []).filter((item) =>
      (item.title || item.name || "")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    displayResults(filtered);
  } else {
    const url = `${tmdbUrl}/search/${
      activeTab === "movies" ? "movie" : "tv"
    }?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const data = await fetchAPI(url);
    displayResults(data.results || []);
  }
}

function displayResults(results) {
  bigDiv.innerHTML = results.length
    ? ""
    : "<p style='text-align:center;'>No results found.</p>";
  results.forEach((item) => {
    const card = createCard(item);
    bigDiv.appendChild(card);
  });
}

// --- TV Modal (TMDB only) ---
async function showTVModal(tvId, title) {
  currentTV = tvId;
  currentTitle = title;
  seasonList.innerHTML = "";
  episodeList.innerHTML = "";
  tvModal.style.display = "flex";

  const url = `${tmdbUrl}/tv/${tvId}?api_key=${apiKey}`;
  const show = await fetchAPI(url);
  const seasons = show.seasons.filter((s) => s.season_number > 0);

  seasons.forEach((s) => {
    const btn = document.createElement("button");
    btn.textContent = `Season ${s.season_number}`;
    btn.addEventListener("click", () =>
      loadEpisodes(tvId, s.season_number, btn)
    );
    seasonList.appendChild(btn);
  });

  if (seasons.length)
    loadEpisodes(tvId, seasons[0].season_number, seasonList.firstChild);
}

async function loadEpisodes(tvId, seasonNumber, activeBtn) {
  Array.from(seasonList.children).forEach((b) => b.classList.remove("active"));
  activeBtn.classList.add("active");
  episodeList.innerHTML = "";

  const url = `${tmdbUrl}/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}`;
  const seasonData = await fetchAPI(url);

  seasonData.episodes.forEach((ep) => {
    const btn = document.createElement("button");
    btn.textContent = `Episode ${ep.episode_number}: ${ep.name}`;
    btn.addEventListener("click", () => {
      const embedUrl = generateEmbedUrl(
        tvId,
        "tv",
        seasonNumber,
        ep.episode_number
      );
      openIframe(embedUrl, `${currentTitle} - S${seasonNumber}E${ep.episode_number}`);
      closeTVModal();
    });
    episodeList.appendChild(btn);
  });
}

function closeTVModal() {
  tvModal.style.display = "none";
  seasonList.innerHTML = "";
  episodeList.innerHTML = "";
}

// --- Iframe functions ---
function openIframe(url, title = "Now Playing") {
  fullscreenIframe.src = url;
  iframeTitle.textContent = title;
  iframeContainer.style.display = "flex";
}

function closeIframe() {
  fullscreenIframe.src = "";
  iframeContainer.style.display = "none";
}

// --- API Toggle ---
document.getElementById("apiToggle").addEventListener("change", (e) => {
  useEmbedAPI = e.target.checked;
  console.log(`Using ${useEmbedAPI ? "Embed.su" : "TMDB"} API`);
  loadHomeContent();
});

// --- Tabs ---
moviesTab.addEventListener("click", () => {
  activeTab = "movies";
  moviesTab.classList.add("bg-blue-600");
  tvTab.classList.remove("bg-blue-600");
  loadHomeContent();
});

tvTab.addEventListener("click", () => {
  activeTab = "tv";
  tvTab.classList.add("bg-blue-600");
  moviesTab.classList.remove("bg-blue-600");
  loadHomeContent();
});

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  loadHomeContent();

  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchBar.value.trim();
      if (query) searchMedia(query);
    }
  });
});
