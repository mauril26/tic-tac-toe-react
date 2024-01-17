import ReactDOM from 'react-dom/client';

import App from './App.js';
import './index.css';

const element = document.getElementById('root'); 

if (element)
  ReactDOM.createRoot(element).render(<App />);
