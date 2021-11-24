import getImage from './services/axios';

import 'simplelightbox/dist/simple-lightbox.min.css';

import SimpleLightbox from 'simplelightbox';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galeryRef, loadMoreBtnRef, formRef, inputRef } from './services/refs';

import pageOption from './services/page_option';

import makeMarkup from './services/markup';

const renderImg = items => {
  const images = items.map(image => makeMarkup(image)).join('');
  galeryRef.insertAdjacentHTML('beforeend', images);
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

// const fetchImg = () => {
//   getImage(inputRef.value).then(resolve => {

//     pageOption.maxPage = Math.ceil(resolve.totalHits / pageOption.maxImg);

//     if (pageOption.page >= pageOption.maxPage) {
//       loadMoreBtnRef.style.display = 'none';
//       return Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//     renderImg(resolve.hits);
//     if (pageOption.page !== 1) return;
//     if (resolve.hits.length > 0) {
//       Notify.success(`Hooray! We found ${resolve.totalHits} images.`);
//       return;
//     }
//     Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//   });
// };

const fetchImg = async () => {
  try {
    const resolve = await getImage(inputRef.value);
    pageOption.maxPage = Math.ceil(resolve.totalHits / pageOption.maxImg);

    if (resolve.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    if (pageOption.page === 1) {
      Notify.success(`Hooray! We found ${resolve.totalHits} images.`);
      loadMoreBtnRef.style.display = 'block';
    }

    if (pageOption.page >= pageOption.maxPage) {
      loadMoreBtnRef.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    renderImg(resolve.hits);
  } catch (error) {
    Notify.failure(error.message);
  }
};

const searchImg = e => {
  e.preventDefault();
  loadMoreBtnRef.style.display = 'none';

  galeryRef.innerHTML = '';
  pageOption.page = 1;
  fetchImg();
};

const loadMore = () => {
  pageOption.page += 1;

  fetchImg();
  // refresh();
};

formRef.addEventListener('submit', searchImg);
loadMoreBtnRef.addEventListener('click', loadMore);
