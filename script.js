
window.onload = () => {
  document.getElementsByClassName('content')[0].addEventListener('click', () => {
    // For now just trigger on any click
    // eventually we would take arguments with the ID or string of the city or something
    document.getElementById('infoCard').classList.toggle('visible');
  });
}
