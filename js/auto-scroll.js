const messagesDiv = document.querySelector(".messages");

function scroll() {
  let shouldScroll =
    messagesDiv.scrollTop + messagesDiv.clientHeight !==
    messagesDiv.scrollHeight;

  if (shouldScroll) {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

//On page loaded
scroll();
