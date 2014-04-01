(function(w){
// - - - - - - - - 
    w.gear = {
        // vars
        prefix : "",
        plugin : {},
        dataAPI : true,
    }
    var g = w.gear;
    // objects
    g.Object = function(){};
    g.Object.prototype.parent = Object.prototype;
    g.Object.prototype.extend = function( construct ){
        construct.prototype = new parent();
        construct.prototype.constructor = construct;
        construct.prototype.parent = parent.prototype;
        return construct;
    }
    // methods
    g.getArgs = function(){
        var args = [];
        Array.prototype.push.apply( args, arguments );
        return args;
    }
  
    g.camelCaseObj = function(obj){
        $.each(obj,function(key,val){
            obj[gear.camelCase(key)] = val ;
        });
        return obj;
    };
    g.camelCase = function(str){
        return str.toLowerCase().replace(/(-| )([a-zA-Z0-9])/g,function(match) {
            return match[1].toUpperCase();
        });
    };
    g.unCamelCase = function(str){
        return str.replace(/[a-z]([A-Z])/g,function(match) {
            return "-"+match[0].toUpperCase();
        });
    };
    g.unPrefix = function(pre,obj){
        var rgx = new RegExp("^"+pre+"(.+)$");
        var o = {};
        $.each(obj,function(key,val){
            o[gear.camelCase(key.replace(rgx,"$1"))] = val;
        })
        return o;
    };
    g.setPlugin = function(){
        $.each( gear.plugin , function( name , plugin ){

            if( gear.prefix != ""){
                plugin.slug = gear.prefix+'-'+plugin.slug;
                plugin.name = gear.camelCase( plugin.slug );
            }

            $.fn[ plugin.name ] = plugin.plugin;
    
        });
    };
    g.setDataAPI = function(){
        if( gear.dataAPI ){
            $.each( gear.plugin , function(name,plugin){
                $('[data-'+plugin.slug+']').each(function(){
                    var $this = $(this);
                    $this[plugin.name](gear.unPrefix(plugin.name,$this.data()));
                });
            });
        }
    };
    g.factory = function(name,defaults){
        // look for the name
        if(!name){
            throw new Error("gear.factory() must need at a name as first argument");
            return false;
        }
        // Camelcase the name
        name = gear.camelCase(name);
        // add the plugin to gear.plugin
        gear.plugin[name] = {
            name        : name,
            slug        : gear.camelCase(name),
            defaults    : defaults,
            plugin : function(){
                // self is our plugin
                var self = gear.plugin[name].plugin ;
                // value to return at the end
                var returnValue;
                // convert arguments into an array
                var params = [];
                Array.prototype.push.apply( params, arguments );
                
                // let's go for a loop !
                this.each(function(){

                    // first let's make a ref to our jquery object
                    var $this = $(this);
                    // options so already init ?
                    var options = $this.data(name+"Options");

                    // need an init ?
                    if( options === undefined ){
                        // if there are some defaults properties
                        if( typeof(gear.plugin[name].defaults) === "object" ){
                            // if params is an object, overwrite defaults
                            if( typeof(params[0]) === "object" ){
                                options = $.extend( {}, gear.plugin[name].defaults , params[0] );
                            }else{
                                // no defaults to overwrite
                                options = gear.plugin[name].defaults
                            }
                        }else{
                            // no defaults ? just put an empty object
                            options = {};
                        }
                        // then put options on the element
                        $this.data(name+"Options",options);

                        // is there an init function ?
                        if(typeof(self.init) === "function" ){
                            returnValue = self.init.apply(this,params);
                            return false;
                        }
                    }

                    // ok init done. Do we have params ?
                    if( params.length ){
                        // yes, does the first is a function's name
                        if( typeof(self[params[0]]) === "function" ){
                            // yes. First, remove that function from params
                            params.shift();
                            // then call it with its params
                            returnValue = self[params[0]].apply(this,params);
                            return false;
                        }else{
                            // no. perhaps a param for a main function. Does it exist ?
                            if( typeof(self.main) == "function"){
                                // good so we can call it
                                returnValue = self.main.apply(this,params);
                                return false;
                            }else{
                                // no ? strange... let's return the jquery object
                                returnValue = $this;
                                return false;
                            }
                        }
                    }else{
                        // ok. No params. Perhaps a main function without any params
                        if( typeof(self.main) == "function"){
                            // yes so we can call it
                            returnValue = self.main.apply(this,params);
                            return false;
                        }else{
                            // no ? strange... let's return the jquery object
                            returnValue = $this;
                            return false;
                        }
                    }
                });// end of the loop. Best things have also an end :)
                // last but not least, return our precious value (jQuery object or whatever returned by a function)
                return returnValue;
            }
        }
        return gear.plugin[name].plugin; ;
    }
    // - - - 
    // alert();
    g.Alert = g.Object.extend(function(){
        var self    = g.Alert.prototype;
        var parent  = self.parent;
        // options
        var args = g.getArgs(arguments);
        this.options = {};
        if(typeof(args[args.length-1]) === "object" ){
            this.options = args[args.length-1];
            args.shift();
        }
        this.options = $.extend({},
            self.options,
            this.options,
        );
        // content
        if( typeof(args[0]) !== "string" ){
            throw new Error("g.alert() must need a string as first argument, currently : " + typeof(args[0]) );
            return false;
        }
        this.content = args[0];
        // title
        if( typeof(args[1]) !== "string" ){
            throw new Error("g.alert() must need a string as second argument, currently : " + typeof(args[0]) );
            return false;
        }
        this.title = args[1];

        // * * * METHODS * * *
        // open
        self.open = function(){

        }
        // close
        self.close = function(){

        }
    });
    // confirm()
    g.confirm = g.inherit( g.alert , function(){

    });
    // prompt()
    g.prompt = g.inherit( g.alert , function(){

    });

};
// - - - - - - -
})(window);



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
$(function(){
	gear.setPlugin();
	gear.setDataAPI();

	setTimeout(gear.setDataAPI,2000);
});

