(function () {
    angular.module("mainApp").component("inputComponent", {
        templateUrl: "inputComponent.html",
        controller: inputController,
        bindings: {
            type: "<",
            placeholder: "<",
            value: "=",
            error: "="
        }
    });

    function inputController() {
        var ctrl = this;
        ctrl.change = function () {
            ctrl.error = "";
        };
        ctrl.$onInit = function () {
            ctrl.type = ctrl.type || "text";
        }
    }
})();