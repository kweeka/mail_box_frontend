(function () {
    angular.module("mainApp").component("bottomMailTableComponent", {
        templateUrl: "bottomMailTableComponent.html",
        controller: bottomMailTableController,
        bindings: {
            page: "<",
            emails: "=",
            allCount: "<"
        }
    });

    function bottomMailTableController($state) {
        var ctrl = this;
        ctrl.currentPath = $state.current.name.slice(5);
        ctrl.getMailValMails = function () {
            localStorage.setItem("pageMailCount", ctrl.sele);
            $state.reload();
        };
        ctrl.transition = function () {
            $state.go("mail." + ctrl.currentPath, {page: ctrl.page});
        };
        ctrl.$onInit = function () {
            ctrl.count = localStorage.getItem("pageMailCount");
            if(ctrl.count){
                ctrl.sele = ctrl.count;
            } else {
                ctrl.sele = 10;
            }
            ctrl.showArrowNext = true;
            ctrl.showArrowLast = true;
            ctrl.firstMail = ((ctrl.page-1) * ctrl.count + 1);
            ctrl.lastMail = ctrl.emails.length + ((ctrl.page-1) * ctrl.count);
            if (ctrl.page === 1) {
                ctrl.showArrowLast = false;
            }
            if (ctrl.lastMail == ctrl.allCount){
                ctrl.showArrowNext = false;
            }
        };

        ctrl.listMailPage = ['5', '10', '20', '50'];
    }
})();