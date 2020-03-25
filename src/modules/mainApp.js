(function () {
    angular.module("mainApp", ["ui.router", "apiModule","storageModule"])
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
                        console.log("not");
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
                name: "mail.mailInbox",
                url: "/inbox",
                component: "mailInboxComponent",
                resolve: {
                    emails: function (mailStorage, mailService) {
                        var emailsArr = [];
                        if (localStorage.getItem("authToken")) {
                            return mailService.getMailInbox(3)
                                .then(function success(response) {
                                    var now = new Date;
                                    var curr_date = now.getDate();
                                    if ((now.getMonth() + 1) < 10) {
                                        var curr_month = "0" + (now.getMonth() + 1);
                                    } else {curr_month = now.getMonth() + 1}
                                    var curr_year = now.getFullYear();
                                    var dateNow = curr_year + "-" + curr_month + "-" + curr_date;
                                    for (var i = 0; i < response.data.response.items.length; i++) {
                                        if (dateNow == response.data.response.items[i].date.slice(0, 10)){
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject, response.data.response.items[i].sender, response.data.response.items[i].text, response.data.response.items[i].read, response.data.response.items[i].date.slice(0, 10));
                                        } else {
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject, response.data.response.items[i].sender, response.data.response.items[i].text, response.data.response.items[i].read, response.data.response.items[i].date.slice(11));
                                        }
                                        emailsArr.push(email);
                                    }
                                    mailStorage.setEmails(emailsArr);
                                    return mailStorage.getEmails();
                                    }, function error() {
                                        return null;
                                    }
                                );
                        }
                    }
                }
            });
            $stateProvider.state({
                name: "mail.mailOutbox",
                url: "/outbox",
                component: "mailOutboxComponent"
            });
            $stateProvider.state({
                name: "mail.mailDeleted",
                url: "/deleted",
                component: "mailDeletedComponent",
                resolve: {
                    emails: function (mailStorage, mailService) {
                        var emailsArr = [];
                        if (localStorage.getItem("authToken")) {
                            return mailService.getMailDeletedInbox(0,1)
                                .then (function success(response) {
                                    var now = new Date;
                                    var curr_date = now.getDate();
                                    if ((now.getMonth() + 1) < 10) {
                                        var curr_month = "0" + (now.getMonth() + 1);
                                    } else {curr_month = now.getMonth() + 1}
                                    var curr_year = now.getFullYear();
                                    var dateNow = curr_year + "-" + curr_month + "-" + curr_date;
                                    for (var i = 0; i < response.data.response.items.length; i++) {
                                        if (dateNow == response.data.response.items[i].date.slice(0, 10)){
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject, response.data.response.items[i].sender, response.data.response.items[i].text, response.data.response.items[i].read, response.data.response.items[i].date.slice(0, 10));
                                        } else {
                                            var email = new Email(response.data.response.items[i].id, response.data.response.items[i].subject, response.data.response.items[i].sender, response.data.response.items[i].text, response.data.response.items[i].read, response.data.response.items[i].date.slice(11));
                                        }
                                        emailsArr.push(email);
                                    }
                                    mailStorage.setEmails(emailsArr);
                                    return mailStorage.getEmails();
                                }, function error(response) {
                                    console.log(response);
                                })
                        }
                    }
                }
            });
            $urlRouterProvider.otherwise("/mail");
        }]);
})();
