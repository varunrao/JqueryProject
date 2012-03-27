$(document).ready(function(){

	// Views for the Gallary
	var Thubmnail_View = Backbone.View.extend({
		template: _.template($("#template_thumbnail").html()),

		initialize: function()
		{
			_.bindAll(this, "render");
		},

		render: function() {
			return this.template({
				product: this.model
			});
		}
	});


	window.Gallary_View =  Backbone.View.extend({
		el:"ul",
		initialize: function()
		{
			_.bindAll(this, "render");
		},

		render: function(){
			for(var i = 0; i < this.model.length; i++){
				var product = this.model[i];
				var thubmnail_view = new Thubmnail_View({model : product});
				$(this.el).prepend(thubmnail_view.render());
			}
			return $(this.el);
		}
	});

});