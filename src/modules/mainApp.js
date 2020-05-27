(function () {
    angular.module("mainApp", ["ui.router", "apiModule","storageModule", "filterModule", "autoCompleteModule", "ngSanitize"])
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
                                   localStorage.removeItem("authToken");
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
                    emails: function (mailStorage, mailService, $stateParams, $state, $filter) {
                        var page = $stateParams.page || 1;
                        var count = localStorage.getItem("pageMailCount") || 5;
                        if (localStorage.getItem("authToken")) {
                            return mailService.getMailInbox(page, count)
                                .then(function success(response) {
                                    if (response.data.response.items.length) {
                                        var emailsArr = $filter('emailFormat')(response.data.response.items);
                                    }  else if (page === 1 && response.data.response.items.length === 0) {
                                        emailsArr =[];
                                    } else {
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
                        } else {
                            $state.go("mail/auth");
                        }
                    },
                    page: function ($stateParams) {
                        return $stateParams.page;
                    }

                }
            });
            $stateProvider.state({
                name: "mail.outbox",
                url: "/outbox/:page",
                component: "mailOutboxComponent",
                params: {
                    page: {
                        value: 1,
                        squash:true,
                        type: "int"
                    }
                },
                resolve: {
                    emails: function (mailStorage, mailService, $stateParams, $state, $filter) {
                        var page = $stateParams.page || 1;
                        var count = localStorage.getItem("pageMailCount") || 5;
                        if(localStorage.getItem("authToken")){
                            return mailService.getMailOutbox(page, count)
                                .then (function success(response) {
                                        if(response.data.response.items.length){
                                            var emailsArr = $filter('emailFormat')(response.data.response.items);
                                        } else if (page === 1 && response.data.response.items.length === 0) {
                                            emailsArr =[];
                                        } else {
                                            if (page !== 1 && response.data.response.items.length == 0) {
                                                $state.go("mail.outbox", {page: page - 1});
                                            }
                                        }
                                        mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                                            response.data.response.count_unread);
                                        return null;
                                    }, function error() {
                                        return null;
                                    }
                                )
                        }
                    },
                    page: function ($stateParams) {
                        return $stateParams.page;
                    }
                }
            });
            $stateProvider.state({
                name: "mail.deleted",
                url: "/deleted/:page",
                component: "mailDeletedComponent",
                params: {
                    page: {
                        value: 1,
                        squash:true,
                        type: "int"
                    }
                },
                resolve: {
                    emails: function (mailStorage, mailService, $stateParams, $state, $filter) {
                        var page = $stateParams.page || 1;
                        var count = localStorage.getItem("pageMailCount") || 5;
                        if(localStorage.getItem("authToken")){
                            return mailService.getMailDeleted(page, count)
                                .then (function success(response) {
                                        if(response.data.response.items.length){
                                            var emailsArr = $filter('emailFormat')(response.data.response.items);
                                        }  else if (page === 1 && response.data.response.items.length === 0) {
                                            emailsArr =[];
                                        } else {
                                            if (page !== 1 && response.data.response.items.length == 0) {
                                                $state.go("mail.deleted", {page: page - 1});
                                            }
                                        }
                                            mailStorage.setEmails(emailsArr, response.data.response.count_inbox, response.data.response.count_outbox, response.data.response.count_deleted,
                                                response.data.response.count_unread);
                                            return null;
                                    }, function error() {
                                        return null;
                                    }
                                )
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
                },
                resolve: {
                    contacts: function (authService, contactStorage) {
                        return authService.getContacts()
                            .then (function success(response) {
                                contactStorage.setContactsList(response.data.response.items);
                                return null;
                            }, function error(response) {
                                console.log(response);
                            });
                    }
                }
            });
            $stateProvider.state({
                name: "mail.open",
                url: "/open/:mailId",
                component: "openMailComponent"
            });
            $urlRouterProvider.otherwise("/mail/inbox");
        }
        ])
        .constant("apiUrl", "http://mail-backend.agafonov.me/");
})();


























