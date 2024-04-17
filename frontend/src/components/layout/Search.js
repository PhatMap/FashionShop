import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const history = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef(null);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history("/");
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  return (
    <form onSubmit={searchHandler}>
      <div style={{ display: "flex" }}>
        <div className="find-input">
          {showInput && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Product Name ..."
              style={{
                borderRadius: "50px",
                backgroundColor: "transparent",
                color: "white",
                width: "400px",
                placeholderTextColor: "white",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler(e); 
                }
              }}
            />
          )}
          {keyword && showInput && (
            <div>
              <button className="remove-btn" onClick={() => setKeyword("")}>
                <i className="fa fa-remove" aria-hidden="true"></i>
              </button>
            </div>
          )}
          {!showInput && (
            <div>
              <button
                id="search_btn"
                className="btn-find"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "black",
                  borderWidth: "5px",
                  borderColor: "white",
                }}
                onClick={toggleInput}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Search;
