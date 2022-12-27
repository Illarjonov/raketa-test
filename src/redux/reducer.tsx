import BookI from "../components/book/book";
import { Action, ActionTypes } from "./async-actions";

export interface initialStateI {
    books: BookI[];
    totalCountBooks: number | null;
    subject: string,
    searchText: string,
    sortBy: string,
    loader: boolean,
    smallLoader: boolean,
}

export const initialState: initialStateI | undefined = {
    books: [],
    totalCountBooks: null,
    subject: 'all',
    searchText: '',
    sortBy: 'relevance',
    loader: false,
    smallLoader: false
}

export const reducer = (state: initialStateI = initialState, action: Action): initialStateI => {
    switch (action.type) {
        case ActionTypes.FIRSTFETCHED: {
            return {
                ...state,
                books: action.payload.books,
                totalCountBooks: action.payload.totalCountBooks,
                loader: false,
                smallLoader: false
            };
        }
        case ActionTypes.MOREFETCHED: {
            console.log([...state.books, ...action.payload.books])
            return {
                ...state,
                books: [...state.books, ...action.payload.books],
                totalCountBooks: action.payload.totalCountBooks,
                loader: false,
                smallLoader: false
            };
        }
        case ActionTypes.CHANGEOPTIONS: {
            return {
                ...state,
                subject: action.payload.subject,
                searchText: action.payload.searchText,
                sortBy: action.payload.sortBy,
            }
        }
        case ActionTypes.SETLOADER: {
            return{
                ...state,
                loader: true
            }
        }
        case ActionTypes.SETSMALLLOADER: {
            return{
                ...state,
                smallLoader: true
            }
        }
        default:
            return state;
    }
};

export default reducer
