(function(g){

    var self = g.factory("tog",{
            tog           : false,
            target        : false,
            event         : "click",
            transitionIn  : false,
            transitionOut : false,
            transition    : "toggle",
            time          : 0,
            init          : true
        });

    self.init = function(){
        // Make a ref to the jQuery object
        var $this = $(this);
        // Get its options
        var o = $this.data("togOptions");
        $this.on(o.event,function(){
            self.transition.call(this);
        });
        return $this;
    }

    self.transition = function(){
        // Make a ref to the jQuery object
        var $this = $(this);
        // Get its options
        var o = $this.data("togOptions");
        $(o.tog)[o.transition]();
        return $this; 
    }

    self.open = function(){

    }

    self.close = function(){

    }

    self.toggle = function(){

    }

})(gear);

// data-open
// data-close
// data-alert
// data-toggle