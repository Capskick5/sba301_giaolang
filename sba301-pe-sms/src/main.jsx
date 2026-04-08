/**
 * Mục đích file:
 * - Điểm khởi động của ứng dụng React.
 * - Nạp Bootstrap CSS toàn cục.
 * - Render App vào thẻ #root.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
