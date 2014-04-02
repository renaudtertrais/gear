(function(g){

	var name = "alert";

	var self = g.factory(name,{
			show 			: false,
			overlay_color	: "rgba(0,0,0,.1)",
			switchable		: {},
			zIndex 			: 5000,
			width 			: "400px",
		});

	self.init = function(){
		var $this 	= $(this);
		var o 		= $this.data(name+"Options");
		
		// create overlay
		o.overlay = $("<div/>");
		// style overlay
		o.overlay.css({
			position : 'fixed',
			top 			: 0,
			left 			: 0,
			right 			: 0,
			bottom 			: 0,
			backgroundColor : o.overlay_color,
			textAlign 		: "center",
			zIndex			: o.zIndex
		})
		// add switchable beahvior to the overlay
		o.overlay.switchable(o.switchable);
		// put this inside the overlay
		$this.wrap(o.overlay);
		// add style to this
		$this.css({
			display 		: "inline-block",
			verticalAlign 	: "middle",
			maxWidth 		: "90%",
			width 			: o.width
		})

		// Create the align helper
		var align = $("<div/>");
		// style align
		align.css({
			display 		: "inline-block",
			verticalAlign 	: "middle",
			width 			: 0,
			height 			: "100%"
		});
		// Add align to overlay
		o.overlay.append(align);

		if(!o.show)
			o.overlay.hide();
	}

	self.open = function(){
		$(this).data(name+"Options").overlay.switchable('show');
	}

	self.close = function(){
		$(this).data(name+"Options").overlay.switchable('hide');
	}

	// * * * DATA API * * *
	g.dataAPI.alert = function(){
		$(this).alert();
	}
	g.dataAPI.open = function( target ){
		$(this).on("click",function(){
			$(taget).alert('open');
		})
	}
	g.dataAPI.close = function( target ){
		$(this).on("click",function(){
			$(taget).alert('close');
		})
	}
	g.dataAPI.closeThis = function(){
		$(this).on("click",function(){
			$(this).parents(".panel").alert('close');
		})
	}
})(gear);