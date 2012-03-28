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

	
	var pricesListing_full = new Prices();
	pricesListing_full.fetch({
		success: function()
		{
			renderPrices();
		}		
	});

function renderPrices() {
		
		var  priceList_View = new PriceList_View({
				model: pricesListing_full.get("listings")
			});
		
		$(".pagination").remove();
		priceList_View.render();

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
		
		
	}	
	$("#selectedlistItem").on("change", function() {
		pricesListing_full.url = "json/" + $(this).val();
		pricesListing_full.fetch({
			success: function(model, response) {
				if(response.catalogName == "Empty Catalog")
				{
					clearContents();
					$("ul").prepend(response.catalogName);
				}
				else if (response.status == "ERROR"){
					
					clearContents();
					$("ul").append("<br><u><b>Status</b></u>: " + response.status);
					$("ul").append("<br><u><b>Error Code</b></u>: "+response.errorCode);
					$("ul").append("<br><u><b>Error Details</b></u>: "+response.errorDetails);
				}
				else
					renderPrices();
			},
			error: function(model, response) {
				alert("error");
			}
		})
	});

	function clearContents(){
		$("ul").empty();
		$(".pagination").remove();
	}
});

