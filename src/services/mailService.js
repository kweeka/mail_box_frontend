(function () {
    angular.module("apiModule")
        .factory("mailService", ["$http", "apiUrl", function ($http, apiUrl) {
        return {
            getMailInbox: function (email_page, count, searchMail = "") {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/inbox?page=" + email_page + "&count=" + count + "&filter=" + searchMail,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            getMailDeleted: function (email_page, count, searchMail = "") {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/deleted?page=" + email_page + "&count=" + count + "&filter=" + searchMail,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            getMailOutbox: function (email_page, count, searchMail = "") {
                return $http ({
                    method: "GET",
                    url: apiUrl + "/api/v1/mail/outbox?page=" + email_page + "&count=" + count + "&filter=" + searchMail,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                })
            },
            deleteMail: function (arr) {
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
            },
            changeImportantMail: function (email_id, important) {
                return $http ({
                    method: "POST",
                    url: apiUrl + "/api/v1/mail/important",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    },
                    data: {
                        "email_id": email_id,
                        "important": important
                    }
                })
            }
        }
    }])
})();























