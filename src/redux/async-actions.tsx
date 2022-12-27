
import { API } from '../api/api';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import BookI from '../components/book/book';

export enum ActionTypes {
  MOREFETCHED = '[books] MOREFETCHED',
  FIRSTFETCHED = '[books] FIRSTFETCHED',
  CHANGEOPTIONS = '[books] CHANGEOPTIONS',

  CHANGESEARCHTEXT = '[books] CHANGESEARCHTEXT',
  CHANGESORTBY = '[books] CHANGESORTBY',
  SETLOADER = '[books] SETLOADER',
  SETSMALLLOADER = '[books] SETSMALLLOADER'
}

interface MoreFetched {
  type: ActionTypes.MOREFETCHED;
  payload: {
    books: BookI[];
    totalCountBooks: number;
  }
}

const morefetched = (data: BookI[], count: number): MoreFetched => {
  return {
    type: ActionTypes.MOREFETCHED,
    payload: {
      books: data,
      totalCountBooks: count
    }

  }
}

interface FirstFetched {
  type: ActionTypes.FIRSTFETCHED;
  payload: {
    books: BookI[];
    totalCountBooks: number;
  }
}

const firstfetched = (data: BookI[], count: number): FirstFetched => {
  return {
    type: ActionTypes.FIRSTFETCHED,
    payload: {
      books: data,
      totalCountBooks: count
    }
  }
}


interface ChangeOptions {
  type: ActionTypes.CHANGEOPTIONS;
  payload: {
    subject: string,
    searchText: string,
    sortBy: string,
  }
}

const changeoptions = (subject: string, searchText: string, sortBy: string): ChangeOptions => {
  return {
    type: ActionTypes.CHANGEOPTIONS,
    payload: {
      subject: subject,
      searchText: searchText,
      sortBy: sortBy,
    }
  }
}

interface SetLoader {
  type: ActionTypes.SETLOADER;
  payload: boolean;
}

const setloader = () => {
  return {
    type: ActionTypes.SETLOADER,
    payload: true
  }
}

interface SetSmallLoader {
  type: ActionTypes.SETSMALLLOADER;
  payload: boolean;
}

const setsmallloader = () => {
  return {
    type: ActionTypes.SETSMALLLOADER,
    payload: true
  }
}

export const search = (subject: string, searchText: string, sortBy: string, offset: number, type: "more" | "first"): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    // запуск лоадера по усл.
    dispatch(type === "first" ? setloader() : setsmallloader())
    API.fetchBooks(subject, searchText, sortBy, offset)
      .then((res: any): void => {
        if (res.status === 200) {

          const responseBooks = res.data.items ? res.data.items.map((item: any) => item.volumeInfo) : []
          // 2 кнопки. При первой = сейвятся значения поиска. При второй = используются засейвленые значения в поиске (в компоненте подгружаются значения из стора)
          if (type === "first") {
            dispatch(changeoptions(subject, searchText, sortBy))
            dispatch(firstfetched(responseBooks, res.data.totalItems));
          }
          if (type === "more") {
            dispatch(morefetched(responseBooks, res.data.totalItems))
          }
        }
      })
  }
}

export type Action = FirstFetched | MoreFetched | ChangeOptions | SetLoader | SetSmallLoader;
