(function () {
   angular.module("mainApp").component("personalComponent", {
       templateUrl: "personalComponent.html",
       controller: personalController,
       bindings: {
           user: "="
       }
   });

   function personalController() {
       var ctrl = this;
       ctrl.$onInit = function() {
           console.log(ctrl.user);
       };
   }
})();