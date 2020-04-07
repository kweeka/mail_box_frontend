(function () {
    angular.module("apiModule")
        .factory("mailService", ["$http", "apiUrl", function ($http, apiUrl) {
        this.apiUrl = apiUrl;
        return {
            getMailInbox: function (email_page, count) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/inbox?page=" + email_page + "&count=" + count,
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
            },
            sendMail: function (email, subject, text) {
                return $http ({
                    method: "POST",
                    url: apiUrl + "/api/v1/mail/send",
                    data: {email: email, subject: subject, message: text},
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            getOpenMail: function (mail_id) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/" + mail_id,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            }
        }
    }])
        .constant ("apiUrl", "https://dev1.agafonov.me")
})();























