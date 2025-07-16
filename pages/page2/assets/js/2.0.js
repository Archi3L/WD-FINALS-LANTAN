const terminal = document.getElementById("terminal");

const logs = [
  "> What are your hobbies?",
  ">> I love gaming, watching movies and anime, and listening to music 🎮🎬🌀🎧",


  "> What technical skills do you have?",
  ">> Understanding codes, errors and I excel in creativity 💻👨‍💻🧠",


  "> Do you enjoy coding?",
  ">> Absolutely! When creating a website with my ideas, I am very happy! 🧩 ",


  "> What other skill is just as important as technical ability",
  ">> Definitely communication and adaptability. You can be great at code, but if you can't work well with people or adjust to challenges, you're stuck. 🤝🧠",


  "> Do you prefer dark mode or light mode (and why is it dark mode 😎)",
  ">> Dark mode, because I think it represents me more.",


   ">  What's a tech project you'd love to build one day?",
  ">> I’d love to build a fully interactive AI-powered portfolio or a cybersecurity game that teaches users how to stay safe online. 🔐🎮💡",

];


let index = 0;

function showNextLine() {
  if (index < logs.length) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = logs[index];
    terminal.appendChild(line);
    index++;

    // Slightly longer delay after answers (empty string)
    const delay = logs[index - 1] === "" ? 500 : 600;
    setTimeout(showNextLine, delay);
  }
}

window.onload = showNextLine;
