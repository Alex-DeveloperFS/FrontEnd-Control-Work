import { useState, useEffect } from 'react';

const useBrands = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://66a4ef2a5dc27a3c190a3666.mockapi.io/product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const uniqueBrands = Array.from(new Set(data.map((product: any) => product.brand)));
        setBrands(uniqueBrands);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

export default useBrands;
