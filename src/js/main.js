import React from 'react';
import ReactDOM from 'react-dom';
// Componente principal de la aplicación
class App extends React.Component {
    render() {
      return (
        <div style={styles.appContainer}>
          <h1>¡Tu aplicación se ha inyectado correctamente!</h1>
          <p>Web2Data está funcionando como debería.</p>
        </div>
      );
    }
  }
  
// Estilos para el componente
const styles = {
    appContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#ffffff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
    },
  };


// Escucha los mensajes enviados desde el popup o el background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Si el mensaje es "injectApp"
  if (request.injectApp) {
    // Inyecta la aplicación en el DOM y envía una respuesta
    injectApp();
    sendResponse({ startedExtension: true });
  }
});

// Función para inyectar la aplicación en el DOM
function injectApp() {
  // Crea un nuevo div para la aplicación
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'chromeExtensionReactApp');
  // Agrega el div al cuerpo del documento
  document.body.appendChild(appContainer);
  // Renderiza la aplicación de React en el nuevo div
  ReactDOM.render(<App />, appContainer);
  console.log('La aplicación se ha inyectado correctamente.');
}