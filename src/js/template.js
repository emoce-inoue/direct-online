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
  const startContent = document.querySelector('.l-iryo-hoken');
  const startTop = startContent.getBoundingClientRect().top + windowValues.winTop;
  const endContent = document.querySelector('.l-footer');
  const endTop = endContent.getBoundingClientRect().top + windowValues.winTop;

  if (startTop <= windowValues.winTop + (windowValues.winH * 4) / 6 && endTop >= windowValues.winTop + windowValues.winH) {
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
  const modal = document.querySelector('#modal');
  const closeBtn = document.querySelector('#closeModalButton');
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

    modal.addEventListener('click', (e) => {
      if (!e.target.closest('.l-modal__content') && !e.target.closest('.l-modal__close')) {
        closeModal();
      }
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
};

const toggleYesNoContent = () => {
  const iryoBtns = document.querySelectorAll('.c-detail-button--iryo');
  const iryoContents = document.querySelectorAll('.l-iryo-detail');

  let lastClickedButton = null;

  const toggleContent = (targetContent) => {
    iryoContents.forEach((iryoContent) => {
      iryoContent.classList.remove('l-iryo-detail--open');
    });

    if (targetContent) {
      targetContent.classList.add('l-iryo-detail--open');
    }
  };

  const toggleBtnClasses = (addBtn) => {
    const addBtnBox = addBtn.querySelector('.c-detail-button__box');
    const addBtnText = addBtn.querySelector('.c-detail-button__box-text');

    if (addBtnBox) {
      addBtnBox.classList.add('c-detail-button__box--open');
    }

    if (addBtnText) {
      addBtnText.classList.add('c-detail-button__box-text--open');
    }
  };

  const removeBtnClasses = (removeBtn) => {
    const removeBtnBox = removeBtn.querySelector('.c-detail-button__box');
    const removeBtnText = removeBtn.querySelector('.c-detail-button__box-text');

    if (removeBtnBox) {
      removeBtnBox.classList.remove('c-detail-button__box--open');
    }

    if (removeBtnText) {
      removeBtnText.classList.remove('c-detail-button__box-text--open');
    }
  };

  iryoBtns.forEach((iryoBtn) => {
    iryoBtn.addEventListener('click', (event) => {
      const target = event.target.closest('.c-detail-button--iryo').dataset.target;

      const targetContent = document.querySelector(`.l-iryo-detail[data-content="${target}"]`);
      const clickedButton = event.target.closest('.c-detail-button--iryo');

      if (lastClickedButton && lastClickedButton !== clickedButton) {
        removeBtnClasses(lastClickedButton);
      }

      toggleBtnClasses(clickedButton);

      if (targetContent) {
        if (targetContent.classList.contains('l-iryo-detail--open')) {
          targetContent.classList.remove('l-iryo-detail--open');
          removeBtnClasses(clickedButton);
        } else {
          toggleContent(targetContent);
        }
      }
      lastClickedButton = clickedButton;
    });
  });
};

const toggleGanHoken = () => {
  const ganBtn = document.querySelector('.c-detail-button--gan');
  const ganContent = document.querySelector('.l-gan-hoken__detail');
  const ganBtnBox = ganBtn.querySelector('.c-detail-button__box');
  const ganBtnText = ganBtn.querySelector('.c-detail-button__box-text');

  ganBtn.addEventListener('click', () => {
    ganContent.classList.toggle('l-gan-hoken__detail--open');
    ganBtnBox.classList.toggle('c-detail-button__box--open');
    ganBtnText.classList.toggle('c-detail-button__box-text--open');
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
