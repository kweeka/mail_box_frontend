(function () {
    angular.module("userModule", [])
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