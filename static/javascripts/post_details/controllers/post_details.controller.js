/**
* PostDetailsController
* @namespace thinkster.post_details.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.post_details.controllers')
    .controller('PostDetailsController', PostDetailsController);

  PostDetailsController.$inject = ['$location', '$routeParams', 'ProfileRatings', 'Post', 'Snackbar'];

  /**
  * @namespace PostDetailsController
  */
  function PostDetailsController($location, $routeParams, ProfileRatings, Post, Snackbar) {
    var vm = this;

    vm.posts = undefined;
    vm.post_ratings = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.post_details.controllers.PostDetailsController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Posts.get(username).then(postsSuccessFn, postsErrorFn);

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
