// sections smooth appearance
const sections = document.querySelectorAll('section:not(.hero)');
function checkVisible() {
    sections.forEach(element => {
        var targetPosition = {
            top: window.pageYOffset + element.getBoundingClientRect().top,
            bottom: window.pageYOffset + element.getBoundingClientRect().bottom
        },
        windowPosition = {
            top: window.pageYOffset - 200,
            bottom: window.pageYOffset + document.documentElement.clientHeight - 200
        };

        if (targetPosition.bottom > windowPosition.top && 
            targetPosition.top < windowPosition.bottom) { 
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        };
    });

}
// FAQ toggler
const questions = document.querySelectorAll('.faq-top'),
      answers   = document.querySelectorAll('.faq-answer');
questions.forEach((item, key) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        answers[key].classList.toggle('active');
    });
});
// stories section toggler
const chapters = document.querySelectorAll('.story-tabs__item'),
      contents = document.querySelectorAll('.story-blocks__item');

chapters.forEach((item, key) => {
    item.addEventListener('click', () => {
        contents.forEach( content => {
            content.classList.remove('active');
        });
        chapters.forEach( chapter => {
            chapter.classList.remove('active');
        });
        item.classList.add('active');
        contents[key].classList.add('active');
    });
});
// scrolling to top and smooth scrolling
const scrolling = () => {
    function bindScrolling(scrollTopSelector) {
        const scrollTopElement = document.querySelector(scrollTopSelector);
        if(scrollTopElement) {
            scrollTopElement.classList.add('animated');
            window.addEventListener('scroll', () => {
                checkVisible();
                if(document.documentElement.scrollTop > 1250) {
                    scrollTopElement.classList.add('active');
                } else {
                    scrollTopElement.classList.remove('active');
                }
            });
        }

        let links = document.querySelectorAll('[href^="#"]'),
                    speed = 0.3;

        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    startPos = null;
                    
                if(hash.length > 1) {
                    let toBlock = document.querySelector(hash).getBoundingClientRect().top;
                    requestAnimationFrame(step);
                    function step(time) {
                        if(startPos === null) {
                            startPos = time;
                        }
                        let progress = time - startPos,
                            r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

                        document.documentElement.scrollTo(0, r);

                        if(r != widthTop + toBlock) {
                            requestAnimationFrame(step);
                        } else {
                            location.hash = hash;
                        }
                    }
                }
            });
        });
    }
    bindScrolling('#goTop');
};
scrolling();

// burger
function bindBurger(menuSelector, burgerSelector) {
    const menu = document.querySelector(menuSelector),
        burger = document.querySelector(burgerSelector);

    burger.classList.remove('active');
    burger.addEventListener('click', () => {
        if(window.screen.availWidth < 993) {
            if(menu.style.display == 'none') {
                menu.style.display = 'flex';
                burger.classList.add('active');
            } else {
                menu.style.display = 'none';
                burger.classList.remove('active');
            }
        }
    });

    window.addEventListener('resize', () => {
        if(window.screen.availWidth > 992) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
            burger.classList.remove('active');
        }
    });
}
bindBurger('.header-wrapper', '.header-burger__lines');

//hero images animation
imagesCarousel();
setInterval(() => {
    imagesCarousel()
}, 2000);
function imagesCarousel() { 
   let imageFirst  = document.querySelector('.hero-images__item.first'),
       imageSecond = document.querySelector('.hero-images__item.second'),
       imageThird  = document.querySelector('.hero-images__item.third');
    imageFirst.classList.remove('first');
    imageFirst.classList.add('second');
    imageThird.classList.remove('third');
    imageThird.classList.add('second');
    setTimeout(() => {
        imageThird.classList.remove('second');
        imageThird.classList.add('first');
        imageSecond.classList.remove('second');
        imageSecond.classList.add('third');
    }, 1000);
}