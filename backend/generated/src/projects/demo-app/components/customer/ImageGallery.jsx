import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-96 object-cover rounded"
        />
      </div>
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;