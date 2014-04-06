app.controller('jsController', ['$scope','$timeout',function( $scope , $timeout  ){
    $scope.loadJS = function(){
    	if($("demo").length > 0){
    		$scope.timeout = $timeout( $scope.loadJS , 10 );
    	}else{
    		$timeout.cancel($scope.timeout);
    		console.log("Loaded " + $scope.theTime());
    		init();
    	}
    }

    $scope.theTime = function(){
		var d = new Date() - $scope.time;
		d = new Date(d);
		return d.getSeconds()+":"+d.getMilliseconds();
	}

    $scope.time = new Date();
}]);