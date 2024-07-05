const {
  searchVideos,
  toggleFavorite,
  attachStarEvents,
  updateFavCount,
} = require("../js/videos");

describe("searchVideos", () => {
  it("should fetch and display videos", async () => {
    document.body.innerHTML = `
      <input type="text" id="search" value="test" />
      <div id="videoList"></div>
    `;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: [
              { id: { videoId: "123" }, snippet: { title: "Test Video" } },
            ],
          }),
      })
    );

    await searchVideos();
    const videoList = document.getElementById("videoList").innerHTML;
    expect(videoList).toContain("Test Video");
    expect(videoList).toContain("123");
  });
});

describe("toggleFavorite", () => {
  it("should toggle favorite status", async () => {
    document.body.innerHTML = `
      <button class="favoriteBtn" data-id="123">☆</button>
    `;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ isFavorited: true, favoriteCount: 1 }),
      })
    );

    const button = document.querySelector(".favoriteBtn");
    await toggleFavorite({ target: button });

    expect(button.classList).toContain("favorited");
  });
});

describe("updateFavCount", () => {
  it("should update favorite count", () => {
    document.body.innerHTML = `<span id="fav-count">0</span>`;
    updateFavCount(5);
    const favCount = document.getElementById("fav-count").textContent;
    expect(favCount).toBe("5");
  });
});
