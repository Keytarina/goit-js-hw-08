import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const imageMarkup = createImageMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', imageMarkup);
gallery.addEventListener('click', onPhotoClick);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createImageMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, description, original }) => {
      return `
			<li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img class="gallery__image" 
                    	src="${preview}" 
                    	alt="${description}"
					/>
                </a>
            </li>`;
    })
    .join('');
}
