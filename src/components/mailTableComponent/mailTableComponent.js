(function () {
    angular.module("mainApp").component("mailTableComponent", {
        templateUrl: "mailTableComponent.html",
        controller: mailTableController,
        bindings: {
            countMailBox: "<",
            showMoreMobile: "=",
            outboxTable: "<",
        }
    });
    function mailTableController(mailService, $stateParams, mailStorage, $state, $filter, $timeout) {
        var ctrl = this;
        $timeout(function () {
            ctrl.mailStorage = mailStorage;
        }, 1000);
        ctrl.checkedAll = false;
        ctrl.arrCheck = [];
        ctrl.checkAll = function () {
            if(ctrl.checkedAll){
                for(var i=0; i < ctrl.mailStorage.emails.length; i++){
                    ctrl.mailStorage.emails[i].checked = false;
                    ctrl.checkedAll = !ctrl.checkedAll;
                }
            } else {
                for(var y=0; y < ctrl.mailStorage.emails.length; y++){
                    ctrl.mailStorage.emails[y].checked = true;
                    ctrl.arrCheck.push(ctrl.mailStorage.emails[y].id);
                    ctrl.checkedAll = !ctrl.checkedAll;
                }
            }
        };
        ctrl.addTable = function () {
            ctrl.currentPath = $state.current.name.slice(5);
            ctrl.currentPath = ctrl.currentPath.charAt(0).toUpperCase() + ctrl.currentPath.substr(1);
            var page = $stateParams.page + 1;
            var count = localStorage.getItem("pageMailCount") || 5;
            return mailService['getMail' + ctrl.currentPath](page, count)
                .then( function (response) {
                    if (response.data.response.items.length) {
                        var emailsArr = $filter('emailFormat')(response.data.response.items);
                        mailStorage.addEmails(emailsArr);
                        $stateParams.page++;
                        console.log(mailStorage.getEmails().length);
                        if(mailStorage.getEmails().length == ctrl.countMailBox){
                            ctrl.showMoreMobile = false;
                        }
                        return mailStorage.getEmails();
                    }
                }, function error() {
                    return null;
                })
        };
        ctrl.changeSatusImportant = function (emailId, importantMail) {
            if (importantMail){
                var statusImportant = 1;
            } else {
                statusImportant = 0;
            }
            mailService.changeImportantMail(emailId, statusImportant)
                .then(function success(response) {
                    console.log(response);
                }, function error(response) {
                    console.log(response);
                });
        };

        /*ctrl.$onInit = function () {
            for(var i=0; i < ctrl.emails.length; i++) {
                console.log($filter('emailDateFilter')(ctrl.emails[i].dateTime));
            }
        };*/
        ctrl.prom = new Promise (
            function (resolve, reject) {
                if(ctrl.val == 2){
                    setTimeout(function() {resolve(1)}, 5000);
                } else {
                    reject (2);
                }
            }
        );
        console.log("zero");
        ctrl.test = function () {
            console.log("one");
            ctrl.prom
                .then (function success(res) {
                    console.log(res);
                }, function error(res) {
                })
                .catch (function error(res) {
                })
        };
        ctrl.test();
    }
})();