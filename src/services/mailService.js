(function () {
    angular.module("apiModule")
        .factory("mailService", ["$http", "apiUrl", function ($http, apiUrl) {
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
            getMailDeletedInbox: function (email_page, count) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/deleted?page=" + email_page + "&count=" + count,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            getMailOutbox: function (email_page, count) {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/outbox?page=" + email_page + "&count=" + count,
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
})();























