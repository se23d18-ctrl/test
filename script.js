const btn = document.getElementById("btn");
const text = document.getElementById("text");

btn.addEventListener("click", function() {
  text.innerHTML = "Товч амжилттай ажиллалаа!"
});
document.getElementById("homeBtn").onselectionchange = function() {
  text.innerHTML = "Товч амжилттай ажиллалаа!"
};
document.getElementById("aboutBtn").onmouseover = function() {
    text.innerHTML = "about Товч амжилттай ажиллалаа!"
};
document.getElementById("contactBtn").onmouseout = function() {
    text.innerHTML = "contact Товч амжилттай ажиллалаа!"
}