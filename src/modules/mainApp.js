(function () {
    angular.module("mainApp", ["ui.router", "apiModule","userModule"])
        .config(["$stateProvider", "$locationProvider", "$urlRouterProvider",  function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider.state({
                name: "registration",
                url: "/registration",
                component: "registrationLayout",
                resolve: {
                    user: function (authService, userService) {
                        if (userService.getUser()) {
                            return userService.getUser();
                        }
                        if (localStorage.getItem("authToken")){
                            return authService.getUserInfo()
                                .then(function success(response) {
                                    var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                    userService.setUser(user);
                                    return userService.getUser();
                                }, function error() {
                                    return null;
                                });
                        }
                        return null;
                    }
                }
            });
            $stateProvider.state({
                name: "personal",
                url: "/personal",
                component: "personalLayout"
            });
            $stateProvider.state({
                name: "auth",
                url: "/auth",
                component: "authorizationLayout"
            });
            $stateProvider.state({
                name: "mailInbox",
                url: "/inbox",
                component: "mailInboxLayout",
                resolve: {
                   user: function (userService, authService) {
                       if (userService.getUser()) {
                           return userService.getUser();
                       }
                       if (localStorage.getItem("authToken")){
                           return authService.getUserInfo()
                               .then(function success(response) {
                                   var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                   userService.setUser(user);
                                   return userService.getUser();
                               }, function error() {
                                   return null;
                               });
                       }
                       return null;
                   }
                }
            });
            $urlRouterProvider.otherwise("/inbox");
        }]);
})();
