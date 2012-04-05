// This JS file handles all the Routing. Acts like a controller
$(document).ready(function() {

	$('div.content').css('display', 'block');

	// Initially set opacity on thumbs and add
	// additional styling for hover effect on thumbs
	var onMouseOutOpacity = 0.67;
	$('#thumbs ul.thumbs li').opacityrollover({
		mouseOutOpacity: onMouseOutOpacity,
		mouseOverOpacity: 1.0,
		fadeSpeed: 'fast',
		exemptionSelector: '.selected'
	});

	
	var catalog = new Catalog();
	catalog.fetch({
		success: function()
		{
			renderGallary();
		}		
	});


	function renderGallary() {
		
		var  gallary_view = new Gallary_View({
				model: catalog.get("products"),
				el: '#divImageFlow'
			});
		gallary_view.render();

	
	
	
	var instanceOne = new ImageFlow();
	instanceOne.init({ ImageFlowID: 'divImageFlow', 
                          circular: true,
                         slideshow: true,
                         slideshowAutoplay: true,
                         reflectionGET: '&height=50%',
                         reflectionP: 0.5});
       }
});
