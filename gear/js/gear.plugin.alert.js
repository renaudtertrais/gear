(function(g){

	var self = g.factory("alert",$.extend({
			triggers		: false,
			show 			: false,
			overlay			: true,
			overlay_color	: "rgba(0,0,0,.1)"
		},g.plugin.tog.defaults)
	);

	self.init = function(){
		var $this 	= this;
		var o 		= $this.data("alertOptions");
		
		if(o.triggers){
			
		}
	}


});