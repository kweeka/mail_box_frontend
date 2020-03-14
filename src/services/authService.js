(function () {
    angular.module("apiModule")
        .factory("authService", ["$http", function ($http) {
            return {
                auth: function () {},
                registration: function () {},
                getUserInfo: function () {}
            }
        }]);
});