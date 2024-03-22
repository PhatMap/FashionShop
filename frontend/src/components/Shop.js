import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import ProductCarousel from "./layout/Carousel";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [cols, setCols] = useState(4); // Số cột cho sản phẩm

  const categories = [  "Trousers","Shirt","Dress","Shoe","Belt",];
  
  // Sử dụng hook useNavigate để thực hiện chuyển hướng
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, rating));
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [dispatch, keyword, currentPage, price, rating, error]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryClick = (selectedCategory) => {
    // Thực hiện chuyển hướng đến trang Search với từ khóa là danh mục được chọn
    navigate(`/category/${selectedCategory}`);
  };

  // Render danh sách sản phẩm
  const renderProducts = () => {
    return (
      <div className="row">
        {products.map((product) => (
          <Product key={product._id} product={product} col={cols} className="product-item" />
        ))}
      </div>
    );
  };

  // Nếu không tìm kiếm, hiển thị 4 sản phẩm 1 hàng
  const defaultProductsGrid = (
    <div className="row">
      {renderProducts()}
    </div>
  );

  // Kiểm tra nếu có từ khóa tìm kiếm
  const isSearchKeyword = keyword && keyword.trim() !== "";

  // Số sản phẩm hiển thị tùy thuộc vào việc tìm kiếm
  const productsGrid = isSearchKeyword ? renderProducts() : defaultProductsGrid;

  // Tính toán số lượng sản phẩm
  let count = productsCount;
  if (isSearchKeyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      <ToastContainer />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Shop"} />
          <h1
            id="products_heading"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              textTransform: "uppercase",
              margin: "20px 0",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Shop
          </h1>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-3" style={{ marginRight: '-150px' }}>
                {/* Slider, Categories, and Ratings */}
                <div className="px-2" style={{ width: "200px", marginLeft: '-140px' }}>
                  <Slider
                    marks={{
                      1: `$1`,
                      1000: `$1000`,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(values) =>
                      values.map((value) => `$${value}`)
                    }
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    range
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                  <hr className="my-5" />
                  <div className="mt-5" style={{ textAlign: 'left', overflowX: 'auto' }}>
                    <h4 className="mb-3" style={{ marginLeft: '5px', marginBottom: '10px' }}>Categories</h4>
                    <ul className="pl-0" style={{ whiteSpace: 'nowrap' }}>
                      {categories.map((category) => (
                        <li
                          style={{
                            cursor: "pointer",
                            display: 'block',
                            marginBottom: '10px',
                          }}
                          key={category}
                          onClick={() => handleCategoryClick(category)} // Sử dụng hàm handleCategoryClick khi nhấp vào danh mục
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className="my-3" />
                  <div className="mt-5">
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          style={{
                            cursor: "pointer",
                            listStyleType: "none",
                          }}
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${star * 20}%`,
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                {/* Products */}
                <section id="products">
                  {productsGrid}
                </section>
                {resPerPage <= count && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
