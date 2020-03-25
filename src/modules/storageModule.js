(function () {
    angular.module("storageModule", [])
        .factory("mailStorage", function () {
            return {
                emails: null,
                setEmails: function (emails) {
                    this.emails = emails;
                },
                getEmails: function () {
                    return this.emails;
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
                }
            };
        });
})();