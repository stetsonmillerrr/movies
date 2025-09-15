
<!DOCTYPE html>
<html lang="en">
<head>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MFMTWB2DBE"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-MFMTWB2DBE');
    </script>

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Streaming</title>
<link rel="stylesheet" href="css/styles.css" />
<script src="js/streaming.js" defer></script>
<style>
  /* Body and header */
  body {
    background-color: #121212;
    color: #c9d1d9;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  header {
    background: #161b22;
    padding: 20px;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid #2f81f7;
  }
  #searchbar {
    width: 60%;
    max-width: 400px;
    padding: 10px;
    border-radius: 6px;
    border: none;
    font-size: 16px;
  }

  /* Results Grid */
  #bigDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    gap: 20px;
  }

  .result-card {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 12px;
    width: 180px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .result-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  }

  .poster-container img {
    width: 100%;
    border-bottom: 1px solid #30363d;
  }

  .card-info {
    padding: 0.6rem;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: #2f81f7;
    margin: 0 0 0.3rem 0;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #8b949e;
  }

  /* Fullscreen iframe modal */
  #iframeContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0d1117;
    display: none;
    flex-direction: column;
    z-index: 9999;
  }

  #iframeTopBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #161b22;
    padding: 0.8rem 1rem;
    border-bottom: 2px solid #2f81f7;
  }

  #iframeTopBar h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #2f81f7;
  }

  #iframeTopBar button {
    background: none;
    border: 1px solid #2f81f7;
    color: #2f81f7;
    border-radius: 6px;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  #iframeTopBar button:hover {
    background: #2f81f7;
    color: #fff;
  }

  #fullscreenIframe {
    flex: 1;
    width: 100%;
    border: none;
  }

  /* TV Modal with seasons/episodes (no middle bar) */
  #tvModal {
    display: none;
    position: fixed;
    top:0; left:0; width:100vw; height:100vh;
    background: rgba(0,0,0,0.95);
    z-index: 10000;
    justify-content: center;
    align-items: center;
  }
  #tvModal .modal-content {
    background: #161b22;
    padding: 20px;
    border-radius: 12px;
    width: 500px;
    max-width: 90vw;
    display: flex;
    color: white;
    height: 400px;
  }
  #tvModal .seasons {
    width: 40%;
    overflow-y: auto;
  }
  #tvModal .seasons button {
    width: 100%;
    padding: 8px;
    margin-bottom: 6px;
    border: none;
    background: #2a2a2a;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
  #tvModal .seasons button:hover,
  #tvModal .seasons button.active {
    background: #2f81f7;
    color: white;
  }
  #tvModal .episodes {
    width: 60%;
    padding-left: 10px;
    overflow-y: auto;
  }
  #tvModal .episodes button {
    width: 100%;
    padding: 8px;
    margin-bottom: 6px;
    border: none;
    background: #2a2a2a;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
  #tvModal .episodes button:hover {
    background: #2f81f7;
  }
  #tvModal .closeBtn {
    position: absolute;
    top: 10px; right: 15px;
    background: #333;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 6px;
  }
</style>
</head>
<body>
<header>
  <h1>Streaming Hub</h1>
  <input id="searchbar" type="text" placeholder="Search Movies or TV Shows..." autofocus />
</header>

<div id="bigDiv"></div>

<!-- TV Modal for Season/Episode selection -->
<div id="tvModal">
  <button class="closeBtn" onclick="closeTvModal()">Close</button>
  <div class="modal-content">
    <div class="seasons" id="seasonList"></div>
    <div class="episodes" id="episodeList"></div>
  </div>
</div>

<!-- Fullscreen iframe modal -->
<div id="iframeContainer">
  <div id="iframeTopBar">
    <h2 id="iframeTitle">Now Playing</h2>
    <button onclick="closeIframe()">Close</button>
  </div>
  <iframe id="fullscreenIframe" allowfullscreen></iframe>
</div>

<!-- TV Modal -->
<div id="tvModal">
  <button class="closeBtn" onclick="closeTVModal()">Close</button>
  <div class="modal-content">
    <div class="seasons" id="seasonList"></div>
    <div class="episodes" id="episodeList"></div>
  </div>
</div>

</body>
</html>
