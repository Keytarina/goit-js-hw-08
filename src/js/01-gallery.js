import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const imageMarkup = createImageMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', imageMarkup);

gallery.addEventListener('click', onPhotoClick);

function createImageMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, description, original }) => {
      return `
			<li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img class="gallery__image" 
                    	src="${preview}" 
						data-source="${original}"
                    	alt="${description}"
					/>
                </a>
            </li>`;
    })
    .join('');
}

function onPhotoClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = SimpleLightbox.create(
    `
		<div class="modal">
			<img src="${event.target.dataset.source}">
		</div>
	`,
    {
      onShow: instance => {
        document.addEventListener('keydown', event => {
          if (event.key === 'Escape') {
            instance.close();
          }
        });
      },
    }
  );
  instance.show();
}
