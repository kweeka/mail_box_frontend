(function () {
    angular.module("apiModule")
        .factory("mailService", ["$http", "apiUrl", function ($http, apiUrl) {
        this.apiUrl = apiUrl;
        return {
            getMailInbox: function (email_page) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/inbox?page=" + email_page,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            getMailDeletedInbox: function (email_page, email_page_del) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/inbox?page=" + email_page + "&deleted=" + email_page_del,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            deleteMailInbox: function (arr) {
                return $http ({
                    method: "DELETE",
                    url: apiUrl + "/api/v1/mail/delete_mails",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    },
                    data: {
                        "ids": arr
                    }
                })
            }

        }
    }])
        .constant ("apiUrl", "https://dev1.agafonov.me")
})();