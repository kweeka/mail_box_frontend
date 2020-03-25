(function () {
    angular.module("mainApp").component("mailTableComponent", {
        templateUrl: "mailTableComponent.html",
        controller: mailTableController,
        bindings: {
            emails: "="
        }
    });
    function mailTableController() {
        var ctrl = this;
        ctrl.checkedAll = false;
        ctrl.arrCheck = [];
        ctrl.checkAll = function () {
            if(ctrl.checkedAll){
                for(var i=0; i < ctrl.emails.length; i++){
                    ctrl.emails[i].checked = false;
                    ctrl.checkedAll = !ctrl.checkedAll;
                }
            } else {
                for(var y=0; y < ctrl.emails.length; y++){
                    ctrl.emails[y].checked = true;
                    ctrl.arrCheck.push(ctrl.emails[y].id);
                    ctrl.checkedAll = !ctrl.checkedAll;
                }
            }
            console.log(ctrl.arrCheck);
        }

    }
})();