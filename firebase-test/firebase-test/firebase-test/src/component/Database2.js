import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import { useParams } from 'react-router-dom';
import UpdateProductModal from './UpdateProductModal'; // Import component

const { TextArea } = Input;

const Database2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Brand', brand);
    formData.append('Price', price);
    formData.append('Description', description);
    formData.append('quantity', quantity);
    formData.append('image', file);

    try {
      const response = await axios.post(
        'http://localhost:8081/addproducts',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Dữ liệu đã được gửi thành công');
    } catch (error) {
      console.log('Lỗi khi gửi dữ liệu:', error);
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8081/getData')
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error('Error fetching data', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteProduct/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // State và hàm cho modal cập nhật sản phẩm
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showUpdateModal = (product) => {
    if (product.ID) { // Kiểm tra trường ID trước khi mở modal
      setSelectedProduct(product);
      setUpdateModalVisible(true);
    } else {
      console.error("Product ID is undefined or missing");
    }
  };
  

  const handleUpdateModalCancel = () => {
    setUpdateModalVisible(false);
  };
 
  const handleUpdateProduct = async (updatedData) => {
console.log(selectedProduct.ID)
    if (selectedProduct && selectedProduct.ID) {
      try {
        const response = await axios.post(`http://localhost:8081/updateProduct/${selectedProduct.ID}`, updatedData);
        console.log(response.data.message);
        setUpdateModalVisible(false);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      console.error("Product ID is undefined or missing");
    }
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
        <Modal
          title="Add Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input
            placeholder="Add product Name"
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <input
            placeholder="Add product Brand"
            onChange={(e) => setBrand(e.target.value)}
            name="Brand"
          />
          <input
            placeholder="Add product Price"
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <TextArea
            placeholder="Add Description"
            allowClear
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            style={{ width: '60%' }}
          />
          <input
            filename={file}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <input
            placeholder="Add product quantity"
            onChange={(e) => setQuantity(e.target.value)}
            name="quantity"
          />
          <button onClick={handleAdd}>+ Product</button>
        </Modal>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{ border: '1px solid' }}>
          {data.length > 0 ? (
            data.map((product, index) => {
              return (
                <tr key={product?.ID}>
                  <td>{product?.ID}</td>
                  <td>
                    <img
                      style={{ width: 100, height: 100 }}
                      src={product?.image}
                    />
                  </td>
                  <td>{product?.Name}</td>
                  <td>{product?.Brand}</td>
                  <td>{product?.Price}</td>
                  <td>
                    <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                      {product?.Description}
                    </p>
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => showUpdateModal(product)}
                      id={product.ID}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <button id={product.ID} onClick={() => handleDelete(product.ID)}>
                      Delete Product
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No data</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Hiển thị modal cập nhật sản phẩm */}
      {selectedProduct && (
        <UpdateProductModal
          isVisible={updateModalVisible}
          onCancel={handleUpdateModalCancel}
          onUpdate={handleUpdateProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Database2;
