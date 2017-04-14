var app =[];
var myNav = {}; 
var choose = {};
var news ={};
var about ={};
var mobileNav = {};

/////Smooth Scroll
myNav.smoothScroll = function () {
	$("a").click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			// Assign the variable target, with the hash of the link that's been clicked (i.e. #hash)
			var target = $(this.hash);
			// check if element exists (with target.length)
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				//animation
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
	};

})
};


var navItems = $('.menu a');
// gotta store link hrefs
var navLinks = [];

for (var i = 0; i < navItems.length; i++) {
	// select link refs and push into array
	myNav.href = $(navItems[i]).attr('href');
	navLinks.push(myNav.href);
}

myNav.itemColorChange = function () {
	//when scrolling
	$(window).on('scroll', function () {
		// get position of the window from top of page
		myNav.windowPosition = $(window).scrollTop();
		// get height of window
		myNav.windowHeight = $(window).height();
		// get height of document page
		myNav.docHeight = $(document).height();
		// make nav a current when href matches section id (when specific section is top of pg)
		for (var i = 0; i < navLinks.length; i++) {
			var sectionId = navLinks[i];
			// get position of each section from top of page
			myNav.sectionPosition = $(sectionId).offset().top;
			//but like, not realllyyy top of page
			myNav.sectionPosition -= 100;
			// get height of each section
			myNav.sectionHeight = $(sectionId).height();

			// if top of window is within each section, set that section as current
			if (myNav.windowPosition >= myNav.sectionPosition && myNav.windowPosition < myNav.sectionPosition + myNav.sectionHeight) {
				$(`a[href="${sectionId}"]`).addClass('current');
			} else {
				$(`a[href="${sectionId}"]`).removeClass('current');
			} 
		}; 
	});
};

choose.pages = function(){
	$("#chooseTestimonials1").show();
	$("a.chooseTestimonialsLink").on("click", function() {
			var targetPage = $(this.hash)
			$(".chooseTestimonialsText").hide();
			targetPage.fadeIn();
			$(".chooseTestimonialsLink").removeClass("chooseImgActive");
			$(this).addClass("chooseImgActive");
			$('html,body').stop()
	});
};

news.pages = function(){
	$("#eventNewsBox1").show();
	$("a.eventNewsLink").on("click", function() {
			var targetPage = $(this.hash)
			$(".eventNewsItem").hide();
			targetPage.fadeIn();
			$(".eventNewsLink").removeClass("eventNewsActive");
			$(this).addClass("eventNewsActive");
			$('html,body').stop()
	});
};

about.pages = function(){
	$("#aboutTestimonials1").show();
	$("a.aboutTestimonialsLink").on("click", function() {
			var targetPage = $(this.hash)
			$(".aboutTestimonialsItem").hide();
			targetPage.fadeIn();
			$(".aboutTestimonialsLink").removeClass("aboutTestimonialsActive");
			$(this).addClass("aboutTestimonialsActive");
			$('html,body').stop()
	});
};

mobileNav.slide = function(){
	$("#burgerIcon").on("click", function(){
		$("#burgerIcon").hide();
		$(".navMobile").show();
		$("#closeIcon").fadeIn();
	})
	$("#closeIcon, section, a, .headerMain").on("click", function(){
		$(".navMobile").hide();
		$("#closeIcon").hide();
		$("#burgerIcon").fadeIn();
	})

}




app.init = function () {
	myNav.itemColorChange();
	myNav.smoothScroll();
	choose.pages();
	news.pages();
	about.pages();
	mobileNav.slide();
};

$(function () {
	app.init();
});

new WOW().init();

