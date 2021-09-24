//initiate necessary dom element
const sliderList = document.querySelector(".carousel__main-list");
const slides = Array.from(sliderList.children);

const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");

const sliderNav = document.querySelector(".carousel__nav");
const dots = Array.from(sliderNav.children);

dots[0].classList.add("current-slide");
//get the slider width
const slideWidth = slides[0].getBoundingClientRect().width;
slides[0].classList.add("current__slide");

//place slides side by side
slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
});

const moveSlide = (currentSlide, targerSlide) => {
    const move = targerSlide.style.left;
    sliderList.style.transform = `translateX(-${move})`;

    currentSlide.classList.remove("current__slide");
    targerSlide.classList.add("current__slide");
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
};

const controlArrowButtons = (targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    } else if (targetIndex === slides.length - 1) {
        nextButton.classList.add("is-hidden");
        prevButton.classList.remove("is-hidden");
    } else {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
};

//click right to move the slider right
nextButton.addEventListener("click", (e) => {
    //get current slide
    const currentSlide = sliderList.querySelector(".current__slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = sliderNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    moveSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    controlArrowButtons(nextIndex);
});

//click left to move the slider left
prevButton.addEventListener("click", (e) => {
    //get current slide
    const currentSlide = sliderList.querySelector(".current__slide");
    const prevSlide = currentSlide.previousElementSibling;

    const currentDot = sliderNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    moveSlide(currentSlide, prevSlide);
    updateDots(currentDot, prevDot);

    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    controlArrowButtons(prevIndex);
});

//click the dot to move the slides
sliderNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button");

    if (targetDot) {
        const currentSlide = sliderList.querySelector(".current__slide");
        const currentDot = sliderNav.querySelector(".current-slide");

        const targetIndex = dots.findIndex((dot) => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        controlArrowButtons(targetIndex);
    }
});
controlArrowButtons(0);
