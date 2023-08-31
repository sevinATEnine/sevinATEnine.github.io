chrome.action.onClicked.addListener(() => {
  var htmlNode = document.getElementsByTagName("html")[0];
  htmlNode = htmlNode.innerHTML;
  document.getElementsByTagName("html")[0].textContent = "<html>"+htmlNode+"</html>";
  //prints the HTML code of the document
});
