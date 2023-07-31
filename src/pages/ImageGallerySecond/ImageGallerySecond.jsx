import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ImageGalleryList } from 'components/ImageGalleryList';
import { Message } from 'components/Message';
import { Searchbar } from 'components/Searchbar';
import { fetchImages } from 'services';
import css from './ImageGallerySecond.module.css';

const imagesPerPage = 16;

const ImageGallerySecond = () => {
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!query) return;
    async function fetchData() {
      try {
        const newImages = (await fetchImages({ query, page, imagesPerPage }))
          .data.hits;
        setImages(state => [...state, ...newImages]);
        checkAmountOfImages(newImages);
      } catch (e) {
        setHasMore(false);
      }
    }
    fetchData();
  }, [page, query]);

  const checkAmountOfImages = images => {
    if (images.length < imagesPerPage) {
      setHasMore(false);
      return;
    }
    setHasMore(true);
  };

  const changeQuery = queryValue => {
    if (query === queryValue && page === 1) {
      return;
    }

    setQuery(queryValue);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(state => state + 1);
  };

  return (
    <section className={css.ImageGallery}>
      <Searchbar getImagesQuery={changeQuery}></Searchbar>

      <InfiniteScroll
        dataLength={images.length}
        next={incrementPage}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          query &&
          (images.length > 0 ? (
            <Message>No more images</Message>
          ) : (
            <Message>Nothing was found</Message>
          ))
        }
      >
        <ImageGalleryList
          style={{ 'max-width': '1660px' }}
          ref={listRef}
          images={images}
        />
      </InfiniteScroll>
    </section>
  );
};

export default ImageGallerySecond;
