// JS file to store all the models.
$(document).ready(function(){
	
	var Product = Backbone.Model.extend({
		initialize: function() {
			this.name = this.get("name");
			this.fullimageURL = this.get("fullimageURL");
			this.thumbnailURL =  this.get("thumbnailURL");
			this.price = this.get("price"); 
			this.description = this.get("description");
		}
	});

	var Products = Backbone.Collection.extend({ model : Product});

	window.Catalog = Backbone.Model.extend({
		initialize: function()
		{
			this.catalogName = this.get("catalogName");
			this.products = new Products(this.get("products"));
		},

		url: function() {
			return "json/catalog_full.json";
		}

	});


	var Inventory = Backbone.Model.extend({
		initialize: function() {
			this.onHand = this.get("onHand");
			this.onOrder = this.get("onOrder");
		}
	})
	var Listing = Backbone.Model.extend({
		
		initialize: function() {
			this.name = this.get("name");
			this.price = this.get("price");
			this.inventory = new Inventory(this.get("inventory"));
		}
	});

	var Listings = Backbone.Collection.extend({ model: Listing });

	window.Prices = Backbone.Model.extend({
		initialize: function() {
			this.catalogName = this.get("catalogName");
			this.listings = new Listings(this.get("listings"));
		},

		url: function() {
			return "json/price_full.json";
		}
	});
});