import React from 'react';
// import ReactDOM from 'react-dom';
// @ts-ignore
import App from './App.tsx';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);