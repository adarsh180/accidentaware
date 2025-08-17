'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { products, Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Cart } from '@/components/cart';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const product = products.find(p => p.id === id) as Product;
  
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
    setTimeout(() => setIsAddingToCart(false), 500); // Reset after a short delay
  };

  const handleBuyNow = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md ${selectedImage === index ? 'ring-2 ring-cyan-500' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">₹{product.price}</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm text-gray-500">{key}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'Out of Stock' || isAddingToCart}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-gray-400"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stockStatus === 'Out of Stock'}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-gray-400"
              >
                Buy Now
              </Button>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="w-full">
                View Cart ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">By {review.user}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
}