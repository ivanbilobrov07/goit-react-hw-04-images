import { Route, Routes } from 'react-router-dom';

import Home from '../../pages/Home';
import ImageGalleryFirst from 'pages/ImageGalleryFirst';
import ImageGallerySecond from 'pages/ImageGallerySecond';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-galley-by-button" element={<ImageGalleryFirst />} />
        <Route path="/image-galley-scrolled" element={<ImageGallerySecond />} />
      </Routes>
    </>
  );
};
