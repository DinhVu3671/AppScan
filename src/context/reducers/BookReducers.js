import { UPDATE_BOOK } from "../actions/ActionType";

const bookReducers = (state, { type, payload }) => {
    switch (type) {
        case UPDATE_BOOK:
            return {
                ...state,
                title: payload.title
            }
        /**
         * GET_LIST_POSTS
         */
        // case GET_LIST_POSTS_LOADING:
        //     return {
        //         ...state,
        //         getListPosts: {
        //             ...state.getListPosts,
        //             loading: true,
        //             error: null,
        //         },
        //     };

        // case GET_LIST_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         getListPosts: {
        //             ...state.getListPosts,
        //             loading: false,
        //             data: payload,
        //             error: null,
        //         },
        //     };

        // case GET_LIST_POSTS_FAIL:
        //     return {
        //         ...state,
        //         getListPosts: {
        //             ...state.getListPosts,
        //             loading: false,
        //             error: payload,
        //         },
        //     };


        /**
         * GET_MY_POSTS
         */
        // case GET_MY_POSTS_LOADING:
        //     return {
        //         ...state,
        //         getMyPosts: {
        //             ...state.getMyPosts,
        //             loading: true,
        //             error: null,
        //         },
        //     };

        // case GET_MY_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         getMyPosts: {
        //             ...state.getMyPosts,
        //             loading: false,
        //             data: payload,
        //             error: null,
        //         },
        //     };

        // case GET_MY_POSTS_FAIL:
        //     return {
        //         ...state,
        //         getMyPosts: {
        //             ...state.getMyPosts,
        //             loading: false,
        //             error: payload,
        //         },
        //     };


        /**
         * CREATE_NEW_POST
         */
        // case CREATE_NEW_POST_LOADING:
        //     return {
        //         ...state,
        //         createNewPost: {
        //             ...state.createNewPost,
        //             loading: true,
        //             error: null,
        //         },
        //     };

        // case CREATE_NEW_POST_SUCCESS:
        //     return {
        //         ...state,
        //         createNewPost: {
        //             ...state.createNewPost,
        //             loading: false,
        //             error: null,
        //             data: payload,
        //         },

        //         // getContacts: {
        //         //     ...state.getContacts,
        //         //     loading: false,
        //         //     data: [payload, ...state.getContacts.data],
        //         //     error: null,
        //         // },
        //     };

        // case CREATE_NEW_POST_FAIL:
        //     return {
        //         ...state,
        //         createNewPost: {
        //             ...state.createNewPost,
        //             loading: false,
        //             error: payload,
        //         },
        //     };

        /**
         * DELETE_POST
         */
        // case DELETE_POST_LOADING: {
        //     return {
        //         ...state,
        //         deletePost: {
        //             ...state.deletePost,
        //             loading: true,
        //             error: null,
        //         },
        //     };
        // }

        // case DELETE_POST_SUCCESS: {
        //     return {
        //         ...state,
        //         deletePost: {
        //             ...state.deletePost,
        //             loading: false,
        //             error: null,
        //             data: payload
        //         },
        //     };
        // }

        // case DELETE_POST_FAIL: {
        //     return {
        //         ...state,
        //         deletePost: {
        //             ...state.deletePost,
        //             loading: false,
        //             error: payload,
        //         },
        //     };
        // }

        default:
            return state;
    }
};

export default bookReducers;