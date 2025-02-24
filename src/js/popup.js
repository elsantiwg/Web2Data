// Ejecuta este código cuando la ventana emergente (popup) se haya cargado completamente.
window.onload = () => {
    // Selecciona el botón "Render App" del DOM.
    const $startButton = document.querySelector('.start');
  
    // Verifica si el botón existe en el DOM.
    if (!$startButton) {
      console.error('El botón "Render App" no fue encontrado en el DOM.');
      return;
    }
  
    // Agrega un evento de clic al botón "Render App".
    $startButton.onclick = () => {
      // Obtiene la pestaña activa en la ventana actual del navegador.
      chrome.tabs.query(
        {
          active: true, // Solo busca la pestaña activa.
          currentWindow: true, // Solo busca en la ventana actual.
        },
        (tabs) => {
          // Verifica si se encontró una pestaña activa.
          if (tabs.length === 0) {
            console.error('No se encontró una pestaña activa.');
            return;
          }
  
          // Envía un mensaje al content script en la pestaña activa.
          chrome.tabs.sendMessage(
            tabs[0].id, // ID de la pestaña activa.
            { injectApp: true }, // Mensaje que se envía al content script.
            (response) => {
              // Cierra la ventana emergente después de enviar el mensaje.
              window.close();
            }
          );
        }
      );
    };
  };