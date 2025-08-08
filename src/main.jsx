// import './consoleiq.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
          <App />
    
        <Toaster position='bottom-left' />
        {/* <Feedback projectSecret="cmap09nbk0003jf0z1dajc5if"  apiEndpoint='https://feedaura.feedaura-ai.workers.dev/feedbacks'/> */}
     
  </StrictMode>
);
