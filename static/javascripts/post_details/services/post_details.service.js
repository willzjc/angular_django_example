/**
* PostDetails
* @namespace thinkster.post_details.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.post_details.services')
    .factory('PostDetails', PostDetails);

  PostDetails.$inject = ['$http'];

  /**
  * @namespace PostDetails
  */
  function PostDetails($http) {
    /**
    * @name PostDetails
    * @desc The factory to be returned
    * @memberOf thinkster.post_details.services.PostDetails
    */
    var PostDetails = {
      destroy: destroy,
      get: get,
      update: update
    };

    return PostDetails;

    /////////////////////

    /**
    * @name destroy
    * @desc Destroys the given post_details
    * @param {Object} post_details The post_details to be destroyed
    * @returns {Promise}
    * @memberOf thinkster.post_details.services.PostDetails
    */
    function destroy(post_details) {
      return $http.delete('/api/v1/accounts/' + post_details.id + '/');
    }


    /**
    * @name get
    * @desc Gets the post_details for user with username `username`
    * @param {string} post_id The username of the user to fetch
    * @returns {Promise}
    * @memberOf thinkster.post_details.services.PostDetails
    */
    function get(post_id) {
      return $http.get('/api/v1/post_details/' + post_id + '/');
    }


    /**
    * @name update
    * @desc Update the given post_details
    * @param {Object} post_details The post_details to be updated
    * @returns {Promise}
    * @memberOf thinkster.post_details.services.PostDetails
    */
    function update(post_details) {
      return $http.put('/api/v1/post_details/' + post_details.post_id + '/', post_details);
    }
  }
})();
