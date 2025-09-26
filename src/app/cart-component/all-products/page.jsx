
'use client'
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();

  // --- Filter State ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedColor, setSelectedColor] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);

  // --- Handlers ---
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleMinPriceChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) setMinPrice(val);
  };

  const handleMaxPriceChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) setMaxPrice(val);
  };

  // --- Filter Products ---
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category || "Uncategorized")) return false;
         if (selectedColor.length > 0 && !selectedColor.includes(product.color || "Uncategorized")) return false;

    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || "Unknown")) return false;

    let productPrice = 0;
    if (product.price) {
      if (typeof product.price === "string") productPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      else if (typeof product.price === "number") productPrice = product.price;
    }
    if (productPrice < minPrice || productPrice > maxPrice) return false;

    return true;
  });

  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allBrands = Array.from(new Set(products.map(p => p.brand || "Unknown")));
  
  const allColor= Array.from(new Set(products.map(p => p.color)));

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-32 bg-section-bg-clr py-10 gap-6 ">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 mb-6 md:mb-0 flex flex-col gap-6">
          {/* Price Filter */}
          <div className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm">
            <h5 className="font-cormorant text-text-clr font-semibold mb-3">Price Filter</h5>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="border border-gray-300 p-2 rounded w-1/2 focus:ring-1 focus:ring-orange-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="border border-gray-300 p-2 rounded w-1/2 focus:ring-1 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <p className="text-sm text-gray-600">Range: ${minPrice} - ${maxPrice}</p>
          </div>

          {/* Categories */}
          <div className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm">
            <h5 className="font-cormorant text-text-clr font-semibold mb-3">Categories</h5>
            <div className="flex flex-col gap-2 scrollbar-hide max-h-64 overflow-y-auto">
              {allCategories.map((cat, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-text-hover-clr font-nexa">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="accent-orange-500"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm">
            <h5 className="font-cormorant text-text-clr font-semibold mb-3">Brands</h5>
            <div className="flex flex-col gap-2 scrollbar-hide max-h-64 overflow-y-auto">
              {allBrands.map((brand, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-text-hover-clr font-nexa">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="accent-orange-500"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        

          {/* Colors */}
            <div className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm">
            <h5 className="font-cormorant text-text-clr font-semibold mb-3">Colors</h5>
            <div className="flex flex-col gap-2 scrollbar-hide max-h-64 overflow-y-auto">
              {allColor.map((color, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer hover:text-text-hover-clr font-nexa">
                  <input
                    type="checkbox"
                    checked={selectedColor.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="accent-orange-500"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
          </div>
       

        {/* Product Grid */}
        <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-center col-span-full text-text-clr font-nexa mt-6">
              No products match the selected filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
