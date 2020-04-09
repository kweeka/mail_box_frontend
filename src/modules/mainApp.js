(function () {
    angular.module("mainApp", ["ui.router", "apiModule","storageModule", "filterModule"])
        .config(["$stateProvider", "$locationProvider", "$urlRouterProvider",  function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider.state({
                name: "registration",
                url: "/registration",
                component: "registrationLayout",
                resolve: {
                    user: function (authService, userService) {
                        if (userService.getUser() && localStorage.getItem("authToken")) {
                            return userService.getUser();
                        }
                        if (localStorage.getItem("authToken")){
                            return authService.getUserInfo()
                                .then(function success(response) {
                                    var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                    userService.setUser(user);
                                    return userService.getUser();
                                }, function error() {
                                    return null;
                                });
                        }
                        return null;
                    }
                }
            });
            $stateProvider.state({
                name: "personal",
                url: "/personal",
                component: "personalLayout",
                resolve: {
                    user: function (authService, userService) {
                        if (userService.getUser() && localStorage.getItem("authToken")) {
                            return userService.getUser();
                        }
                        if (localStorage.getItem("authToken")){
                            return authService.getUserInfo()
                                .then(function success(response) {
                                    var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                    userService.setUser(user);
                                    return userService.getUser();
                                }, function error() {
                                    return null;
                                });
                        }
                        return null;
                    }
                }
            });
            $stateProvider.state({
                name: "auth",
                url: "/auth",
                component: "authorizationLayout",
                resolve: {
                    user: function (authService, userService) {
                        if(userService.getUser() && localStorage.getItem("authToken")){
                            return userService.getUser();
                        }
                        if (localStorage.getItem("authToken")){
                            return authService.getUserInfo()
                                .then(function success(response) {
                                    var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                    userService.setUser(user);
                                    return userService.getUser();
                                }, function error() {
                                    return null;
                                });
                        }
                        return null;
                    }
                }
            });
            $stateProvider.state({
                name: "mail",
                url: "/mail",
                component: "mailLayout",
                resolve: {
                   user: function (userService, authService) {
                       if (userService.getUser() && localStorage.getItem("authToken")) {
                           return userService.getUser();
                       }
                       if (localStorage.getItem("authToken")){
                           return authService.getUserInfo()
                               .then(function success(response) {
                                   var user = new User(response.data.response.name, response.data.response.email, response.data.response.groups);
                                   userService.setUser(user);
                                   return userService.getUser();
                               }, function error() {
                                   return null;
                               });
                       }
                       return null;
                   }
                }
            });
            $stateProvider.state({
                name: "mail.inbox",
                url: "/inbox/:page",
                component: "mailInboxComponent",
                params: {
                    page: {
                        value: 1,
                        squash:true,
                        type: "int"
                    }
                },
                resolve: {
                    emails: function (mailStorage, mailService, $stateParams, $state) {
                        var page = $stateParams.page || 1;
                        var count = localStorage.getItem("pageMailCount") || 3;
                        var emailsArr = [];
                        if (localStorage.getItem("authToken")) {
                            return mailService.getMailInbox(page, count)
                                .then(function success(response) {
                                    if (response.data.response.items.length) {
                                        for (var i = 0; i < response.data.response.items.length; i++) {
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                                response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].read,
                                                new Date(response.data.response.items[i].date));
                                            console.log(email);
                                            emailsArr.push(email);
                                        }
                                    }
                                    else {
                                        if (page !== 1 && response.data.response.items.length == 0){
                                            $state.go("mail.inbox", {page: page - 1});
                                        }
                                    }
                                    mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                                        response.data.response.count_unread);
                                    return null;
                                }, function error() {
                                    return null;
                                });
                        }
                    },
                    page: function ($stateParams) {
                        return $stateParams.page;
                    }

                }
            });
            $stateProvider.state({
                name: "mail.outbox",
                url: "/outbox",
                component: "mailOutboxComponent"
            });
            $stateProvider.state({
                name: "mail.deleted",
                url: "/deleted:page",
                component: "mailDeletedComponent",
                params: {
                    page: {
                        value: 1,
                        squash:true,
                        type: "int"
                    }
                },
                resolve: {
                    emails: function (mailStorage, mailService, $stateParams, $state) {
                        var page = $stateParams.page || 1;
                        var count = localStorage.getItem("pageMailCount") || 3;
                        var emailsArr = [];
                        if (localStorage.getItem("authToken")) {
                            return mailService.getMailDeletedInbox(1, 1)
                                .then(function success(response) {
                                    if (response.data.response.items.length) {
                                        for (var i = 0; i < response.data.response.items.length; i++) {
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject,
                                                response.data.response.items[i].sender, response.data.response.items[i].message, response.data.response.items[i].read,
                                                new Date(response.data.response.items[i].date));
                                            console.log(email);
                                            emailsArr.push(email);
                                        }
                                    }
                                    else {
                                        if (page !== 1 && response.data.response.items.length == 0){
                                            $state.go("mail.inbox", {page: page - 1});
                                        }
                                    }
                                    mailStorage.setEmails(emailsArr);
                                    return null;
                                }, function error() {
                                    return null;
                                });
                        }
                    },
                    page: function ($stateParams) {
                        return $stateParams.page;
                    }

                }
            });
            $stateProvider.state({
                name: "mail.new",
                url: "/newMail?recipient&subject",
                component: "newMailComponent",
                params: {
                    recipient: {
                        value: null
                    },
                    subject: {
                        value: null
                    }
                }
            });
            $stateProvider.state({
                name: "mail.open",
                url: "/open/:mailId",
                component: "openMailComponent"
            });
            $urlRouterProvider.otherwise("/mail/inbox");
        }]);
})();


























