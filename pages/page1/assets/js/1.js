const chat = document.getElementById("chat");

const conversation = [
  { question: "What’s your name?", answer: "My name is Archi Clemenz C. Lantan 😄" },
  { question: "What school are you studying in?", answer: "I'm currently studying at Far Eastern University Institute of Technology 🐃" },
  { question: "What’s your course and specialization?", answer: "I’m taking BS Information Technology, specialized in Cybersecurity 🛡️" },
  { question: "Where are you from?", answer: "I live in Pasig City, Metro Manila 🇵🇭" },
  { question: "What’s your dream?", answer: "To graduate and apply for my dream job!" }
];

let index = 0;

function typeMessage(text, targetDiv, i = 0, callback) {
  if (i < text.length) {
    const span = document.createElement("span");
    span.textContent = text[i];
    targetDiv.appendChild(span);
    setTimeout(() => typeMessage(text, targetDiv, i + 1, callback), 30);
  } else if (callback) {
    setTimeout(callback, 400);
  }
}

function showNextPair() {
  if (index < conversation.length) {
    const q = document.createElement("div");
    q.className = "message question";
    chat.appendChild(q);

    typeMessage(conversation[index].question, q, 0, () => {
      const typing = document.createElement("div");
      typing.className = "typing";
      typing.textContent = "...";
      chat.appendChild(typing);

      setTimeout(() => {
        typing.remove();

        const a = document.createElement("div");
        a.className = "message answer";
        chat.appendChild(a);

        typeMessage(conversation[index].answer, a, 0, () => {
          index++;
          setTimeout(showNextPair, 600);
        });
      }, 1000);
    });
  }
}

window.onload = showNextPair;
