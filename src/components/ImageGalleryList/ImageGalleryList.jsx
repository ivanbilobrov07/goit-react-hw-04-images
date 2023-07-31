import { forwardRef } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGalleryList.module.css';

export const ImageGalleryList = forwardRef(({ images, style }, ref) => {
  return (
    images && (
      <ul style={style} id="gallery" ref={ref} className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            alt={tags}
            smallImage={webformatURL}
            largeImage={largeImageURL}
          />
        ))}
      </ul>
    )
  );
});
