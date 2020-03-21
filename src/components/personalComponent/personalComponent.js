(function () {
   angular.module("mainApp").component("personalComponent", {
       templateUrl: "personalComponent.html",
       controller: personalController
   });

   function personalController(authService, $state, userService) {
       var ctrl = this;
       (function() {
           authService.getUserInfo()
               .then(function success(response) {
                   userService.setUser(response.data.response.name, response.data.response.email, response.data.response.groups);
                   ctrl.userName = response.data.response.name;
                   ctrl.userEmail = response.data.response.email;
                   ctrl.userGroup = response.data.response.groups;
                   $state.go("mailInbox");
               }, function error(response) {
                   console.log(response);
                   $state.go("auth");
               })
       })();

   }
})();