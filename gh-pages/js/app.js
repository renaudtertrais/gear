var app = angular.module( 'gear-gh-pages' , ['ngRoute','ngSanitize','hljs'] );

/* ROUTING */
app.config( function( $routeProvider ){
	$routeProvider.when( '/' , { templateUrl : 'gh-pages/home.html' });
	$routeProvider.otherwise( { redirectTo : '/' });

	var routes = [ 'home' , 'getting-started' , 'css' , 'js' , 'doc' ];
	for (var i = 0; i < routes.length; i++) 
		$routeProvider.when( '/'+routes[i] , { templateUrl : 'gh-pages/'+routes[i]+'.html' });

});

/* MAIN CONTROLLER */
app.controller( 'mainController', function($scope , $location ){
	$scope.menu = [
		{
			title 	:'Getting started',
			url 	:'getting-started'
		},{
			title 	:'CSS',
			url 	:'css'
		},{
			title 	:'JS',
			url 	:'js'
		},{
			title 	:'Doc',
			url 	:'doc'
		},
	]

	$scope.isCurrentPath = function ( path ){
       return $location.path().slice(0,path.length) == path ? 'active' : '' ;
    }
});

/* DOC CONTROLLER */
app.controller( 'docController' , function ( $scope , $http , $q ) {
	$scope.mixinsName = ['init','grid','btn'];
	$scope.mixins = [];

	$scope.loadDoc = function( mixin ){
		var deferred = $q.defer();
		$http.get('gh-pages/data/doc-mixins/mixin.'+mixin+'.json')
			.success(function( data , status ){
				deferred.resolve(data);
			}).error( function( data , status ){
				deferred.reject("Documentation for -"+mixin+"- unavailable");
			});
		return deferred.promise;
	}
	
	/* get doc */
	angular.forEach( $scope.mixinsName , function( mixin ){
		$scope.loadDoc( mixin ).then(function( doc ){
			$scope.mixins.push( doc );
		},function(msg){
			console.log(msg);
		})
	});

	$scope.getLevelIndicator = function(p){
		var out = "";
		for (var i = 0; i < p.level; i++) out += "--";
		return out;
	}
});

/* Code directive */
app.directive( 'demo' , function(){
	return {
		restrict : "E",
		replace : true,
		transclude : true,
		templateUrl : "gh-pages/inc/CSS/tpl.demo.html",
		scope : {},
		controller : function($scope , $transclude , $sce){
			$transclude(function(clone){
				var elt = angular.element("<div/>").append(clone);
				$scope.preview =  $sce.trustAsHtml(elt.html());
				elt.find('*').removeClass('ng-scope ng-model ng-binding ng-isolate-scope');
				console.log(elt.html())
				$scope.code = elt.html().replace(/ class=""/g,'');
			});
		}

	};
});
