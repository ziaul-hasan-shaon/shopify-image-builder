// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { PageProvider } from './Imagebuilder/hook/PageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <PageProvider>
        <App />
      </PageProvider>
    </ChakraProvider>
  </React.StrictMode>
);

