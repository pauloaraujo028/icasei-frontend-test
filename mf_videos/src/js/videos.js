document.getElementById("search-btn").addEventListener("click", searchVideos);

function searchVideos() {
  const query = document.getElementById("search").value;
  fetch(`http://localhost:3000/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const videoList = document.getElementById("videoList");
      videoList.innerHTML = "";
      data.items.forEach((item) => {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video");
        videoDiv.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
          <p>${item.snippet.title}</p>
          <button class="favoriteBtn" data-id="${item.id.videoId}">☆</button>
        `;
        videoList.appendChild(videoDiv);
      });
      attachStarEvents();
    });
}

function attachStarEvents() {
  const stars = document.querySelectorAll(".favoriteBtn");
  stars.forEach((star) => {
    star.addEventListener("click", toggleFavorite);
  });
}

function toggleFavorite(event) {
  const videoId = event.target.dataset.id;
  fetch(`http://localhost:3000/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId }),
  })
    .then((response) => response.json())
    .then((data) => {
      event.target.classList.toggle("favorited", data.isFavorited);
      updateFavCount(data.favoriteCount);
    });
}

function updateFavCount(count) {
  document.getElementById("fav-count").textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path === "/favoritos") {
    loadFavorites();
  }
});

function loadFavorites() {
  fetch("http://localhost:3000/favorites")
    .then((response) => response.json())
    .then((data) => {
      const videoList = document.getElementById("videoList");
      videoList.innerHTML = "";
      data.forEach((item) => {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video");
        videoDiv.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${item.id}" frameborder="0" allowfullscreen></iframe>
          <p>${item.title}</p>
          <button class="favoriteBtn favorited" data-id="${item.id}">★</button>
        `;
        videoList.appendChild(videoDiv);
      });
      attachStarEvents();
    });
}
