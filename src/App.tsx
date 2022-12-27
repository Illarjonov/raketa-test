import * as React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { initialStateI } from './redux/reducer';
import { search } from './redux/async-actions';
import store from './redux/store';
import BookI, { Book } from './components/book/book';
import { Options } from './components/options/options';
import Loader from './components/UI/loader/loader';


function App() {
    //актуальные данный у стора
    const books = useSelector((state: initialStateI) => state.books)
    const totalCountBooks = useSelector((state: initialStateI) => state.totalCountBooks)
    const searchText = useSelector((state: initialStateI) => state.searchText)
    const sortBy = useSelector((state: initialStateI) => state.sortBy)
    const subject = useSelector((state: initialStateI) => state.subject)
    const loader = useSelector((state: initialStateI) => state.loader)
    const smallLoader = useSelector((state: initialStateI) => state.smallLoader)

    return (
        <div className="App">
            <>
                <header className="header" />
                <div className="wrapper">
                    <div className="content">
                        <div className="mainText">
                            Быстрый поиск книг
                        </div>
                        <>
                        {/* тут панель параметров */}
                            <Options />
                        </>
                        <div className="line" />
                        {
                            loader ? <Loader />
                                : <>
                                    {
                                        totalCountBooks !== null ?
                                            <>
                                                <div className="books">
                                                    <div className="countBooks">Найдено {totalCountBooks} результатов </div>
                                                    <div className="contentBooks">
                                                        {
                                                            books.map((book: BookI, index: number) =>
                                                                <Book key={index} book={book} />)
                                                        }
                                                    </div>
                                                </div>
                                                {totalCountBooks > books.length &&
                                                    <>
                                                        {smallLoader ? <Loader />
                                                            : <div className="showmore" onClick={() => store.dispatch(search(subject, searchText, sortBy, books.length, "more"))}>
                                                                Показать еще
                                                            </div>
                                                        }
                                                    </>
                                                }
                                            </>
                                            : <div className="nullCount"> Введите параметры поиска </div>
                                    }
                                </>
                        }
                    </div>
                </div>
            </>
        </div>
    )
}

export default App
