import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

fetch('/version.json')
  .then(res => res.json())
  .then(remoteVersion => {
    const currentVersion = localStorage.getItem('app_version');
    if (currentVersion !== remoteVersion.version) {
      localStorage.setItem('app_version', remoteVersion.version);
      window.location.reload(true);
    }
  });
