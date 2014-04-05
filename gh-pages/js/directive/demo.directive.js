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
				var code = elt ;
				if( elt.find("code-demo").length > 0 ){
					code = elt.find("code-demo").clone();
					elt.find("code-demo").remove();
				}
				$scope.preview =  $sce.trustAsHtml(elt.html());
				code.find('*').removeClass('ng-scope ng-model ng-binding ng-isolate-scope');
				$scope.code = code.html().replace(/ class=""/g,'');
			});
		}

	};
});