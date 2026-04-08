import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shoesApi } from '../api/shoesApi';
import AppLayout from '../components/AppLayout';

export default function ShoesViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    shoesApi.getShoeById(id).then(res => setShoe(res.data));
  }, [id]);

  if (!shoe) return <p>Loading...</p>;

  return (
    <AppLayout>
      <h3>VIEW DETAILS</h3>
      <p><strong>Shoes Name:</strong> {shoe.shoesName}</p>
      <p><strong>Manufacturer:</strong> {shoe.manufacturer}</p>
      <p><strong>Type:</strong> {shoe.categoryName}</p>
      <p><strong>Price:</strong> {shoe.price}</p>
      <p><strong>Production date:</strong> {shoe.productionDate}</p>
      <p><strong>Import Date:</strong> {shoe.importDate}</p>
      
      <button onClick={() => navigate('/shoes')}>Back</button>
    </AppLayout>
  );
}