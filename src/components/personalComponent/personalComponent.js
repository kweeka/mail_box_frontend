(function () {
   angular.module("mainApp").component("personalComponent", {
       templateUrl: "personalComponent.html",
       controller: personalController,
       bindings: {
           user: "="
       }
   });

   function personalController(authService, userService, $state) {
       var ctrl = this;
       ctrl.saveEdit = function () {
           authService.updateUserData(ctrl.nameEdit)
               .then (function success(response) {
                   console.log(response);
                   ctrl.showEditForm = !ctrl.showEditForm;
                   var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                   userService.setUser(user);
                   $state.reload();
                   return userService.getUser();
               }, function error(response) {
                   console.log(response);
                   return null;
               })
       };
   }
})();