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
            <h2 className="footer-heading">Shipping</h2>
            <p>Free shipping</p>
          </div>
          <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
            <h2 className="footer-heading">Refund policy</h2>
            <p>All product can be refund within 3 days</p>
          </div>
          <div className="col-md-6 col-lg-3">
            <h2 className="footer-heading">Contact</h2>
            <ul className="list-unstyled footer-list">
              <li>
                <span className="icon icon-map-marker"></span>
                <span className="text">Số 1 Võ Văn Ngân, TP. Thủ Đức</span>
              </li>
              <li>
                <span className="icon icon-phone"></span>
                <span className="text">+84 123456</span>
              </li>
              <li>
                <span className="icon icon-envelope"></span>
                <span className="text">phatmap234@gmail.com</span>
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
