import { useState, useEffect } from 'react';

const useModalMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Исправлено
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Очистка эффекта
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return { isMenuOpen, isMobile, openMenu, closeMenu, windowWidth }; // Добавьте windowWidth в возвращаемые значения, если нужно
};

export default useModalMenu;
