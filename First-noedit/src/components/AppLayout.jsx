
export default function AppLayout({ children }) {

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Long</h1> 
      </div>
      <hr /> {}
      
      <main>
        {children} {}
      </main>
    </div>
  );
}