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
        })
        .filter("emailFormat", function () {
        return function (emailArr) {
            var emailsArr = [];
            for (var i = 0; i < emailArr.length; i++) {
                var email = new Email(emailArr[i].id, emailArr[i].subject, emailArr[i].sender, emailArr[i].message, emailArr[i].is_opened,
                    emailArr[i].is_important, new Date(emailArr[i].date), emailArr[i].recipient);
                emailsArr.push(email);
            }
            return emailsArr;
        };
        });
})();
