// JS file to store all the models.
$(document).ready(function(){
	
	window.Product = Backbone.Model.extend({
		initialize: function() {
			this.name = this.get("name");
			this.fullimageURL = this.get("fullimageURL");
			this.thumbnailURL =  this.get("thumbnailURL");
			this.price = this.get("price"); 
			this.description = this.get("description");
		}
	});

	window.Products = Backbone.Collection.extend({ model : Product});

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
});