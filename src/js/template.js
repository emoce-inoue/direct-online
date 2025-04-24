const windowValues = {
  get winTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  },
  get winW() {
    return window.innerWidth;
  },
  get winH() {
    return window.innerHeight;
  },
  body: document.querySelector('.l-body'),
  swiper: null,
};

const triggerStickyButton = () => {
  const stickyBtn = document.querySelector('.l-sticky-button');

  if (window.scrollY > 0) {
    stickyBtn.classList.add('l-sticky-button--show');
  } else {
    stickyBtn.classList.remove('l-sticky-button--show');
  }
};

const setSlider = () => {
  if (window.Swiper) {
    windowValues.swiper = new window.Swiper('.swiper', {
      slidesPerView: 'auto',
      loop: true,
      speed: 4000,
      allowTouchMove: false,
      autoplay: false,
    });
  }
};

const triggerModal = () => {
  const openBtn = document.querySelector('.js-modal-button');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeModalButton');
  let previousFocus;

  const closeModal = () => {
    modal.classList.remove('l-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    windowValues.body.classList.remove('l-body--noscroll');

    if (previousFocus) {
      previousFocus.focus();
    }
  };

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('l-modal--open');
      modal.setAttribute('aria-hidden', 'false');
      windowValues.body.classList.add('l-body--noscroll');

      previousFocus = document.activeElement;
      closeBtn.focus();
    });

    modal.addEventListener('click', (element) => {
      if (!element.target.closest('.l-modal__content') && !element.target.closest('.l-modal__close')) {
        closeModal();
      }
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', (element) => {
      if (element.key === 'Escape') {
        closeModal();
      }
    });
  }
};

const toggleYesNoContent = () => {
  const iryoBtns = document.querySelectorAll('.js-trigger');
  const iryoContent = document.querySelectorAll('.l-iryo-detail');

  iryoBtns.forEach((iryoBtn) => {
    iryoBtn.addEventListener('click', () => {
      const isOpen = iryoBtn.classList.contains('c-yesno__list--open');
      if (isOpen) {
        iryoBtn.classList.remove('c-yesno__list--open');

        iryoContent.forEach((content) => {
          content.classList.remove('l-iryo-detail--open');
        });
      } else {
        iryoBtns.forEach((btn) => {
          btn.classList.remove('c-yesno__list--open');
        });
        iryoBtn.classList.add('c-yesno__list--open');

        const target = iryoBtn.getAttribute('data-target');

        iryoContent.forEach((content) => {
          content.classList.remove('l-iryo-detail--open');
        });

        const content = document.querySelector(`.l-iryo-detail[data-content="${target}"]`);
        if (content) {
          content.classList.add('l-iryo-detail--open');
        }
      }
    });
  });
};

const toggleGanHoken = () => {
  const ganBtn = document.querySelector('.c-gan-hoken__button');
  const ganContent = document.querySelector('.l-gan-hoken__detail');

  ganBtn.addEventListener('click', () => {
    ganContent.classList.toggle('l-gan-hoken__detail--open');
    ganBtn.classList.toggle('c-gan-hoken__button--open');
  });
};

window.addEventListener('DOMContentLoaded', () => {
  triggerModal();
  toggleYesNoContent();
  toggleGanHoken();
  triggerStickyButton();
  setSlider();
});

window.addEventListener('load', () => {
  windowValues.body.classList.add('l-body--loaded');
  setTimeout(() => {
    if (windowValues.swiper) {
      windowValues.swiper.params.autoplay.delay = 0;
      windowValues.swiper.params.autoplay.disableOnInteraction = false;
      windowValues.swiper.autoplay.start();
    }
  }, 1200);
});

window.addEventListener('scroll', () => {
  triggerStickyButton();
});
