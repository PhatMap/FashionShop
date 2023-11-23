import React from "react";

const Footer = () => {
  return (
    <footer className="ftco-footer ftco-section">
      <div className="footer-container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
            <h2 className="footer-heading">DecoNest</h2>
            <p className="footer-text">
              DecoNest decorates your nest with comfort and style.
            </p>
            <ul className="ftco-footer-social list-unstyled">
              <li>
                <a href="#" className="icon-twitter"></a>
              </li>
              <li>
                <a href="#" className="icon-facebook"></a>
              </li>
              <li>
                <a href="#" className="icon-instagram"></a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
            <h2 className="footer-heading">Menu</h2>
            <ul className="list-unstyled footer-list">
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Journal</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
            <h2 className="footer-heading">Help</h2>
            <ul className="list-unstyled footer-list">
              <li>
                <a href="#">Shipping Information</a>
              </li>
              <li>
                <a href="#">Returns & Exchange</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <h2 className="footer-heading">About us</h2>
            <ul className="list-unstyled footer-list">
              <li>
                <span className="icon icon-map-marker"></span>
                <span className="text">Số 1 Võ Văn Ngân, TP. Thủ Đức</span>
              </li>
              <li>
                <span className="icon icon-phone"></span>
                <span className="text">+84 0556 3702</span>
              </li>
              <li>
                <span className="icon icon-envelope"></span>
                <span className="text">phattaiprokute@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="footer-text">
              DecoNest &copy; 2023. All Rights Reserved.
            </p>
          </div> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
