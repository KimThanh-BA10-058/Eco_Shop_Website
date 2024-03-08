// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ProductListByCategory() {
//   const { category } = useParams();
//   const searchParams = new URLSearchParams(document.location.search);
//   console.log(searchParams.get('category'))
//   const [products, setProducts] = useState([]);
//     console.log(category)
//   useEffect(() => {
//     async function fetchData() {
//         try {
//           const response = await axios.get(`http://localhost:8081/getData/${category}`);
//           setProducts(response.data);
//         } catch (error) {
//           console.error('Error fetching order detail:', error);
//         }
//       }
  
//       fetchData();
//     }, []);

//   return (
//     <div>
//       <h2>Danh sách sản phẩm theo danh mục: {category}</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.ID}>{product.Name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductListByCategory;
