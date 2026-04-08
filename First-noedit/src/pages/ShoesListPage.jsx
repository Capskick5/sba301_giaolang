import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shoesApi } from '../api/shoesApi';
import AppLayout from '../components/AppLayout';

export default function ShoesListPage() {
  const [shoesPage, setShoesPage] = useState({ content: [], totalPages: 0, currentPage: 0, totalElements: 0 });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ shoesName: '', categoryId: '' });

  useEffect(() => {
    shoesApi.getCategories().then(res => setCategories(res.data));
    // eslint-disable-next-line react-hooks/immutability
    fetchShoes(0);
  }, []);

  const fetchShoes = async (page) => {
    const res = await shoesApi.getShoesPage({ page, size: 5, ...filters });
    setShoesPage(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa?")) {
      await shoesApi.deleteShoe(id);
      fetchShoes(shoesPage.currentPage); // Load lại trang hiện tại
    }
  };

  return (
    <AppLayout>
      <h3>Shoes List</h3>
      
      {/* Tìm kiếm */}
      <div>
        Category: 
        <select onChange={(e) => setFilters({...filters, categoryId: e.target.value})}>
          <option value="">All</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}
        </select>
        Shoes Name: 
        <input type="text" onChange={(e) => setFilters({...filters, shoesName: e.target.value})} />
        <button onClick={() => fetchShoes(0)}>Filter</button>
      </div>

      <div style={{ textAlign: 'right', margin: '10px 0' }}>
        <Link to="/shoes/add"><button>Add New</button></Link>
      </div>

      {/* Bảng dữ liệu */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shoesPage.content.map((shoe, index) => (
            <tr key={shoe.shoesId}>
              <td>{(shoesPage.currentPage * 5) + index + 1}</td>
              <td>{shoe.shoesName}</td>
              <td>{shoe.categoryName}</td>
              <td>{shoe.manufacturer}</td>
              <td>{shoe.price}</td>
              <td>
                <button onClick={() => handleDelete(shoe.shoesId)}>Delete</button> | 
                <Link to={`/shoes/view/${shoe.shoesId}`}><button>View</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div style={{ marginTop: '10px' }}>
        <span>Show {shoesPage.content.length} of {shoesPage.totalElements} records</span>
        <div style={{ float: 'right' }}>
          <button disabled={shoesPage.first} onClick={() => fetchShoes(shoesPage.currentPage - 1)}>Prev</button>
          <span> Page {shoesPage.currentPage + 1} / {shoesPage.totalPages} </span>
          <button disabled={shoesPage.last} onClick={() => fetchShoes(shoesPage.currentPage + 1)}>Next</button>
        </div>
      </div>
    </AppLayout>
  );
}