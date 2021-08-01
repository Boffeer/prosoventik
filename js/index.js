var lfpCases = new Swiper('.lfp-cases-slider', {
	// init: false,
	slidesPerView: 1,
	// spaceBetween: 30,
	speed: 0,
	onlyExternal: true,
	noSwiping: true,
	mousewheel: true,
	allowTouchMove: false,
	pagination: {
		el: '.lfp-cases-slider-nav',
		clickable: true,
	},
});



/**
 * MouseWheel event listener
 */
var isScrolled = false;
lfpCases.on('scroll', function(e){
	/*
		WheelUp is e.mousewheel.recentWheelEvents[0].direction == 1
		WheelDown is e.mousewheel.recentWheelEvents[0].direction == -1
	*/ 
	if (isScrolled) {
		// MouseWheelDown === -1
		// console.log(e.mousewheel.recentWheelEvents[0].direction, 'Прошлое');
		if (e.mousewheel.recentWheelEvents[1].direction === -1) {
			console.log('slide next')
			// setTimeout(function() {
				// $('.lfp-cases-swiper-wrapper').css({'transform': 'translateX(0)'})
			// }, 10)
		} else if (e.mousewheel.recentWheelEvents[1].direction === 1) {
		};
			// setTimeout(function() {
			// 	$('.lfp-cases-swiper-wrapper').css({'transform': 'translateX(0)'})
			// }, 10)
	} else {
		// firstscroll
		// console.log(e.mousewheel.recentWheelEvents[0].direction, 'Текущее');
	}
	isScrolled = true;
});



/*
 * On slide changing
 */
lfpCases.on('slideChangeTransitionStart', function(ev) {
	$('.lfp-cases-swiper-wrapper').css({'transform': 'translate3d(0, 0px, 0px)', 'transition-duration': '0ms'});
	var currentSlideNumber = lfpCases.realIndex;
	var slideHeight = $('.lfp-cases-slider-slide:nth-child(' + currentSlideNumber + ') .lfp-cases-slider-slide-inner').height();
	slideHeight+= 50;
	$('.lfp-cases-swiper-wrapper').css({'height': slideHeight + 'px'});
});



/*
 * init slider height
 */
var currentSlideNumber = lfpCases.realIndex;
var slideHeight = $('.lfp-cases-slider-slide:nth-child(' + currentSlideNumber + 1 + ') .lfp-cases-slider-slide-inner').height();
console.log(slideHeight)
slideHeight+= 170;
$('.lfp-cases-swiper-wrapper').css({'height': slideHeight + 'px'});


/*
 * After slider reach end slide
 */
var afterLfpCasesBlockId = '.lfp-partnership'
var resizeCounter = 0
lfpCases.on('reachEnd', function () {
	$('html, body').animate({
		scrollTop: $(afterLfpCasesBlockId).offset().top
	}, 300, function () {
		// window.location.hash = '#numbers';
	});
});



/**
 * Slider swiping fix
 */
var hammertime = new Hammer(document.querySelector('.lfp-cases-slider'));
hammertime.on('swipeleft', function() {
	lfpCases.slideNext();
});
hammertime.on('swiperight', function() {
	lfpCases.slidePrev();
});



/**
 * Bullets
 */
var circles = [...document.querySelectorAll('.lfp-partnership-bullets-cards-card-bullet')];
var circleActiveClass = 'lfp-partnership-bullets-cards-card-bullet--active';
function fillBullets(spreadElements) {
	documentHeight = window.innerHeight;
	centerDistance = documentHeight / 2;
	spreadElements.map((item) => {
		if (item.getBoundingClientRect().top < centerDistance) {
			item.classList.add(circleActiveClass)
		} else if (item.getBoundingClientRect().top > centerDistance - 30) {
			item.classList.remove(circleActiveClass)
		}
	})
}
document.addEventListener('scroll', function() {
	fillBullets(circles);
});
fillBullets(circles)

