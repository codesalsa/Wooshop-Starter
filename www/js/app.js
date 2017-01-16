angular.module('wooshop', ['ionic', 'wooshop.controllers', 'wooshop.services', 'ngCart'])

.run(function($rootScope, $ionicPlatform, $ionicLoading, $ionicPopup, $ionicHistory) {
  $ionicPlatform.ready(function() {
    
    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'No Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit",function(a){},function(b){}
      );
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }
    e.preventDefault();
    return false;
  },101);
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
  $stateProvider
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'template/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'template/categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })
  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'template/cart.html',
        controller: 'CartCtrl'
      }
    }
  })
  .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'template/products.html',
          controller: 'ProductsCtrl'
        }
      }
    })

  .state('app.product', {
    url: '/products/:productId',
    views: {
      'menuContent': {
        templateUrl: 'template/product.html',
        controller: 'ProductCtrl'
      }
    }
  })
  .state('app.category', {
		url: "/categories/:getCatSlug",
		views: {
		  'menuContent': {
			templateUrl: "template/category.html",
			controller: 'CategoryCtrl'
		  }
		}
  });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/products');
    
})
