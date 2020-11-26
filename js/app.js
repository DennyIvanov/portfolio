$(function () {

	
	
/*===========================================================
//Filter
===========================================================*/
	let filter = $("[data-filter]");
	
	filter.on("click", function (event) {
		event.preventDefault();
		
		let cat = $(this).data('filter');
		
		if (cat == 'all') {
			$("[data-cat]").removeClass('hide');
		} else {
			$("[data-cat]").each(function () {
				let workCat = $(this).data('cat');
			
				if (workCat != cat) {
					$(this).addClass('hide');
				} else {
					$(this).removeClass('hide');
				}
			});
		}
	});
		
		
/*===========================================================
//Modal
===========================================================*/
	const modalCall = $("[data-modal]");
	const modalClose = $("[data-close]");
	
/*Modal Call
==========================*/
	modalCall.on("click", function (event) {
		event.preventDefault();
		
		let $this = $(this);
		let modalId = $this.data('modal');
		
		$(modalId).addClass('show');
		$("body").addClass('no-scroll');
		
		setTimeout (function() {
			$(modalId).find(".modal__dialog").css({
				transform: "scale(1)"
			})
		}, 180);
		
		worksSlider.slick('setPosition');
	});
		
/*Modal Close
==========================*/
	modalClose.on("click", function (event) {
		event.preventDefault();
		
		let $this = $(this);
		let modalParent = $this.parents('.modal');
		modalParent.find(".modal__dialog").css({
				transform: "scale(0)"
		});
		
		setTimeout(function () {
			modalParent.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 180);
	});
	
/*Modal Close (click to bg)
==========================*/
	$(".modal").on("click", function (event) {
		let $this = $(this);
		
		$this.find(".modal__dialog").css({
				transform: "scale(0)"
		});
		
		setTimeout(function () {
			$this.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 180);
	});
	
	
	$(".modal__dialog").on("click", function (event) {
		event.stopPropagation();
	});
	
	
/*Btn Print
==========================*/
	$('#printButtom').click(function(){
    	window.print();
	});

	
/*===========================================================
//Slider	https://kenwheeler.github.io/slick/
===========================================================*/
	const worksSlider = $('[data-slider="slick"]');
	worksSlider.slick({
  		infinite: true,
  		slidesToShow: 1,
  		slidesToScroll: 1,
		fade: true,
		arrows: false,
		dots: true
	});
	
	$(".slickPrev").on('click', function(event){
		event.preventDefault();
		
		let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');
		
		currentSlider.slick("slickPrev");
	});
	
	$(".slickNext").on('click', function(event){
		event.preventDefault();
		
		let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');
		
		currentSlider.slick("slickNext");
	});
	
	
/*===========================================================
//Mobile nav
===========================================================*/
	const navToggle = $("#navToggle");
	const nav = $("#nav");
	
	navToggle.on("click", function(event) {
		event.preventDefault();
		
		nav.toggleClass("active");
		navToggle.toggleClass("active");
	});
	

/*===========================================================
//Header fixed
===========================================================*/
	let header = $("#header");
	let intro = $("#intro");
	let introH = intro.innerHeight();
	let scrollPos = $(window).scrollTop();
		
/*Check scroll position
=========================*/
	function checkScroll(scrollPos, introH) {
        if(scrollPos >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    };
	
	checkScroll(scrollPos, introH);
	
/*Class "fixed" toggle
==========================*/
	$(window).on("scroll", function() {
		introH = intro.innerHeight();
		scrollPos = $(this).scrollTop();
        
		checkScroll(scrollPos, introH);
		
/*Active link switching
==========================*/
		$("[data-scroll]").each(function() {
			let blockId = $(this).data('scroll');
			let sectionOffset = $(blockId).offset().top + 50;
			let footerH = scrollPos + $(window).height();
			
			if (sectionOffset <= scrollPos || sectionOffset <= footerH) {
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
			} else { 
				$(this).removeClass('active');
			}
		});
	});
	
/*===========================================================
//Smooth scroll
===========================================================*/
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();
		
		let blockId = $(this).data('scroll');
		let blockOffset = $(blockId).offset().top;

		$("html, body").animate({
			scrollTop: blockOffset - 100
		}, 500);
	});
	

});
