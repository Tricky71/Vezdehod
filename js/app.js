import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation  } from 'swiper'
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation  ])

import { gsap, Power2} from 'gsap'

import MicroModal from 'micromodal'

document.addEventListener('DOMContentLoaded', () => {

	// Modal
	MicroModal.init({
        openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	});


    // Swiper
	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		pagination:  {
			el: '.sliders__count-total',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				var totalRes = total >= 10 ? total : 0 + `0${total}`;
				return totalRes;
			}
		}
		
	});

	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		// parallax: true,
		mousewheel: {
			invert: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	swiperIMG.controller.control = swiperText
	swiperText.controller.control = swiperIMG

// gsap
	var gear = document.querySelector('.sliders__gear');

	swiperText.on('slideNextTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '+=40',
			ease: Power2.easeOut,
		})
	});

	swiperText.on('slidePrevTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '-=40',
			ease: Power2.easeOut,
		});
	});

	var curNum = document.querySelector('.sliders__count-current');
	var pageCur = document.querySelector('.sliders__pagination-current-num');

	swiperText.on('slideChange', function() {
		var i = swiperText.realIndex + 1;
		var iRes = i >= 10 ? i : `0${i}`;
		gsap.to(curNum, .2, {
			// force3d: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(curNum, .1, {
					// force3d: true,
					y: 10
				})
				curNum.innerHTML = iRes;
				pageCur.innerHTML = iRes;
            }
        });
		gsap.to(curNum, .2, {
			// force3d: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})
	});

	// Cursor
	const body = document.querySelector('body');
	const cursor = document.getElementById('cursor');
	const links = document.getElementsByTagName('a');
	let mouseX = 0;
	let mouseY = 0;
	let posX = 0;
	let posY = 0;

	function mouseCoords(e) {
		mouseX = e.pageX,
		mouseY = e.pageY
	}

	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 6
			posY += (mouseY - posY) / 6
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseover', () => {
			cursor.classList.add('active')
		})
		links[i].addEventListener('mouseout', () => {
			cursor.classList.remove('active')
		})
	}

	body.addEventListener('mousemove', e => {
        mouseCoords(e);
		cursor.classList.remove('hidden');
	})

	body.addEventListener('mouseout', e => {
        cursor.classList.add('hidden');
	})








})
