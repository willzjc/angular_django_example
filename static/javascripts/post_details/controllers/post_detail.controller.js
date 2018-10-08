/**
 * PostDetailController
 * @namespace thinkster.post_details.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.post_details.controllers')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['$location', '$routeParams', 'Posts', 'PostDetail', 'Snackbar'];

    /**
     * @namespace PostDetailController
     */
    function PostDetailController($location, $routeParams, Posts, PostDetail, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.post_details.controllers.PostDetailController
         */
        function activate() {
            var username = $routeParams.username.substr(1);
            print($routeParams.username);
            console.log($routeParams.username);
            PostDetail.get(username).then(profileSuccessFn, profileErrorFn);

            Posts.get(username).then(postsSuccessFn, postsErrorFn);

            var post_detail = 'var';
            Posts.get(post_detail).then(postsSuccessFn, postsErrorFn);

            /**
             * @name profileSuccessProfile
             * @desc Update `profile` on viewmodel
             */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }


            /**
             * @name profileErrorFn
             * @desc Redirect to index and show error Snackbar
             */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                Snackbar.error('That user does not exist.');
            }


            /**
             * @name postsSucessFn
             * @desc Update `posts` on viewmodel
             */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }


            /**
             * @name postsErrorFn
             * @desc Show error snackbar
             */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();
