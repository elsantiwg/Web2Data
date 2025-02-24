// Importa React y ReactDOM para construir y renderizar la aplicación.
import React from 'react';
import ReactDOM from 'react-dom';

// Importa el componente Button desde la carpeta de componentes.
import Button from './components/Button';

// Define el componente principal de la aplicación.
class App extends React.Component {
  render() {
    return (
      <div>
        {/* Mensaje que confirma que la aplicación se inyectó correctamente. */}
        Your App injected to DOM correctly!
        {/* Renderiza el componente Button. */}
        <Button />
      </div>
    );
  }
}

// Escucha los mensajes enviados desde el popup o el background script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Verifica si el mensaje recibido es para inyectar la aplicación.
  if (request.injectApp) {
    // Inyecta la aplicación en el DOM.
    injectApp();

    // Envía una respuesta al popup confirmando que la extensión se inició.
    sendResponse({
      startedExtension: true,
    });
  }

  // Devuelve true para indicar que se espera una respuesta asíncrona.
  return true;
});

// Función para inyectar la aplicación React en el DOM.
function injectApp() {
  // Crea un nuevo contenedor div para la aplicación.
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'chromeExtensionReactApp');

  // Agrega el contenedor al final del body de la página.
  document.body.appendChild(appContainer);

  // Renderiza la aplicación React dentro del contenedor.
  ReactDOM.render(<App />, appContainer);
}