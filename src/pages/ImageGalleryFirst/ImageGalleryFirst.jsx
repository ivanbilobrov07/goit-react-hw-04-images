import { ImageGalleryList } from 'components/ImageGalleryList';
import { LoadMoreButton } from 'components/LoadMoreButton';
import { Loader } from 'components/Loader';
import { Message } from 'components/Message';
import { Searchbar } from 'components/Searchbar';
import { useEffect, useRef, useState } from 'react';
import { fetchImages } from 'services';
import css from './ImageGalleryFirst.module.css';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const imagesPerPage = 12;

const ImageGalleryFirst = () => {
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);
  const [errorText, setErrorText] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (images.length > imagesPerPage) {
      scrollAfterLoading();
    }
  }, [images]);

  useEffect(() => {
    if (!query) return;
    async function fetchData() {
      try {
        setStatus(STATUS.pending);
        const newImages = (await fetchImages({ query, page })).data.hits;
        setImages(state => [...state, ...newImages]);
        setStatus(STATUS.fulfilled);
        setErrorText('');
        checkAmountOfImages(newImages);
      } catch (e) {
        setErrorText(e.message);
        setStatus(STATUS.rejected);
      }
    }
    fetchData();
  }, [page, query]);

  const checkAmountOfImages = images => {
    if (images.length < imagesPerPage) {
      setErrorText('No more images');
    }
  };

  const changeQuery = queryValue => {
    if (query === queryValue && page === 1) {
      return;
    }

    setQuery(queryValue);
    setPage(1);
    setImages([]);
  };

  const scrollAfterLoading = () => {
    const { height: cardHeight } =
      listRef.current.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  const incrementPage = () => {
    setPage(state => state + 1);
  };

  return (
    <section className={css.ImageGallery}>
      <Searchbar getImagesQuery={changeQuery}></Searchbar>
      {status !== STATUS.idle && (
        <>
          <ImageGalleryList ref={listRef} images={images} />
          {status === STATUS.fulfilled &&
            (!errorText ? (
              <LoadMoreButton onClick={incrementPage} />
            ) : (
              <Message>{errorText}</Message>
            ))}
          {status === STATUS.rejected && <Message>{errorText}</Message>}
          {status === STATUS.pending && <Loader />}
        </>
      )}
    </section>
  );
};

export default ImageGalleryFirst;
