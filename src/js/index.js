import '../css/main.scss';
import Siema from 'siema';

window.addEventListener('load', main);

function main() {

  // SLIDERS //

  // Add a function that set active class to btn
  function setActiveClass(wrapper, currentSlide) {
    const children = [...wrapper.children];
    children.forEach(node => node.classList.remove('active'));
    children[currentSlide].classList.add('active');
  }

  // Add a function that generates pagination to prototype
  Siema.prototype.addPagination = function() {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('siema__dots');
    for (let i = 0; i < this.innerElements.length; i++) {
      const btn = document.createElement('button');
      btn.classList.add('siema__dot');
      btn.addEventListener('click', () => {
        const siblings = [...btn.parentNode.children];
        setActiveClass(btn.parentNode, siblings.indexOf(btn));
        this.goTo(i);
      });
      btnWrapper.appendChild(btn);
    }
    btnWrapper.children[this.currentSlide].classList.add('active');
    this.selector.appendChild(btnWrapper);
  }

  const siemas = document.querySelectorAll('.siema');
  siemas.forEach(siema => {

    const options = {
      selector: siema,
      loop: true,
      onChange: function() {
        const dots = instance.selector.querySelector('.siema__dots');
        setActiveClass(dots, this.currentSlide);
      }
    };

    if (siema.classList.contains('advantages__slider') || siema.classList.contains('team__slider')) {
      options.perPage = {
        768: 2,
        1024: 3,
      };
      options.loop = false;
    }
    const instance = new Siema(options);
    instance.addPagination();
  });

  // END SLIDER //

  // ANCHOR //
  document.querySelectorAll('.anchor').forEach(node => {
    node.addEventListener('click', function() {
      if (this.classList.contains('anchor--down')) {
        document.querySelector('.section__form').scrollIntoView({behavior: "smooth"});
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });
  // END ANCHOR //

  // SCROLL //
  const h2 = document.querySelectorAll('.h2');
  window.addEventListener('scroll', function() {
    h2.forEach(el => {
      if (isInViewport(el)) el.classList.add('fadeIn');
    });
  });

  function isInViewport(el) {
    const bounding = el.getBoundingClientRect();
    return (
       bounding.top >= 0 &&
       bounding.left >= 0 &&
       bounding.bottom <= document.documentElement.clientHeight
   );
  }

}

if (module.hot) {
  module.hot.accept();
}
