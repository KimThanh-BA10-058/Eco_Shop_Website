import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background-color: lightgray;
  }
`;

const DropdownImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const DropdownName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

function Searchh() {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getData");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  function handleSearch(query) {
    if (!Array.isArray(data)) {
      return;
    }
    // Lọc các sản phẩm có tên chứa query (không phân biệt hoa thường)
    const result = data.filter((product) =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(result);
    setQuery(query);
  }

  return (
    <SearchContainer>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Nhập tên sản phẩm..."
        style={{
          width: '300px',
          height: '10px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          fontSize: '16px',
          outline: 'none',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        }}
      />
      {filteredProducts.length > 0 && (
        <DropdownContainer>
          {filteredProducts.map((product) => (
            <DropdownItem key={product.ID}>
              <DropdownImage src={product.image} />
              <DropdownName>{product.Name}</DropdownName>
              <Link to={`/product/?id=${product.ID}`}>
                <SearchOutlined />
              </Link>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
    </SearchContainer>
  );
}

export default Searchh;
