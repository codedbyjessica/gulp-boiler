var app =[];
var myNav = {}; 
var portfolio = {};
var research ={};
var mobileNav = {};

/////Smooth Scroll
myNav.smoothScroll = function () {
	$("a").click(function() {
		//replace the first forward slash (/) in the pathname for the current location
		//compare it to the link that's been clicked
		//check link matches current domain
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
		}
	});
};


myNav.colorChange = function(){
	$(window).on("scroll", function(){
		myNav.navPosition = $("body").scrollTop();
		myNav.navHeight = $(".navTop").height();

		if(myNav.navPosition > myNav.navHeight){
			$(".navTop").removeClass("navTopAtTop");
			$(".logoTop").removeClass("logoAtTop")
		}else{
			$(".navTop").addClass("navTopAtTop");
			$(".logoTop").addClass("logoAtTop")
		}
	})

}

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

portfolio.pages = function(){
	$("#portfolioAnimation").show();
	$("a.portfolioLink").on("click", function() {
			var targetPage = $(this.hash)
			$(".portfolioGroup").hide();
			targetPage.fadeIn();
			$(".portfolioLink").removeClass("current");
			$(this).addClass("current");
	});
};

research.pages = function(){
	$("#moreDetails").on("click", function(e) {
		$("#detailsTab").slideUp();
		$("#detailsContent").slideDown();
	});

	$("#lessDetails").on("click", function(e) {
		$("#detailsContent").slideUp();
		$("#detailsTab").slideDown();
	});
};


mobileNav.slide = function(){


		$("#burgerIcon").on("click", function(){
			$(".navMobile").slideDown();
			$(".burgerIcon").hide();
			$("#closeMenu").fadeIn();
		})
		$("section, header, a, #closeMenu").on("click", function(){
			$(".navMobile").slideUp();
			$("#closeMenu").hide();
			$(".burgerIcon").fadeIn();
		})





}




app.init = function () {
	myNav.colorChange();
	myNav.itemColorChange();
	myNav.smoothScroll();
	portfolio.pages();
	research.pages();
	mobileNav.slide();
};

$(function () {
	app.init();
});

new WOW().init();



$('.video').fancybox({
	'transitionIn': 'elastic',
	loop: false,
	arrows: false,
	helpers: {
	media: {},
	overlay: {locked: false}
	}
});

$('.fancyimg').fancybox({
	'transitionIn': 'elastic',
	loop: false,
	helpers: {
	overlay: {locked: false}
	}
});

