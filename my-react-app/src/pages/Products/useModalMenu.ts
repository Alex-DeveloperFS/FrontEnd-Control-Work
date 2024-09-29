import { useState, useEffect } from 'react';

const useModalMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    // Устанавливаем начальную ширину окна
    setWindowWidth(window.innerWidth);

    // Добавляем обработчик события изменения размера
    window.addEventListener('resize', handleResize);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return { isMenuOpen, isMobile, openMenu, closeMenu };
};

export default useModalMenu;
