import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import PrivyProviderWrapper from './providers/PrivyProviderWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProviderWrapper>
      <App />
    </PrivyProviderWrapper>
  </React.StrictMode>,
);

