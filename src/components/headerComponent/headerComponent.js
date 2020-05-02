(function () {
    angular.module("mainApp").component("headerComponent",{
        templateUrl: "headerComponent.html",
        controller: headerController,
        bindings: {
            search: "="
        }
    });

    function headerController(userService, authService, $state, $stateParams, mailService, mailStorage) {
        var ctrl = this;
        ctrl.$onInit = function() {
            ctrl.user = userService.getUser();
            if (ctrl.user){
                ctrl.auth = true;
            }
        };
        ctrl.logout = function () {
            authService.logout()
                .then(function (response) {
                    console.log(response);
                    localStorage.removeItem("authToken");
                    ctrl.user = null;
                    userService.clearUser();
                    $state.reload();
                }, function error(response) {
                    console.log(response);
                })
        };
        ctrl.callSearch = function () {
            ctrl.currentPath = $state.current.name.slice(5);
            ctrl.currentPath = ctrl.currentPath.charAt(0).toUpperCase() + ctrl.currentPath.substr(1);
            console.log(ctrl.currentPath);
            var page = $stateParams.page || 1;
            var count = localStorage.getItem("pageMailCount") || 5;
            var emailsArr = [];
            if (localStorage.getItem("authToken")) {
                return mailService['getMail' + ctrl.currentPath](page, count, ctrl.search)
                    .then(function success(response) {
                        if (response.data.response.items.length) {
                            for (var i = 0; i < response.data.response.items.length; i++) {
                                if (response.data.response.items[i].subject.length > 20) {
                                    var cut = true;
                                } else cut = false;
                                var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                    response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].is_opened,
                                    new Date(response.data.response.items[i].date), cut, response.data.response.items[i].recipient);
                                emailsArr.push(email);
                            }
                        } else {
                            if (page !== 1 && response.data.response.items.length == 0) {
                                $state.go("mail.inbox", {page: page - 1});
                            }
                        }
                        mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                            response.data.response.count_unread);
                        mailStorage.getEmails();
                        ctrl.search = null;
                        return null;
                    }, function error() {
                        return null;
                    });
            }
        };
    }
})();