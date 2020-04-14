(function () {
    angular.module("mainApp").component("mailTableComponent", {
        templateUrl: "mailTableComponent.html",
        controller: mailTableController,
        bindings: {
            emails: "=",
            countMailBox: "<",
            emailState: "<",
            showMoreMobile: "=",
            outboxTable: "<"
        }
    });
    function mailTableController(mailService, $stateParams, mailStorage) {
        var ctrl = this;
        ctrl.$onInit = function () {
        };
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
        };
        ctrl.addTable = function () {
            var page = $stateParams.page + 1;
            var count = localStorage.getItem("pageMailCount") || 5;
            if(ctrl.emailState == "Inbox"){
                return mailService.getMailInbox(page, count)
                    .then( function (response) {
                        if (response.data.response.items.length > 0) {
                            for (var i = 0; i < response.data.response.items.length; i++) {
                                var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                    response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].read,
                                    new Date(response.data.response.items[i].date));
                                mailStorage.addEmails(email);
                            }
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
            }
            if(ctrl.emailState == "Outbox"){
                return mailService.getMailOutbox(page, count)
                    .then( function (response) {
                        if (response.data.response.items.length > 0) {
                            for (var i = 0; i < response.data.response.items.length; i++) {
                                var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                    response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].read,
                                    new Date(response.data.response.items[i].date));
                                mailStorage.addEmails(email);
                            }
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
            }
            if(ctrl.emailState == "Deleted"){
                return mailService.getMailDeleted(page, count)
                    .then( function (response) {
                        if (response.data.response.items.length > 0) {
                            for (var i = 0; i < response.data.response.items.length; i++) {
                                var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                    response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].read,
                                    new Date(response.data.response.items[i].date));
                                mailStorage.addEmails(email);
                            }
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
            }
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