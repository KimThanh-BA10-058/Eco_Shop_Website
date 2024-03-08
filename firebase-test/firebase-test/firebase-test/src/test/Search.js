import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getData");
        setData(response.data);
        console.log(response.data)
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
    console.log((query.toLowerCase()))
    setFilteredProducts(result);
  }
  return (
    <div className="app">
      <h1>Tìm kiếm sản phẩm</h1>
      <SearchBar onSearch={handleSearch} />
      <ProductList data={filteredProducts} />
    </div>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");


  function handleChange(e) {
    // Cập nhật trạng thái của query
    setQuery(e.target.value);
    // Gọi hàm onSearch truyền vào giá trị của query
    onSearch(e.target.value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Nhập tên sản phẩm..."
      />
    </div>
  );
}

function ProductList({ data }) {
  return (
    <div className="product-list">
      {data.map((product) => (
        <div className="product-item" key={product.id}>
          <h3>{product.Name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Search;
