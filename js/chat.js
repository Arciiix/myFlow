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
    //FETCH TO SERVER TO ADD MESSAGE TO THE DB

    //Create a new chat bubble
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");

    let message = document.createElement("span");
    message.classList.add("message");

    let text = document.createElement("text");
    text.classList.add("text");
    text.innerText = value;

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

    //DEV
    scroll();
    //(add smooth scrolling)
  }
}

//DEV
//CREATING INITIAL BUBBLES
//Create a new chat bubble
for (let i = 0; i < 10; i++) {
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");

  let message = document.createElement("span");
  message.classList.add("message");

  let text = document.createElement("text");
  text.classList.add("text");
  text.innerText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec metus vitae turpis malesuada facilisis sit amet eu ligula. Proin egestas gravida orci at bibendum. Etiam non nulla aliquam, ultrices sem et, gravida dui. Pellentesque porta pellentesque est, quis porttitor felis hendrerit sed. Maecenas imperdiet efficitur ante, in consequat metus convallis eu. Quisque ut ullamcorper sem. Sed fringilla nisl lectus, ut pretium turpis faucibus sed. Ut nec mauris vitae magna interdum sagittis sed at nisl.";

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
