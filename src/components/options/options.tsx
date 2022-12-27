import { useState } from "react"
import { search } from "../../redux/async-actions"
import store from "../../redux/store"

export const Options = () => {
    //эти переменные нужны чтобы при изменении значений в 
    //"загрузить еще" и "найти книгу" использовались собственные данные
    const [searchText, setSearchText] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('relevance')
    const [subject, setSubject] = useState<string>('all')

    // если вызывать через useDispatch не срабатывает, видно прикол createStore()
    const searchBooks = () => store.dispatch(search(subject, searchText, sortBy, 0, "first"))

    return (
        <>
            <div className="options" >
                <Item text="Название книги">
                    <input
                        onKeyDown={(e: any) => e.key === "Enter" && searchBooks()}
                        className="OptionsInput"
                        placeholder="Название"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
                </Item>

                <Item text="Категория">
                    <select placeholder="Все" className="OptionsSelect">
                        {["all", "art", "biography", "computers", "history", "medical", "poetry"]
                            .map((filter: string, index: number) =>
                                <option
                                    onClick={() => setSubject(filter)}
                                    value={filter}
                                    key={index}>
                                    #{filter}
                                </option>)}
                    </select>
                </Item>

                <Item text="Сортировать по">
                    <select placeholder="Релевантности" className="OptionsSelect">
                        {["relevance", "newest"]
                            .map((sort: string, index: number) =>
                                <option
                                    onClick={() => setSortBy(sort)}
                                    value={sort}
                                    key={index}>
                                    {sort}
                                </option>)}
                    </select>
                </Item>

                <div
                    className="OptionsButton"
                    role="button"
                    // чтобы не вызывать когда пустое поле инпута
                    style={{ background: searchText.length > 0 ? "#0277BD" : "#cacaca" }}
                    onClick={(): void => searchText.length > 0 && searchBooks()}>
                    <p>Найти книги</p>
                </div>

            </div>
        </>
    )
}

// элемент options в целях уменьшения
type PropsItem = {
    text: string;
    children: React.ReactNode;
}
const Item: React.FC<PropsItem> = ({ children, text }) => {
    return (
        <div>
            <div className="textOption"> 
                {text}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

