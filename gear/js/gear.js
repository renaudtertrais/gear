(function(w){
// - - - - - - - - 
    w.gear = {
        // vars
        prefix          : "",
        plugin          : {},
        dataAPI         : {},
        enableDataAPI   : true
    };
    var g = w.gear;
    // objects

    g.Object = function(){};
    g.Object.prototype.parent = Object.prototype;
    g.Object.extend = function( construct ){
        construct.prototype = new this.prototype.parent.constructor();
        construct.prototype.constructor = construct;
        construct.prototype.parent =  this.prototype;
        construct.extend = this.extend;
        return construct;
    }
    // methods
    g.getArgs = function(obj){
        var args = [];
        Array.prototype.push.apply( args, obj );
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
        return str.replace(/([a-z])([A-Z])/g,function(match,m1,m2) {
            return m1+"-"+m2.toLowerCase();
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
            plugin.name = gear.camelCase(  g.prefix+plugin.slug );
            $.fn[ plugin.name ] = plugin.plugin;
        });
    };
    g.setDataAPI = function(){
        if( gear.enableDataAPI ){
            $.each( gear.dataAPI , function(name,f){
                name = g.prefix+g.unCamelCase(name);
                $('[data-'+name+']').each(function(){
                    f.call(this,$(this).data(name));
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
               
                var args = arguments; 
                // let's go for a loop !
                this.each(function(){
                    // convert arguments into an array
                    var params = [];
                    Array.prototype.push.apply( params, args );


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

                            if( typeof(self[params[0]]) === "function" ){
                                self.init.apply(this);
                                var f = params[0];
                                params.shift();
                                returnValue = self[f].apply(this,params);
                            }else{
                                returnValue = self.init.apply(this,params);
                            }
                            return true;
                        }
                    }

                    // ok init done. Do we have params ?
                    if( params.length ){
                        // yes, does the first is a function's name
                        if( typeof(self[params[0]]) === "function" ){
                            // yes. First, remove that function from params
                            var f = params[0];
                            params.shift();
                            // then call it with its params
                            returnValue = self[f].apply(this,params);
                            return true;
                        }else{
                            // no. perhaps a param for a main function. Does it exist ?
                            if( typeof(self.main) == "function"){
                                // good so we can call it
                                returnValue = self.main.apply(this,params);
                                return true;
                            }else{
                                // no ? strange... let's return the jquery object
                                returnValue = $this;
                                return true;
                            }
                        }
                    }else{
                        // ok. No params. Perhaps a main function without any params
                        if( typeof(self.main) == "function"){
                            // yes so we can call it
                            returnValue = self.main.apply(this,params);
                            return true;
                        }else{
                            // no ? strange... let's return the jquery object
                            returnValue = $this;
                            return true;
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
        var that    = this;
        // options
        var args = g.getArgs(arguments);
        that.options = {};

        self.options = {
            destroy : true,
            panel   : {
                class : "panel"
            },
            buttons : [
                {
                    text    : "Ok",
                    class   : "btn",
                    onClick : function(){ that.close() }
                }
            ],
            alert   : {
                show    : true
            } 
        }

        if(typeof(args[args.length-1]) === "object" ){
            that.options = args[args.length-1];
            args.pop();
        }
        that.options = $.extend({},
            self.options,
            that.options
        );
        // title
        if( typeof(args[0]) !== "string" ){
            throw new Error("g.alert() must need a string as second argument, currently : " + typeof(args[0]) );
            return false;
        }
        that.title = args[0];
        args.shift();
        // content
        if( typeof(args[0]) !== "string" ){
            throw new Error("g.alert() must need a string as first argument, currently : " + typeof(args[0]) );
            return false;
        }
        that.content = args[0];

        // build html
        that.panel      = $("<div/>")
            .appendTo("body")
            .addClass(that.options.panel.class);
        that.header     = $("<div/>")
            .appendTo(that.panel)
            .addClass("panel-header")
            .html(that.title);
        that.content    = $("<div/>")
            .appendTo(that.panel)
            .addClass("panel-section")
            .html(that.content);
        that.footer     = $("<div/>")
            .appendTo(that.panel)
            .addClass("panel-footer");
        // buttons
        that.buttons = [];
        $.each( that.options.buttons , function( i , btn ){
            that.buttons.push($("<button/>")
                .appendTo(that.footer)
                .addClass(btn.class)
                .text(btn.text)
                .on("click",btn.onClick));
        })
       
        // add the alert() behavior
        that.panel.alert(that.options.alert);

        // * * * METHODS * * *
        // open
        this.open = function(){
            this.panel.alert("open");
        }
        // close
        this.close = function(){
            that.panel.alert("close");
            if(that.options.destroy)
                that.panel.parent().remove();
        }
    });
    // confirm()
    g.Confirm = g.Alert.extend(function(){
        var self    = g.Alert.prototype;
        var parent  = self.parent;                 
        var that    = this;
        parent.b();
    });/*
    // prompt()
    g.Prompt = g.Alert.extend(function(){

    });*/


// - - - - - - -
})(window);


