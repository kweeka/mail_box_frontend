(function () {
    angular.module("apiModule")
        .factory("authService", ["$http", "apiUrl", function ($http, apiUrl) {
            return {
                auth: function (email, password, token_type) {
                    return $http ({
                        method: "POST",
                        url: apiUrl + "/api/v1/auth/login",
                        data: {email: email, password:password, token_type:token_type}
                    })
                },
                registration: function (email, password, name) {
                    return $http ({
                        method: "POST",
                        url: apiUrl + "/api/v1/user/register",
                        data: {email: email, password: password, name: name}
                    })
                },
                getUserInfo: function () {
                    return $http ({
                        method: "GET",
                        url: apiUrl + "/api/v1/user",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                        }
                    })
                },
                updateUserData: function (name) {
                    return $http ({
                        method: "POST",
                        url: apiUrl + "/api/v1/user/update",
                        data: {name: name},
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                        }
                    })
                },
                logout: function () {
                    return $http ({
                        method: "GET",
                        url: apiUrl + "/api/v1/auth/logout",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                        }
                    })
                },
                getContacts: function () {
                    return $http ({
                        method: "GET",
                        url: apiUrl + "/api/v1/contact/list",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                        }
                    })
                }
            }
        }])
})();