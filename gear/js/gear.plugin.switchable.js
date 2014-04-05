(function(g){
    var name = "switchable";
    var self = g.factory(name,{
            transitionIn  : "show",
            transitionOut : "hide",
            transition    : "none",
            time          : 0,
            init          : true
        });

    self.init = function(){
        var $this = $(this);
        var o = $this.data(name+"Options");
        // set the transition
        if(o.transition == "fade" ){
            o.transitionIn = "fadeIn";
            o.transitionOut = "fadeOut";
        }else if(o.transition == "slide" ){
            o.transitionIn = "slideIn";
            o.transitionOut = "slideOut";
        }
        if(o.transition != "none")
            o.time = 300;

        return $this;
    };

    self.show = function(){
        var $this = $(this);
        var o = $this.data(name+"Options");

        if($this.css("display")=="none")
            $this[o.transitionIn](o.time);

        return $this; 
    };

    self.hide = function(){
        var $this = $(this);
        var o = $this.data(name+"Options");
       
        if($this.css("display")!="none")
            $this[o.transitionOut](o.time);

        return $this;
    };

    self.toggle = function(){
        var $this = $(this);
        var o = $this.data(name+"Options");

        if($this.css("display")=="none")
            $this.switchable('show');
        else
           $this.switchable('hide'); 
    };

    // * * * data API * * *
    // plugin
    g.dataAPI.switchable = function( trs ){
        $(this).switchable({transition:trs});
    };
    // triggers
    g.dataAPI.toggle = function( target ){
        $(this).on("click",function(){
            $(target).switchable('toggle');
        });
    };
    
    g.dataAPI.show = function( target ){
        $(this).on("click",function(){
            $(target).switchable('show');
        });
    };
    g.dataAPI.hide = function( target ){
        $(this).on("click",function(){
            $(target).switchable('hide');
        });
    };

})(gear);
