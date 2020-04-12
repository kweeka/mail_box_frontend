(function () {
    angular.module("mainApp").component("bottomMailTableComponent", {
        templateUrl: "bottomMailTableComponent.html",
        controller: bottomMailTableController,
        bindings: {
            page: "<",
            emails: "=",
            allCount: "<",
            emailState: "<"
        }
    });

    function bottomMailTableController($state) {
        var ctrl = this;
        ctrl.getMailValMails = function () {
            localStorage.setItem("pageMailCount", ctrl.sele);
            $state.reload();
        };
        ctrl.transition = function () {
            $state.go("mail." + ctrl.emailState, {page: ctrl.page});
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
            if (ctrl.page === 1 ) {
                ctrl.showArrowLast = false;
            }
            if (ctrl.lastMail == ctrl.allCount){
                ctrl.showArrowNext = false;
            }
            /*
            if(ctrl.page === 1 ){
                if(localStorage.getItem("pageMailCount") == mailStorage.getCount()){
                    ctrl.nextPageLimit = false;
                }
                ctrl.firstMail = 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount");
                ctrl.earlyPageLimit = false;
            } else if(localStorage.getItem("pageMailCount") * (ctrl.page) >= mailStorage.getCount()){
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = mailStorage.getCount();
                ctrl.nextPageLimit = false;
            } else {
                ctrl.firstMail = localStorage.getItem("pageMailCount") * (ctrl.page - 1) + 1;
                ctrl.lastMail = localStorage.getItem("pageMailCount") * (ctrl.page);
            }
            */
        };

        ctrl.listMailPage = ['5', '10', '20', '50'];
    }
})();