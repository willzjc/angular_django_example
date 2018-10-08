/**
 * PostDetailDetailSettingsController
 * @namespace thinkster.post_details.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.post_details.controllers')
        .controller('PostDetailSettingsController', PostDetailSettingsController);

    PostDetailSettingsController.$inject = [
        '$location', '$routeParams', 'Authentication', 'PostDetail', 'Snackbar'
    ];

    /**
     * @namespace PostDetailSettingsController
     */
    function PostDetailSettingsController($location, $routeParams, Authentication, PostDetail, Snackbar) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();


        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated.
         * @memberOf thinkster.post_details.controllers.PostDetailSettingsController
         */
        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username.substr(1);

            // Redirect if not logged in
            if (!authenticatedAccount) {
                $location.url('/');
                Snackbar.error('You are not authorized to view this page.');
            } else {
                // Redirect if logged in, but not the owner of this post_detail.
                if (authenticatedAccount.username !== username) {
                    $location.url('/');
                    Snackbar.error('You are not authorized to view this page.');
                }
            }

            PostDetail.get(username).then(post_detailSuccessFn, post_detailErrorFn);

            /**
             * @name post_detailSuccessFn
             * @desc Update `post_detail` for view
             */
            function post_detailSuccessFn(data, status, headers, config) {
                vm.post_detail = data.data;
            }

            /**
             * @name post_detailErrorFn
             * @desc Redirect to index
             */
            function post_detailErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }
        }


        /**
         * @name destroy
         * @desc Destroy this user's post_detail
         * @memberOf thinkster.post_details.controllers.PostDetailSettingsController
         */
        function destroy() {
            PostDetail.destroy(vm.post_detail.username).then(post_detailSuccessFn, post_detailErrorFn);

            /**
             * @name post_detailSuccessFn
             * @desc Redirect to index and display success snackbar
             */
            function post_detailSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                window.location = '/';

                Snackbar.show('Your account has been deleted.');
            }


            /**
             * @name post_detailErrorFn
             * @desc Display error snackbar
             */
            function post_detailErrorFn(data, status, headers, config) {
                Snackbar.error(data);
            }
        }


        /**
         * @name update
         * @desc Update this user's post_detail
         * @memberOf thinkster.post_details.controllers.PostDetailSettingsController
         */
        function update() {
            PostDetail.update(vm.post_detail).then(post_detailSuccessFn, post_detailErrorFn);

            /**
             * @name post_detailSuccessFn
             * @desc Show success snackbar
             */
            function post_detailSuccessFn(data, status, headers, config) {
                Snackbar.show('Your post_detail has been updated.');
            }


            /**
             * @name post_detailErrorFn
             * @desc Show error snackbar
             */
            function post_detailErrorFn(data, status, headers, config) {
                Snackbar.error(data);
            }
        }
    }
})();
