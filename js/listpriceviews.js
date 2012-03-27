$(document).ready(function(){

	// -- Views for the List prices 
	var PriceItem_View = Backbone.View.extend({
		template: _.template($("#template_priceList").html()),

		initialize: function()
		{
			_.bindAll(this, "render");
		},

		render: function() {
			return this.template({
				listing: this.model
			});
		}
	});

	window.PriceList_View =  Backbone.View.extend({
		el:"ul",
		initialize: function()
		{
			_.bindAll(this, "render");
		},

		render: function(){
			for(var i = 0; i < this.model.length; i++){
				var listing = this.model[i];
				var pricelist_view = new PriceItem_View({model : listing});
				$(this.el).prepend(pricelist_view.render());
			}
			return $(this.el);
		}
	});

});