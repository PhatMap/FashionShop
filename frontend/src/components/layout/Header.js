import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import "../../App.css";
import { getProductsByCategory } from "../../actions/productActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const history = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const categories = ["Table", "Chair", "Bed", "Shelve", "Cabinet", "Light"];

  const logoutHandler = () => {
    toast.error("Logged out successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(logout());
  };

  const getCategory = (category) => {
    setAnchorEl(false);
    history(`/category/${category}`);
    dispatch(getProductsByCategory(category));
  };

  useEffect(() => {
    console.log("Component updated");
    return () => {
      console.log("Cleanup");
    };
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <nav className="navbar row">
        <div className="col-12 col-md-3 ">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/a.png" alt="No logo" />
            </Link>
          </div>

          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="menu-button"
          >
            <FaBars style={{ fontSize: "30px", color: "#333" }} /> Category
          </button>
          <Menu
          
            className="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {categories.map((category, index) => (
              <MenuItem>
                <Link
                  className="dropdown-item text-danger"
                  to={`/category/${category}`}
                  onClick={() => getCategory(category)}
                  key={index}
                >
                  {category}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <FaShoppingCart
              className="ml-3"
              style={{ fontSize: "30px", color: "#ffb700" }}
            />
            <span
              className="ml-1"
              id="cart_count"
              style={{
                fontSize: "13px",
                borderRadius: "50%",
                background: "#ffb700",
                color: "white",
              }}
            >
              {user ? cartItems.length : 0}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
