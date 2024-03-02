import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../actions/productActions";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Don't forget to import the styles
import { useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([
    "../images/background_image_1.jpg",
    "../images/background_image_2.jpg",
    "../images/background_image_3.jpg",
    "../images/background_image_4.jpg",
  ]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const categories = ["Table", "Chair", "Bed", "Shelve", "Cabinet", "Light"];

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
    dispatch(getProducts(keyword, currentPage, price, category, rating));
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
  }, [dispatch, keyword, currentPage, price, category, rating, error]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex(
        (currentBackgroundIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentBackgroundIndex]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  // Sắp xếp danh sách sản phẩm theo đánh giá từ cao đến thấp
  const sortedProducts = [...products].sort((a, b) => b.ratings - a.ratings);

  // Chọn ra 3-4 sản phẩm đầu tiên trong danh sách đã sắp xếp
  const topRatedProducts = sortedProducts.slice(0, 4);

  return (
    <Fragment>
      <ToastContainer />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Real comfy"} />
          {/* Chèn ảnh trước tiêu đề "Latest Products" */}
          <img
            src={backgroundImages[currentBackgroundIndex]}
            alt="Last Product"
            style={{ width: "100%", maxHeight: "calc(500px + 20px)", margin: "50px auto", padding: "10px 0" }}
          />

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
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
                        range // Set range to true for a double-range slider
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
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

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {topRatedProducts.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
