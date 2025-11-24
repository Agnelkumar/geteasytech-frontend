import React, { useEffect, useState } from 'react';
import Compare from '../components/Compare';
import axios from 'axios';

const UserPortal = () => {
  const [products, setProducts] = useState([]);


    // LIST
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load products");
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
  return (
    <>
      {/* Navbar */}
      <div style={{
        background: '#1e88e5',
        color: '#fff',
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        <div>GetEasyTech</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2rem',
          textAlign: 'center',
          padding: '10px 20px',
          fontWeight: 'normal'
        }}>
          {localStorage.getItem('username')}
          <button
            onClick={() => {
              localStorage.removeItem('username');
              window.location.href = '/';
            }}
            style={{
              marginLeft: 20,
              backgroundColor: '#1864c4',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <div style={{
          width: 200,
          background: '#f1f3f4',
          paddingTop: 20,
          fontSize: '1.2rem',
          padding: '12px 10px',
          color: '#333',
          fontWeight: 'bold',
          backgroundColor: '#e0f0ff',
          borderLeft: '4px solid #1e88e5'
        }}>
          Comparison
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 20 }}>
          <Compare products={products} />
        </div>
      </div>
    </>
  );
};

export default UserPortal;