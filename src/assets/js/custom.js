jQuery(document).ready(function () {

	// Start Of Smart-Menu
	jQuery(function () {
		jQuery('#main-menu').smartmenus({
			mainMenuSubOffsetX: -1,
			mainMenuSubOffsetY: 4,
			subMenusSubOffsetX: 6,
			subMenusSubOffsetY: -6
		});
	});
	// End Of Smart-Menu
	
	//Ofi Start
	objectFitImages();
	//Ofi End

	// Start video-pop-up
	jQuery(".js-video-button").modalVideo({
		youtube: {
			controls: 0,
			nocookie: true
		}
	});
	// End Of video-pop-up

	//Home-Benner-Slider
	jQuery('.video_slider').slick({
		dots: false,
		navs: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true
	}); 


});

//Side-menu-JS
var o = document.getElementById("one");
var to = document.getElementById("two");
to.style.display = 'none';

function openNav() {
	document.getElementById("mySidenav").style.width = "280px";
	o.style.display = 'none';
	to.style.display = '';
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	o.style.display = '';
	to.style.display = 'none';
}







