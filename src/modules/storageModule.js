(function () {
    angular.module("storageModule", [])
        .factory("mailStorage", function () {
            return {
                emails: null,
                countInbox: null,
                countOutbox: null,
                countDeleted: null,
                countUnread: null,
                setEmails: function (emails, countInbox, countOutbox, countDeleted, countUnread) {
                    this.emails = emails;
                    this.countInbox = countInbox;
                    this.countOutbox = countOutbox;
                    this.countDeleted = countDeleted;
                    this.countUnread = countUnread;
                },
                getEmails: function () {
                    return this.emails;
                },
                getCountInbox: function () {
                    return this.countInbox;
                },
                getCountOutbox: function () {
                    return this.countOutbox;
                },
                getCountDeleted: function () {
                    return this.countDeleted;
                },
                getCountUnread: function () {
                    return this.countUnread;
                },
                addEmails: function (arr) {
                    this.emails.push(arr);
                }
            }
        })
        .factory("userService", function () {
            return {
                user: null,
                setUser: function (user) {
                    if (!(user instanceof User)){
                        throw new Error ("Invalid user");
                    }
                    this.user = user;
                },
                getUser: function () {
                    return this.user;
                },
                clearUser: function () {
                    this.user = null;
                }
            };
        });
})();