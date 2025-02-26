import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "https://e-commerce-backend-91ml.onrender.com";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, page, limit]);

  const fetchProducts = async () => {
    try {
      const params = { page, limit };
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedBrand) params.brand = selectedBrand;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;
      
      const response = await axios.get(`${API_BASE_URL}/v1/products`, { params });
      if (response.data.status && response.data.data) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.totalPages);
        setPage(response.data.data.currentPage);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v1/products`);
      if (res.data.status && res.data.data) {
        const uniqueCategories = [...new Set(res.data.data.products.map(p => p.category))]
          .map((name, index) => ({ id: index + 1, name }));
        const uniqueBrands = [...new Set(res.data.data.products.map(p => p.brand))]
          .map((name, index) => ({ id: index + 1, name }));
        
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Product Listing</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-flex gap-2">
          <input type="number" className="form-control" placeholder="Min Price" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} />
          <input type="number" className="form-control" placeholder="Max Price" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} />
        </div>
      </div>

      {/* Products */}
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm">
                <img src={`${API_BASE_URL}/${product.image}`} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="text-muted">${product.price}</p>
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductListing;
