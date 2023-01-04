// Hover Over Menu Features

const menuOptions = document.querySelector('.menu__table');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalTitle = document.querySelector('.modal__title');
const modalDesc = document.querySelector('.modal__description');
const closeBtn = document.querySelector('.btn--close-modal');

const openModal = function(e) {
    if (e.target.classList.contains('ice__cream')) {
        const link = e.target
        const title = link.nextElementSibling
        const desc = title.nextElementSibling
            modalTitle.textContent = `${title.textContent}`
            modalDesc.textContent = `${desc.textContent}`
            modal.style.backgroundImage=`url(${link.src})`
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
    }
}

const closeModal = function(e) {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});

const hoverOver = function(e) {
    if(e.target.classList.contains('ice__cream')) {
        const link = e.target;
        const siblings = link.closest('.menu__table').querySelectorAll('.ice__cream')
        siblings.forEach(el => {
            if(el !== link) {
                el.style.opacity = this;
            }
        })
    }
}

menuOptions.addEventListener('click', openModal)
menuOptions.addEventListener('mouseover', hoverOver.bind(0.25))
menuOptions.addEventListener('mouseout', hoverOver.bind(1))

const allSect = document.querySelectorAll('.section');
const scroll = function(entries, observer) {
    const [entry] = entries;
    const target = entry.target
    if (!entry.isIntersecting) return
    target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const pageObserver = new IntersectionObserver(scroll, {
    root: null,
    threshold: 0.3,
    rootMargin: '50px'
})

// For JavaScript disabled Users:


// allSect.forEach(sect => {
//     sect.classList.add('section--hidden')
//     pageObserver.observe(sect)
// })

document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    if(e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})



const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left')
    const btnRight = document.querySelector('.slider__btn--right')
    const dotContainer = document.querySelector('.dots')

    let curSlide = 0;
    const maxSlide = slides.length;
    const slideActivate = function(slide) {
      slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`)
    }

    const createDots = function() {
      slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide="${i}"</button>`)
      })
    }

    const activateDot = function(slide) {
      document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }

    const nextSlide = function(){
      if(curSlide === maxSlide - 1) {
        curSlide = 0;
      }else{  curSlide++ }
      slideActivate(curSlide);
      activateDot(curSlide);
    }

    const prevSlide = function(){
      if(curSlide === 0) {
        curSlide = maxSlide -1;
      } else{  curSlide--; }
      slideActivate(curSlide);
      activateDot(curSlide);
    }

    const startUp = function () {
        createDots();
        activateDot(0)
        slideActivate(0);
    }

    startUp();

    btnRight.addEventListener('click', nextSlide)
    btnLeft.addEventListener('click', prevSlide)
    document.addEventListener('keydown', function (e) {
      e.key === 'ArrowRight' && nextSlide();
      e.key === 'ArrowLeft' && prevSlide();
    })

    dotContainer.addEventListener('click', function(e) {
      if(e.target.classList.contains('dots__dot')) {
        const {slide} = e.target.dataset;
        slideActivate(slide);
        activateDot(slide);
      }
    })
}
slider();