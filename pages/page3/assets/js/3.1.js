let showingUST = true;

function toggleCollege() {
  const ust = document.querySelector('.ust-content');
  const feu = document.querySelector('.feu-content');

  if (showingUST) {
    ust.classList.remove('active');
    feu.classList.add('active');
  } else {
    feu.classList.remove('active');
    ust.classList.add('active');
  }

  showingUST = !showingUST;
}
