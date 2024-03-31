import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    // Fetch latest products
    const fetchLatestProducts = async () => {
      const { data } = await axios.get('/api/v1/products?sort=-createdAt&limit=6');
      setLatestProducts(data.products);
    };

    // Fetch top rated products
    const fetchTopRatedProducts = async () => {
      const { data } = await axios.get('/api/v1/products?rating[gte]=4&limit=6');
      setTopRatedProducts(data.products);
    };

    fetchLatestProducts();
    fetchTopRatedProducts();
  }, []);

  const renderProductSection = (products, sectionTitle) => (
    <div>
      <h2>{sectionTitle}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products.slice(0, 6).map((product) => (
          <div key={product._id} style={{ flex: '1 0 30%', margin: '10px', position: 'relative' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            {sectionTitle === 'Latest Products' && (
              <span style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'red', color: 'white', padding: '5px' }}>Mới</span>
            )}
            <div>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <Link to="/shop">Show More</Link>
      </div>
    </div>
  );

  return (
    <div className="container">
      {renderProductSection(latestProducts, 'Latest Products')}
      {renderProductSection(topRatedProducts, 'Top Rated Products')}
    </div>
  );
};

export default Home;
