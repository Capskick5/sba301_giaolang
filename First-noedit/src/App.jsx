import { Routes, Route, Navigate } from 'react-router-dom';
import ShoesListPage from './pages/ShoesListPage';
import ShoesFormPage from './pages/ShoesFormPage';
import ShoesViewPage from './pages/ShoesViewPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shoes" />} />
      <Route path="/shoes" element={<ShoesListPage />} />
      <Route path="/shoes/add" element={<ShoesFormPage />} />
      <Route path="/shoes/view/:id" element={<ShoesViewPage />} />
    </Routes>
  );
}