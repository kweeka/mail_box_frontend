(function () {
    angular.module("storageModule", [])
        .factory("mailStorage", function () {
            return {
                emails: null,
                count: null,
                setEmails: function (emails, count) {
                    this.emails = emails;
                    this.count = count;
                },
                getEmails: function () {
                    return this.emails;
                },
                getCount: function () {
                    return this.count;
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