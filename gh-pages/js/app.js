var app = angular.module( 'gear-gh-pages' , ['ngRoute'] );

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
	$scope.mixinsName = ['grid','btn'];
	$scope.mixins = [];

	$scope.loadDoc = function( mixin ){
		var deferred = $q.defer();
		$http.get('gh-pages/data/doc-mixins/mixin.'+mixin+'.json')
			.success(function( data , status ){
				deferred.resolve(data);
			}).error( function( data , status ){
				deferred.reject("Documentation unavailable");
			});
		return deferred.promise;
	}
	
	/* get doc */
	angular.forEach( $scope.mixinsName , function( mixin ){
		$scope.loadDoc( mixin ).then(function( doc ){
			$scope.mixins.push( doc );
		},function(msg){
			alert(msg);
		})
	});
});