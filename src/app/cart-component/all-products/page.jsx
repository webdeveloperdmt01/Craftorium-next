
'use client'
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
// import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();

  // --- Filter State ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  
  // --- Mobile Filter State ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- Detect mobile screen ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
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
  const allColor = Array.from(new Set(products.map(p => p.color)));


  const FilterSidebar = () => (
  <div className={`bg-white p-4 rounded-lg shadow-sm border border-orange-200 ${
    isMobile ? 
      `fixed inset-0 h-full w-full z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
      }` 
      : 'md:w-full'
  }`}>
    {/* Mobile Header - Full Width */}
    {isMobile && (
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h3 className="font-cormorant text-text-clr font-semibold text-xl">Filters</h3>
        <button 
          onClick={toggleMobileFilter}
          className="text-3xl text-gray-600 hover:text-orange-500 p-2"
        >
          ×
        </button>
      </div>
    )}

    <div className={`flex flex-col gap-6 ${isMobile ? 'px-2' : ''}`}>
      
      {/* Price Filter - Full Width on Mobile */}
      <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
        <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Price Filter</h5>
        <div className="flex gap-3 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-300 p-3 rounded w-1/2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-base"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border border-gray-300 p-3 rounded w-1/2 focus:ring-2 focus:ring-orange-400 focus:outline-none text-base"
          />
        </div>
        <p className="text-base text-gray-600 font-semibold">Range: ${minPrice} - ${maxPrice}</p>
      </div>

      {/* Categories - Full Width */}
      <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
        <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Categories</h5>
        <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
          {allCategories.map((cat, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-orange-500 w-5 h-5"
              />
              <span className="text-base">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands - Full Width */}
      <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
        <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Brands</h5>
        <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
          {allBrands.map((brand, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="accent-orange-500 w-5 h-5"
              />
              <span className="text-base">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors - Full Width */}
      <div className={`${isMobile ? 'bg-gray-50 p-4 rounded-lg' : 'bg-white p-4 rounded-lg border border-orange-200'}`}>
        <h5 className="font-cormorant text-text-clr font-semibold mb-3 text-lg">Colors</h5>
        <div className="flex flex-col gap-3 scrollbar-hide max-h-80 overflow-y-auto">
          {allColor.map((color, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-text-hover-clr font-nexa text-base p-2 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedColor.includes(color)}
                onChange={() => handleColorChange(color)}
                className="accent-orange-500 w-5 h-5"
              />
              <span className="text-base">{color}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* Mobile Apply Button - Sticky Bottom */}
    {isMobile && (
      <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6 pt-4 pb-4">
        <button
          onClick={toggleMobileFilter}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
        >
          Apply Filters ({selectedCategories.length + selectedBrands.length + selectedColor.length})
        </button>
      </div>
    )}
  </div>
);

  return (
    <>
      {/* <Navbar /> */}
      
      {/* Mobile Filter Overlay */}
      {isMobile && isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileFilter}
        />
      )}

      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-32 bg-section-bg-clr py-10 gap-6">
        
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <div className="md:w-1/4 mb-6 md:mb-0 flex flex-col gap-6">
            <FilterSidebar />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          {isMobile && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="font-cormorant text-text-clr font-semibold text-xl">
                Products ({filteredProducts.length})
              </h2>
              <button
                onClick={toggleMobileFilter}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <span>Filters</span>
                <span className="bg-white text-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {selectedCategories.length + selectedBrands.length + selectedColor.length}
                </span>
              </button>
            </div>
          )}

          {/* Mobile Filter Sidebar */}
          {isMobile && <FilterSidebar />}

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
      </div>
    </>
  );
};

export default AllProducts;
