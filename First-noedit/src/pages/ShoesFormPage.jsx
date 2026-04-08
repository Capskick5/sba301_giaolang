import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shoesApi } from '../api/shoesApi';
import AppLayout from '../components/AppLayout';
import { validateShoesForm } from '../utils/validation';

export default function ShoesFormPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    shoesName: '', price: '', manufacturer: '', categoryId: '', productionDate: '', importDate: ''
  });
  const {id} = useParams();
  const [errors, setErrors] = useState({});

useEffect(() => {
    shoesApi.getCategories().then(res => setCategories(res.data));
  }, []);



const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    const validationErrors = validateShoesForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    try {
      // 2. Ép kiểu và bẫy quantity
      const payload = { 
        ...formData, 
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        quantity: 0 
      };

      // 3. Chỉ còn 1 hành động duy nhất là Create (POST)
      await shoesApi.createShoe(payload);
      alert("Thêm mới thành công!");
      navigate('/shoes');

    } catch (err) {
      console.error(err);
      alert("Thêm mới thất bại. Hãy kiểm tra Backend!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

 return (
    <AppLayout>
      <h3>Add New Shoes</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Shoes Name:</p>
          <input name="shoesName" value={formData.shoesName} onChange={handleChange} />
          {errors.shoesName && <div style={{color:'red', fontSize:'12px'}}>{errors.shoesName}</div>}
        </div>

        <div>
          <p>Price:</p>
          <input name="price" type="number" value={formData.price} onChange={handleChange} />
          {errors.price && <div style={{color:'red', fontSize:'12px'}}>{errors.price}</div>}
        </div>

        <div>
          <p>Category:</p>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
            <option value="">Select...</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}
          </select>
          {errors.categoryId && <div style={{color:'red', fontSize:'12px'}}>{errors.categoryId}</div>}
        </div>

        <div>
          <p>Manufacturer:</p>
          <input name="manufacturer" type="text" value={formData.manufacturer} onChange={handleChange} />
          {errors.manufacturer && <div style={{color:'red', fontSize:'12px'}}>{errors.manufacturer}</div>}
        </div>

        <div>
          <p>Production Date:</p>
          <input name="productionDate" type="date" value={formData.productionDate} onChange={handleChange} />
        </div>

        <div>
          <p>Import Date:</p>
          <input name="importDate" type="date" value={formData.importDate} onChange={handleChange} />
        </div>

        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/shoes')}>Back</button>
      </form>
    </AppLayout>
  );
}