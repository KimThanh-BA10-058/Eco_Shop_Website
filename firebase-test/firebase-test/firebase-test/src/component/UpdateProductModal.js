import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useParams } from 'react-router-dom';

const UpdateProductModal = ({ isVisible, onCancel, onUpdate, product }) => {
  const [name, setName] = useState(product.Name);
  const [brand, setBrand] = useState(product.Brand);
  const [price, setPrice] = useState(product.Price);
  const [description, setDescription] = useState(product.Description);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleUpdate = () => {
    const updatedProduct = {
      name,
      brand,
      price,
      description,
      quantity,
    };
    onUpdate(updatedProduct);
  };

  return (
    <Modal
      title="Update Product"
      open={isVisible}
      onOk={handleUpdate}
      onCancel={onCancel}
    >
      <Input
        placeholder="Update Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Update Brand..."
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <Input
        placeholder="Update Price..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        placeholder="Update Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Update Quantity..."
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateProductModal;
