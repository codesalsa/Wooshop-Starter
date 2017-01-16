var app = angular.module('wooshop.controllers', ['wooshop.services'])

app.controller('AppCtrl', function($scope, $ionicLoading, $ionicModal, $timeout, $state) {
    $scope.show = function() {
		$ionicLoading.show({
			template: '<ion-spinner class="base-spinner" icon="android"></ion-spinner>'
		});
	};
	
	$scope.hide = function(){
		$ionicLoading.hide();
	};
})

app.controller('CategoriesCtrl', function($rootScope, $scope, wooshopService) {
    $scope.show();
    wooshopService.getCategories().then(function(data) {
        //console.log(data);
        $scope.populateList= function() {
			$scope.cats = data;
		}
		 $scope.populateList();
         $scope.hide();
    })
})

app.controller('ProductsCtrl', function($rootScope, $scope, wooshopService) {
    $scope.show();
    wooshopService.getItems().then(function(data) {
        $scope.productsList= function() {
			$scope.products = data;
		}
		 $scope.productsList();
        $scope.hide();
    })

})

app.controller('ProductCtrl', function($rootScope, $scope, $stateParams, wooshopService, ngCart) {
    $scope.show();
    wooshopService.getItem($stateParams.productId).then(function (data){
        $scope.product =data;
         //console.log($scope.product);
        $scope.hide();
    })
});

app.controller('CategoryCtrl', function($scope, $stateParams, wooshopService, $stateParams) {
    $scope.show();
    wooshopService.getCatItems($stateParams.getCatSlug).then(function(data){
        $scope.productsList= function() {
            $scope.products = data;
            //console.log($scope.products);
        }
        $scope.productsList();
        $scope.hide();
    })
})

app.controller ('CartCtrl', function($rootScope, $scope, $stateParams, wooshopService, ngCart, SETTINGS) {

    wooshopService.getIndex().then(function(data){
        var currency = data.currency_format;
        var shipping_charge =  SETTINGS.shipping_charge;
        var tax_rate =  SETTINGS.tax_rate;
        //alert(shipping_charge);
        
        ngCart.setTaxRate(tax_rate);
        ngCart.setShipping(shipping_charge); 
        ngCart.setCurrency(currency); 
    });
});
  
  


