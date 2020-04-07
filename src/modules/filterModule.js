(function () {
    angular.module("filterModule", [])
        .filter("emailDateFilter", function () {
        return function (dateTime) {
            var now = new Date;
            now.setHours(0, 0, 0, 0);
            if(dateTime.getTime() < now.getTime()){
                return moment(dateTime).format('YYYY-MM-DD');
            }
            return moment(dateTime).format('HH:mm:ss');
        };
    });
})();
