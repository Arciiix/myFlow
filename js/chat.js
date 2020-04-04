const input = document.getElementById("input");
const submit = document.getElementById("submit");
const messages = document.querySelector(".messages");

const copyBtns = document.getElementsByClassName("copy");

for (let btn of copyBtns) {
  btn.addEventListener("click", copy);
}

function copy() {
  let text = this.parentNode.firstChild.innerText;
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, 9999999); //For mobile devices
  document.execCommand("Copy");
  textArea.remove();
  this.style.color = "#17bd75";
}

submit.addEventListener("click", sendMessage);
addEventListener("keyup", (e) => {
  switch (e.key) {
    case "Enter":
      sendMessage();
      break;
  }
});

function sendMessage() {
  //Validation of input
  let value = input.value;
  if (value == "") {
    input.classList.add("red-placeholder");
  } else {
    input.classList.remove("red-placeholder");

    let data = new FormData();
    data.append("message", value);
    fetch(`save?message=${value}`).then((req) => {
      //Check for the status code - it should be 201
      if (req.status === 201) {
        //Create a new chat bubble
        generateBubble(value);
        //Clear input
        input.value = "";
      } else {
        console.log(`Error, status code: ${req.status}`);
      }
    });
  }
}

function generateBubble(content) {
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");

  let message = document.createElement("span");
  message.classList.add("message");

  let text = document.createElement("text");
  text.classList.add("text");
  text.innerText = content;

  let enter = document.createElement("br");

  let icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.classList.add("copy");
  icon.innerText = "file_copy";
  icon.addEventListener("click", copy);

  message.appendChild(text);
  message.appendChild(enter);
  message.appendChild(icon);
  bubble.appendChild(message);
  messages.appendChild(bubble);

  scroll();
}

function fetchMessages() {
  fetch(`data`)
    .then((data) => data.json())
    .then((data) => {
      data.forEach((e) => generateBubble(e));
    });
}

//Fetch messages from database
fetchMessages();
