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
				model: catalog.get("products")
			});
		gallary_view.render();

		$('#thumbs').galleriffic({
		delay: 2500,
		numThumbs: 10,
		preloadAhead: 10,
		enableTopPager: true,
		enableBottomPager: true,
		maxPagesToShow: 7,
		imageContainerSel: '#slideshow',
		controlsContainerSel: '#controls',
		captionContainerSel: '#caption',
		loadingContainerSel: '#loading',
		renderSSControls: true,
		renderNavControls: true,
		playLinkText: 'Play Slideshow',
		pauseLinkText: 'Pause Slideshow',
		prevLinkText: '&lsaquo; Previous Photo',
		nextLinkText: 'Next Photo &rsaquo;',
		nextPageLinkText: 'Next &rsaquo;',
		prevPageLinkText: '&lsaquo; Prev',
		enableHistory: false,
		autoStart: false,
		syncTransitions: true,
		defaultTransitionDuration: 900,
		onSlideChange: function(prevIndex, nextIndex) {
			// 'this' refers to the gallery, which is an extension of $('#thumbs')
			this.find('ul.thumbs').children().eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end().eq(nextIndex).fadeTo('fast', 1.0);
		},
		onPageTransitionOut: function(callback) {
			this.fadeTo('fast', 0.0, callback);
		},
		onPageTransitionIn: function() {
			this.fadeTo('fast', 1.0);
		}
	});
		
		$("a#fullimage-fancybox").fancybox({ 
				'hideOnContentClick': true, 
				'enableEscapeButton': true, 
				'width': '100px',
				'height' : 300,
				'openSpeed' : 'slow',
				'onComplete' : function(){
			         //$('#fancybox-content').css('height', 'px');
			    }
			});

         $(".thumb").on("click", function() {
         		$("a#fullimage-fancybox").attr('href',$(this).children("img").attr("data-fullImageURL"))
         		$("a#fullimage-fancybox").attr('title',
         				$(this).attr("title") + " - (" + 
         					$(this).attr("data-description") + ") - $" + 
         						$(this).attr("data-price"))
	    			//force a launch of the fancybox  			
				$("a#fullimage-fancybox").click();
				$.fancybox.resize();
         });
	}
	
	
	$("#selectedcatalog").on("change", function() {
		catalog.url = "json/" + $(this).val();
		catalog.fetch({
			success: function(model, response) {
				if(response.catalogName == "Empty Catalog")
				{
					clearContents();
					$("ul").prepend("This Catalog is empty");
				}
				else if (response.status == "ERROR"){
					
					clearContents();
					$("ul").append("<br><u><b>Status</b></u>: " + response.status);
					$("ul").append("<br><u><b>Error Code</b></u>: "+response.errorCode);
					$("ul").append("<br><u><b>Error Details</b></u>: "+response.errorDetails);
					$("ul").append("<br><br> <h5>Please choose a different catalog. </h5>" );
				}
				else
					renderGallary();
			},
			error: function(model, response) {
				alert("Error in Fetch : " + response.responseText);
			}
		})
	});

	function clearContents(){
		$("ul").empty();
		$(".pagination").remove();
	}	

	
});
