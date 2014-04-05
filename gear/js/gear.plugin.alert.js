(function(g){

	var name = "alert";

	var self = g.factory(name,{
			show 			: false,
			overlay_color	: "rgba(0,0,0,.7)",
			switchable		: {},
			zIndex 			: 5000,
			width 			: "400px",
			onClose 		: "",
			onOpen 			: ""
		});

	// * * * EVENTS * * *
	var onOpen = new CustomEvent("open",{
		detail:{},
		bubbles: true,
		cancelable: true
	});
	var onClose = new CustomEvent("close",{
		detail:{},
		bubbles: true,
		cancelable: true
	});



	// * * * METHODS * * *
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
		// add class to overlay
		o.overlay.addClass("alert-overlay");
		// Insert overlay in the DOM
		o.overlay = o.overlay.insertAfter($this);
		// put this inside the overlay
		o.overlay.append($this);
		// add style to this
		$this.css({
			display 		: "inline-block",
			verticalAlign 	: "middle",
			maxWidth 		: "90%",
			width 			: o.width
		})
		// add class to this
		$this.addClass("alert-content");

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
		// hide by default ?
		if(!o.show)
			o.overlay.hide();
	}

	self.open = function(){
		var $this = $(this);
		var o = $(this).data(name+"Options");
		o.overlay.switchable('show');
		this.dispatchEvent(onOpen);
		if( typeof(o.onOpen) === "function" )
			o[onOpen]()
	}

	self.close = function(){
		var $this = $(this);
		var o = $(this).data(name+"Options");
		o.overlay.switchable('hide');
		this.dispatchEvent(onClose);
		if( typeof(o.onClose) === "function" )
			o[onClose]()
	}

	// * * * DATA API * * *
	g.dataAPI.alert = function( trs ){
		if( !trs )
			trs = "none";
		$(this).alert({switchable : {transition:trs}});
	}
	g.dataAPI.open = function( target ){
		$(this).on("click",function(){
			$(target).alert('open');
		})
	}
	g.dataAPI.close = function( target ){
		$(this).on("click",function(){
			$(target).alert('close');
		})
	}
	g.dataAPI.closeThis = function(){
		$(this).on("click",function(){
			$(this).parents(".alert-content").alert('close');
		})
	}

	


})(gear);