import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState(""); 
  
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("");
  const [colorsSelected, setColorsSelected] = useState([]);
  
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["", "Trousers", "Shirt", "Dress", "Shoe", "Belt"];
  const sizeType = ["", "XS", "S", "M", "L", "XL", "XXL"];

  const dispatch = useDispatch();
  const colors = [
    { colorName: "black", colorHex: ["#222222", "#111111", "#000000"] },
    { colorName: "white", colorHex: ["#FFFFFF", "#F8F8F8", "#F0F0F0"] },
    { colorName: "red", colorHex: ["#FF0000", "#E60000", "#CC0000"] },
    { colorName: "blue", colorHex: ["#0000FF", "#0000CC", "#000099"] },
    { colorName: "green", colorHex: ["#00FF00", "#00E600", "#00CC00"] },
    { colorName: "yellow", colorHex: ["#FFFF00", "#FFFF33", "#FFFF66"] },
    { colorName: "orange", colorHex: ["#FFA500", "#FF8C00", "#FF7F50"] },
    { colorName: "purple", colorHex: ["#800080", "#9932CC", "#9400D3"] },
    { colorName: "pink", colorHex: ["#FFC0CB", "#FFB6C1", "#FF69B4"] },
    { colorName: "gray", colorHex: ["#808080", "#A9A9A9", "#C0C0C0"] },
    // Add other colors as needed
  ];
  

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const productId = id;

  useEffect(() => {
      if (!product || (product && product._id !== productId) || isUpdated) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setColorsSelected(product.colors || []);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setSeller(product.seller);
        setStock(product.stock);
        setOldImages(product.images);
        setSizes(product.sizes);
      }

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
        dispatch(clearErrors());
      }

      if (updateError) {
        toast.error(updateError, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(clearErrors());
      }

      if (isUpdated) {
        history("/admin/products");
        toast.success("Product updated successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
  }, [dispatch, error, isUpdated, updateError, product, productId]);

  const addSize = () => {
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] === size) {
        return;
      }
    }
    setSizes((oldArray) => [...oldArray, size]);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    colorsSelected.forEach((color, index) => {
      formData.append(`colors[${index}][colorName]`, color.colorName);
      formData.append(`colors[${index}][colorHex]`, color.colorHex);
    });
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    sizes.forEach((size, index) => {
      formData.append(`sizes[${index}]`, size);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const addColor = () => {
    if (!colorName || !colorHex) {
      alert("Vui lòng chọn tên và mã màu.");
      return;
    }
  
    // Thêm màu mới vào mảng colorsSelected
    setColorsSelected(prevColors => [...prevColors, { colorName, colorHex }]);
    
    // Reset giá trị đã chọn để người dùng có thể thêm màu mới
    setColorName("");
    setColorHex("");
  };
  
  

  const handleColorNameChange = (e) => {
    setColorName(e.target.value);
    // Reset hex value when color name changes
    setColorHex("");
  };
  const handleColorHexChange = (e) => {
    setColorHex(e.target.value);
  };
  const removeColor = (indexToRemove) => {
    setColorsSelected(colorsSelected.filter((_, index) => index !== indexToRemove));
  };
  


  return (
    <Fragment>
      <ToastContainer />
      <MetaData title={"Update Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                <label htmlFor="color_name_field">Color Name</label>
                <select
                  id="color_name_field"
                  className="form-control"
                  value={colorName}
                  onChange={handleColorNameChange}
                >
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color.colorName} value={color.colorName}>
                      {color.colorName}
                    </option>
                  ))}
                </select>
              </div>

                {colorName && (
                  <div className="form-group">
                    <label htmlFor="color_hex_field">Color Hex</label>
                    <div id="color_hex_field" className="d-flex flex-wrap">
                      {colors.find(color => color.colorName === colorName)?.colorHex.map((hex, index) => (
                        <div key={index} 
                            style={{ backgroundColor: hex, width: '36px', height: '36px', margin: '4px', cursor: 'pointer' }}
                            onClick={() => setColorHex(hex)}>
                        </div>
                      ))}
                    </div>
                  </div>  
                )}

                <div className="form-group">
                  <button type="button" onClick={addColor}>Add Color</button>
                </div>

                {colorsSelected.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    {colorsSelected.map((color, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div style={{ minWidth: '100px', marginRight: '10px' }}>{color.colorName}</div>
                        <div style={{ 
                          width: '20px', 
                          height: '20px', 
                          backgroundColor: color.colorHex, 
                          border: '1px solid #ddd', 
                          marginRight: '10px'
                        }} />
                        <div style={{ flex: '1' }}></div> {/* Phần tử trống để căn chỉnh */}
                        <button onClick={() => removeColor(index)} style={{ cursor: 'pointer' }}>Xóa</button>
                      </div>
                    ))}
                  </div>
                )}


                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="sizes_field">Sizes</label>
                  <p>
                    Here
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </p>
                  <select
                    className="form-control"
                    id="sizes_field"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizeType.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={addSize}>
                    Add
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
