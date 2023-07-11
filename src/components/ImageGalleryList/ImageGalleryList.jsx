import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from './ImageGalleryList.module.css';

export const ImageGalleryList = ({ reactRef, images }) => {
  return (
    images && (
      <ul id="gallery" ref={reactRef} className={css.ImageGallery}>
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
};
