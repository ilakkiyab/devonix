import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import StockIndicator from './StockIndicator';
import api from '../../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setSelectedVariant(response.data.variants[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGallery images={product.images} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${selectedVariant?.price}</p>
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
          <StockIndicator stock={selectedVariant?.stock} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;