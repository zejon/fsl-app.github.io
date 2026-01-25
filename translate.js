window.onload = function() {
  // Get the video element from the DOM
  const video = document.getElementById('videoElement');
  const errorMessage = document.getElementById('errorMessage');

  // Checks if the browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Define the constraints for the media stream, requesting video
    const constraints = { video: true };

    // Request access to the user's camera
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        // If works, the camera connects to the video element
        video.srcObject = stream;
        video.style.display = 'block'; // Ensure video is visible
        errorMessage.style.display = 'none'; // Hide error message
      })
      .catch((err) => {
        // if it does not work, hide the video element and display an error message
        console.error('An error occurred: ' + err);
        video.style.display = 'none'; 
        errorMessage.style.display = 'block'; 
        
        // if error message will be displayed
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMessage.textContent = 'Camera access was denied. Please allow camera access in your browser settings to use this feature.';
        } else if (err.name === 'NotFoundError') {
          errorMessage.textContent = 'No camera found on this device.';
        } else {
          errorMessage.textContent = 'An error occurred while accessing the camera.';
        }
      });
  } else {
    // If getUserMedia is not supported, show this message
    video.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Your browser does not support camera access. Please try a different browser.';
  }

let deferredPrompt;
  const popup = document.getElementById('install-popup');
  const installBtn = document.getElementById('popup-install-btn');
  const closeBtn = document.getElementById('popup-close');

  // 1. Detect if the device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 2. Listen for the browser's install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the default mini-infobar from appearing
      e.preventDefault();
      // Save the event so it can be triggered later
      deferredPrompt = e;

      // Only show our custom banner if on mobile and not already installed
      if (isMobile && !localStorage.getItem('pwa_dismissed')) {
          popup.style.display = 'flex';
      }
  });

  // 3. Handle the install button click
  installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User choice: ${outcome}`);
          deferredPrompt = null;
          banner.style.display = 'none';
      }
  });

  // 4. Handle closing the banner
  closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      // Optional: Don't show again for 24 hours
      // localStorage.setItem('pwa_dismissed', 'true');
  });

};

