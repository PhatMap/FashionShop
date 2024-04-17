import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import "../../App.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Popper } from "@mui/material";
import { getUserCart } from "../../actions/cartActions";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorE2, setAnchorE2] = React.useState(null);

  const openCart = Boolean(anchorE2);

  const handleCartOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorE2(null);
  };

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const categories = ["Trousers", "Shirt", "Dress", "Shoe", "Belt"];

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
  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
    }
  }, [dispatch, user]);

  const [isSticky, setIsSticky] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <nav
        className="navbar row"
        style={isSticky ? { position: "sticky", top: "0", zIndex: "1000" } : {}}
      >
        <div className="col-12 col-md-3 ">
          <div className="navbar-brand logo-container">
            <Link to="/">
              <img src="/images/vita.png" alt="No logo" />
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
            <FaBars style={{ fontSize: "30px", color: "white" }} />
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
            {categories.map((cate, index) => (
              <MenuItem key={index}>
                <Link
                  className="dropdown-item text-danger"
                  to={`/category/${cate}`}
                  onClick={() => {
                    setAnchorEl(false);
                  }}
                >
                  {cate}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Search />

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {/* Nút Shop */}
          <Link
            to="/shop"
            style={{ color: "white" }}
            className="btn shop_button"
          >
            Shop
          </Link>

          <Link to="/cart">
            <FaShoppingCart
              className="ml-3"
              style={{ fontSize: "30px", color: "white" }}
              onMouseEnter={handleCartOpen}
              onMouseLeave={handleCartClose}
            />
          </Link>
          <span
            className="ml-1"
            id="cart_count"
            style={{
              fontSize: "13px",
              borderRadius: "50%",
              background: "white",
              color: "black",
            }}
          >
            {user ? cartItems.length : 0}
          </span>

          <Popper className="cart" anchorEl={anchorE2} open={openCart}>
            {cartItems.map((item, index) => (
              <MenuItem key={index}>
                <div className="cart-MenuItem">
                  <img src={item.image} height="40" width="40" />
                  <div className="cart-MenuItem-container">
                    <p>Tên sản phẩm: {item.name.substring(0, 20)}...</p>
                    <p>Số lượng mua: {item.quantity}</p>
                    <div className="cart-summary-color">
                      <p>Màu:</p>
                      <p>{item.colorName}</p>
                      <div
                        style={{
                          backgroundColor: item.colorHex ?? "transparent",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </MenuItem>
            ))}
          </Popper>

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
