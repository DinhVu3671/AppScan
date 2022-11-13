import React, { createContext, useReducer } from "react";
import bookReducers from "./reducers/BookReducers";


export const GlobalContext = createContext({});
const bookInitialState = {
    bookInit : {
        title: "",
        author: "",
        year: "",
        image: []
    }
}
const GlobalProvider = ({ children }) => {
    const [bookState, bookDispatch] = useReducer(bookReducers, bookInitialState);
    // const [contactState, contactDispatch] = useReducer(contactsReducer, contactsInitialState);
    // const [postsState, postsDispatch] = useReducer(postsReducer, postsInitialState);
    // const [chatsState, ChatsDispatch] = useReducer(messagesReducer, chatsInittalState);

    return <GlobalContext.Provider value={{
        bookState,
        bookDispatch,

    }}>{children}</GlobalContext.Provider>
}

export default GlobalProvider;