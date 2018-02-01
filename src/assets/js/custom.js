$(function() {
	var winheight = $(window).height() - 50;
	$(".app-cover,#page-wrapper").css("min-height",winheight);

	$(window).resize(function(){
		var winheight = $(window).height() - 50;
		$(".app-cover,#page-wrapper").css("min-height",winheight);
	});

	//navigation close on click
	$(".mainpoint1").click(function(){
		$(".mainpoint2[aria-expanded='true'],.mainpoint3[aria-expanded='true']").trigger("click");
	});
	$(".mainpoint2").click(function(){
		$(".mainpoint1[aria-expanded='true'],.mainpoint3[aria-expanded='true']").trigger("click");
	});
	$(".mainpoint3").click(function(){
		$(".mainpoint1[aria-expanded='true'],.mainpoint2[aria-expanded='true']").trigger("click");
	});


	$(window).scroll(function(){
		var top = $('html,body').scrollTop();
		if(top > 50){
			$(".navbar-fixed-top").addClass("fix");
		}else{
			$(".navbar-fixed-top").removeClass("fix");
		}	
	});
	$(".sliding-link").click(function(){
		var val = $(this).attr("data");
		var offset = $( "#"+val ).offset();
		var top = offset.top-50;
		var body = $("html, body");
		body.stop().animate({scrollTop:top}, 500, 'swing');
	});
});