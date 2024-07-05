function changeContent(page) {
  const content = document.getElementById("content_videos");
  content.innerHTML = '<div class="loader">Loading...</div>';

  let url = "";
  switch (page) {
    case "videos":
      url = "http://localhost:8081";
      break;
    case "favoritos":
      url = "http://localhost:8081/favoritos";
      break;
    default:
      break;
  }

  if (url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        content.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        content.innerHTML =
          '<div class="error">Failed to load content. Please try again later.</div>';
      });
  }
}

document.querySelectorAll("#links a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  changeContent("videos");
});
