import React, { useState } from "react";

const Home = () => {
  const [backgroundImages, setBackgroundImages] = useState([
    "../images/background_image_1.jpg",
    "../images/background_image_2.jpg",
    "../images/background_image_3.jpg",
    "../images/background_image_4.jpg",
  ]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  return (
    <div>
      {/* Hiển thị hình ảnh từ mảng backgroundImages */}
      <img
        src={backgroundImages[currentBackgroundIndex]}
        alt="Background Image"
        style={{ width: "100%", maxHeight: "500px" }}
      />
    </div>
  );
};

export default Home;
