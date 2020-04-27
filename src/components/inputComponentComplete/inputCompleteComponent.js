(function () {
    angular.module("mainApp").component ("inputCompleteComponent", {
        templateUrl: "inputCompleteComponent.html",
        controller: inputCompleteController,
        bindings: {
            type: "<",
            placeholder: "<",
            value: "=",
            error: "=",
            autoCompleteOptions: "="
        }
    });

    function inputCompleteController() {
        var ctrl = this;
        ctrl.change = function () {
            ctrl.error = "";
        };
        ctrl.$onInit = function () {
            ctrl.type = ctrl.type || "text";
        }
    }
})();