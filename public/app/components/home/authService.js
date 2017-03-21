(function() {

    angular.module('mainApp').factory('AuthFactory', AuthFactory);

    function AuthFactory($cookies) {

        function isLoggedIn() {
            if ($cookies.get('auth')) {
                return true;
            } else {
                return false;
            };
        };

        function checkAdminStatus() {
            if ($cookies.get('auth')) {
                let user = JSON.parse($cookies.get('auth'));
                if (user.data.isAdmin === true) {
                    return true;
                }
            } else {
                return false;
            };
        };

        return {
            isLoggedIn: isLoggedIn,
            checkAdminStatus: checkAdminStatus
        };

    };

}());
