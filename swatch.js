// Function to update the Swatch Internet Time
function updateSwatchTime() {
    const swatchTime = getSwatchTime();
    document.getElementById('swatch-time').textContent = swatchTime;
}

// Function to get the Swatch Internet Time
function getSwatchTime() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const tzoff = 60 + d.getTimezoneOffset();
    const beats = ('000' + Math.floor((h * 3600 + (m + tzoff) * 60 + s) / 86.4) % 1000).slice(-3);
    return `@${beats}`;
}

// Set up the initial theme
document.body.classList.add('theme-dark');

// Update the clocks every second
setInterval(updateSwatchTime, 1000);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Show a custom installation prompt or button
});

// Function to show the installation prompt
function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
}