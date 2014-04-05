app.controller( 'docController' , function ( $scope , $http , $q ) {
	$scope.mixinsName = [
		'init',
		'grid',
		'btn' ,
		'list',
		'list-icon',
		'table',
		'text',
		'headings',
		'link',
		'code'
	];
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
		for (var i = 1; i < p.level; i++) out += "--- ";
		return out;
	}
});