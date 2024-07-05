const { changeContent } = require("../js/drawer");

describe("changeContent", () => {
  document.body.innerHTML = `
    <div id="content_videos"></div>
  `;

  it("should load videos content", () => {
    changeContent("videos");
    const content = document.getElementById("content_videos").innerHTML;
    expect(content).toContain("http://localhost:8081");
  });

  it("should load favoritos content", () => {
    changeContent("favoritos");
    const content = document.getElementById("content_videos").innerHTML;
    expect(content).toContain("http://localhost:8081/favoritos");
  });
});
