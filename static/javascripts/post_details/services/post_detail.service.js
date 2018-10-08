/**
 * PostDetail
 * @namespace thinkster.post_details.services
 */
(function () {
    'use strict';

    angular
        .module('thinkster.post_details.services')
        .factory('PostDetail', PostDetail);

    PostDetail.$inject = ['$http'];

    /**
     * @namespace PostDetail
     */
    function PostDetail($http) {
        /**
         * @name PostDetail
         * @desc The factory to be returned
         * @memberOf thinkster.post_details.services.PostDetail
         */
        var PostDetail = {
            destroy: destroy,
            get: get,
            getRelated: getRelated
            // update: update
        };

        return PostDetail;

        /////////////////////

        /**
         * @name destroy
         * @desc Destroys the given post_detail
         * @param {Object} post_detail The post_detail to be destroyed
         * @returns {Promise}
         * @memberOf thinkster.post_details.services.PostDetail
         */
        function destroy(post_detail) {
            return $http.delete('/api/v1/post_details/' + post_detail.id + '/');
        }


        /**
         * @name get
         * @desc Gets the post_detail for user with username `username`
         * @param {string} username The username of the user to fetch
         * @returns {Promise}
         * @memberOf thinkster.post_details.services.PostDetail
         */
        function get(post_id) {
            return $http.get('/api/v1/post_details/' + post_id + '/' );
        }

        function getRelated(post_id) {
            return $http.get('/api/v1/post_details/' + post_id + '/' );
        }


        // /**
        //  * @name update
        //  * @desc Update the given post_detail
        //  * @param {Object} post_detail The post_detail to be updated
        //  * @returns {Promise}
        //  * @memberOf thinkster.post_details.services.PostDetail
        //  */
        // function update(post_detail) {
        //     return $http.put('/api/v1/post_details/' + post_detail.post_id + '/', post_detail);
        // }
    }
})();
