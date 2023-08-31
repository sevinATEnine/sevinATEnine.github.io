var url;
chrome.action.onClicked.addListener(async (tab) => {
  url = tab.url;
  var dataDiv = document.createElement("div");
  dataDiv.innerHTML = "URL: "+url.split("&").join("&amp;").split("<").join("&lt;")+" <a onlick='hide();'>X</a>";
  dataDiv.style = "position:absolute;left:3px;top:3px;background-color:gray;color:white;width:30%";
  function hide() {
    dataDiv.style.display = "none";
  }
  document.appendChild(dataDiv);
});
