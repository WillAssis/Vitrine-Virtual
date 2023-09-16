import { useState, useEffect } from 'react';
import generateSearchURL from '../../utils/generateSearchURL';
import Pagination from '../../components/Pagination/Pagination';
import Title from './subcomponents/Title';
import SearchBar from './subcomponents/SearchBar';
import ProductList from './subcomponents/ProductList';
import { Product } from '../../types';
import './Products.css';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = generateSearchURL(currentPage, searchTerm);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setPages(data.pages);
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao obter os produtos:', error);
      });
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById('search') as HTMLInputElement;
    setSearchTerm(input.value);
    input.value = '';
  };

  return (
    <main className="product-page">
      <Title />
      <SearchBar search={handleSearch} />
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        pages={pages}
        onPageChange={handlePageChange}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
      />
    </main>
  );
}

export default Products;
