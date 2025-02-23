window.onload = () => {
    // Selecciona el botón con la clase "start"
    const $startButton = document.querySelector('.start');
  
    // Verifica si el botón existe
    if (!$startButton) {
      console.error("No se encontró el botón con la clase 'start'.");
      return;
    }
  
    // Agrega un event listener para el clic en el botón
    $startButton.onclick = () => {
      // Obtiene la pestaña activa en la ventana actual
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          // Verifica si se encontró una pestaña activa
          if (tabs.length === 0) {
            console.error("No se encontró ninguna pestaña activa.");
            return;
          }
  
          // Envía un mensaje al content script en la pestaña activa
          chrome.tabs.sendMessage(
            tabs[0].id, // ID de la pestaña activa
            { injectApp: true }, // Mensaje a enviar
            (response) => {
              // Cierra la ventana emergente después de enviar el mensaje
              window.close();
            }
          );
        }
      );
    };
  };