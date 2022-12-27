import { useState } from 'react';
import { BookPage } from './book-page/book-page';
import './book.scss'

export default interface BookI {
    authors: string[];
    title: string;
    description?: string | undefined;
    categories?: string[] | undefined;
    imageLinks?: ImageLinksI | undefined;
}

interface ImageLinksI {
    smallThumbnail: string | undefined | '';
    thumbnail: string | undefined | '';
}


type PropsBook = {
    book: BookI
}

export const Book: React.FC<PropsBook> = ({ book }) => {
    const { authors, title, categories, imageLinks } = book
    // Открытие карточки книги
    const [bookPage, setBookPage] = useState<boolean>(false)

    return (
        <>
        <div className="book" onClick={()=> setBookPage(true)}>
            <div className="photoContainer" >
                <img alt="отсутсвует" src={imageLinks?.smallThumbnail && imageLinks.smallThumbnail} className="photo" />
            </div>
            <div className="info">
                <div className="tags">
                    {categories && categories.map((category: string, index: any) => <span key={index}> #{category} </span>)}
                </div>
                <div className="name">
                    {title}
                </div>
                <div className="author">
                    {authors && authors.map((author: string, index: any) => <span key={index}> {author}{authors.length !== index + 1 ? ", " : ''}</span>)}
                </div>
            </div>
        </div>
        {/* карточка книги */}
        {bookPage && <BookPage book={book} close={()=>setBookPage(false)}/>}
        </>
    )
}
