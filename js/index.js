$(function(){

var lfpCases = new Swiper('.lfp-cases-slider', {
	slidesPerView: 1,
	speed: 0,
	onlyExternal: true,
	noSwiping: true,
	mousewheel: true,
	allowTouchMove: false,
	// autoHeight: true,
	pagination: {
		el: '.lfp-cases-slider-nav',
		clickable: true,
	},
});

function lfpCasesChangeSlide() {
	lfpCases.mousewheel.disable()	
	setTimeout(function() {
		lfpCases.mousewheel.enable()	
	}, 900)
}
/**
 * MouseWheel event listener
 */

$('.lfp-cases-slider').bind('mousewheel DOMMouseScroll', function(e) {
    var scrollTo = null;
    if (e.type == 'mousewheel') {
        scrollTo = (e.originalEvent.wheelDelta * -1);
    }
    else if (e.type == 'DOMMouseScroll') {
        scrollTo = 40 * e.originalEvent.detail;
    }
    if (scrollTo) {
        e.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
    }
});

// var isScrolled = false;
// lfpCases.on('scroll', function(e){
// 	/*
// 		WheelUp is e.mousewheel.recentWheelEvents[0].direction == 1
// 		WheelDown is e.mousewheel.recentWheelEvents[0].direction == -1
// 	*/ 
// 	if (isScrolled) {
// 		// MouseWheelDown === -1
// 		// console.log(e.mousewheel.recentWheelEvents[0].direction, 'Прошлое');
// 		if (e.mousewheel.recentWheelEvents[1].direction === -1) {
// 			console.log('slide next')
// 		} else if (e.mousewheel.recentWheelEvents[1].direction === 1) {
// 			console.log('slide prev')
// 		};
// 	} else { // firstscroll
// 	}
// 	isScrolled = true;
// });

/*
 * Change slide height on slide changing
 */
var slideHeightModifier = 0;
if (window.innerHeight > 1199) {
	slideHeightModifier = 50;
} else {
	slideHeightModifier = 170;
}
var initSlideHeightModifier = 0;
if (window.innerHeight < 1199) {
	slideHeightModifier = 50;
} else {
	slideHeightModifier = 170;
}

lfpCases.on('slideChangeTransitionStart', function() {
	$('.lfp-cases-swiper-wrapper').css({'transform': 'translate3d(0, 0px, 0px)', 'transition-duration': '0ms'});
	var currentSlideNumber = lfpCases.realIndex + 1;
	var slideHeight = $('.lfp-cases-slider-slide:nth-child(' + currentSlideNumber + ') .lfp-cases-slider-slide-inner').height();
	slideHeight+= slideHeightModifier;
	$('.lfp-cases-swiper-wrapper').css({'height': slideHeight + 'px'});
	$('.lfp-cases-slider-slide-inner').css({'height': 'calc(100%)'});
	lfpCasesChangeSlide();
});

$('.swiper-pagination-bullet').each(function() {
	$(this).on('click', function() {
		var currentSlideNumber = lfpCases.realIndex + 1;
		var slideHeight = $('.lfp-cases-slider-slide:nth-child(' + currentSlideNumber + ') .lfp-cases-slider-slide-inner').height();
		slideHeight+= slideHeightModifier;
		$('.lfp-cases-swiper-wrapper').css({'height': slideHeight + 'px'});
		$('.lfp-cases-slider-slide-inner').css({'height': 'calc(100%)'});
	})
})
/*
 * init slider height
 */
var currentSlideNumber = lfpCases.realIndex;
var slideHeight = $('.lfp-cases-slider-slide:nth-child(' + currentSlideNumber + 1 + ') .lfp-cases-slider-slide-inner').height();
slideHeight+= initSlideHeightModifier + 120;
$('.lfp-cases-swiper-wrapper').css({'height': slideHeight + 'px'});
$('.lfp-cases-slider-slide-inner').css({'height': 'calc(100%)'});



/*
 * After slider reach end slide
 */
var additionalOffset = 700; //Change this to scroll deeper

lfpCases.on('reachEnd', function () {
	var currentOffset = $('html').scrollTop();
	$('html, body').animate({
		scrollTop: currentOffset + additionalOffset
	}, 600, function () {
		// window.location.hash = '#';
	});
});
lfpCases.on('reachBeginning', function () {
	var currentOffset = $('html').scrollTop();
	$('html, body').animate({
		scrollTop: currentOffset - additionalOffset
	}, 600, function () {
		// window.location.hash = '#';
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
var bulletsTitles = [...document.querySelectorAll('.lfp-partnership-bullets-cards-card__title')]
var bulletsDescs = [...document.querySelectorAll('.lfp-partnership-bullets-cards-card__desc')]
var textAnimateClass = 'animate__fadeInRight';
function animateBullets(spreadElements) {
	documentHeight = window.innerHeight;
	centerDistance = documentHeight / 2;

	spreadElements.map((item) => {
		if (item.getBoundingClientRect().top < centerDistance) {
			item.classList.add(textAnimateClass)
		} else if (item.getBoundingClientRect().top > centerDistance - 30) {
			item.classList.remove(textAnimateClass)
		}
	})
}
document.addEventListener('scroll', function() {
	fillBullets(circles);
	animateBullets(bulletsTitles);
	animateBullets(bulletsDescs);
});
fillBullets(circles)



// new WOW().init();
// wow = new WOW(
// {
// 	boxClass:     'wow',      // default
// 	animateClass: 'animated', // default
// 	offset:       300,          // default
// 	mobile:       true,       // default
// 	live:         true        // default
// }
// )
// wow.init();

});
