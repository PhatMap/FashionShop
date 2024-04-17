import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Product from '../product/Product';
import Loader from '../layout/Loader';

const Color = () => {
  const { color: urlColor } = useParams(); // Lấy màu từ URL và đổi tên biến thành urlColor
  const [selectedColor, setSelectedColor] = useState(urlColor || ""); // State để lưu màu được chọn
  const colors = ["black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "gray"]; // Danh sách màu
  const navigate = useNavigate();
  const {
    loading,
    products: allProducts,
    error,
  } = useSelector(state => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cập nhật danh sách sản phẩm khi màu được chọn thay đổi
  useEffect(() => {
    if (!loading && allProducts && selectedColor) {
      const matchedProducts = allProducts.filter(product =>
        product.colors && product.colors.colorName &&
        product.colors.colorName.toLowerCase() === selectedColor.toLowerCase()
      );
      setFilteredProducts(matchedProducts);
    }
  }, [allProducts, selectedColor, loading]);

  // Cập nhật màu được chọn khi URL thay đổi
  useEffect(() => {
    if (urlColor && urlColor !== selectedColor) {
      setSelectedColor(urlColor);
      navigate(`/Shop/color/${urlColor}`);
    }
  }, [urlColor, navigate, selectedColor]);

  // Xử lý khi màu được chọn thay đổi
  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    navigate(`/Shop/color/${newColor}`); // Đổi URL để phản ánh màu mới được chọn
  };

  return (
    <Fragment>
      <MetaData title={`Products in ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`} />
      <div className="container mt-5">
        <select className="form-control mb-4" value={selectedColor} onChange={(e) => handleColorChange(e.target.value)}>
          <option value="">Select a Color</option>
          {colors.map(color => (
            <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
          ))}
        </select>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <h1>Products in {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}</h1>
            <div className="row">
              {filteredProducts.length > 0 ? filteredProducts.map(product => (
                <Product key={product._id} product={product} />
              )) : <p>No products found for this color.</p>}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Color;
