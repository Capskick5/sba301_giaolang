
import { Button, Table } from 'react-bootstrap';

export default function ShoesTable({ shoes, pageInfo, onView, onEdit, onDelete }) {

  const startIndex = pageInfo.currentPage * pageInfo.pageSize;

  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-2">Shoes List</h5>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>No</th>
            <th>Shoes Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Price($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shoes.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found.
              </td>
            </tr>
          ) : (
            shoes.map((item, index) => (
              <tr key={item.shoesId}>
                <td>{startIndex + index + 1}</td>
                <td>{item.shoesName}</td>
                <td>{item.categoryName}</td>
                <td>{item.manufacturer}</td>
                <td>{item.price}</td>
                <td>
                  <Button
                    variant="link"
                    className="p-0 me-2 text-decoration-none"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </Button>
                  |
                  <Button
                    variant="link"
                    className="p-0 mx-2 text-decoration-none"
                    onClick={() => onView(item)}
                  >
                    View
                  </Button>
                  |
                  <Button
                    variant="link"
                    className="p-0 ms-2 text-decoration-none"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
