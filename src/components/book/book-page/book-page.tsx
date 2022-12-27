import { ArrowIcon } from '../../icons/arrow'
import BookI from '../book'
import './book-page.scss'

type PropsBook = {
    book: BookI
    close: () => void
}

export const BookPage: React.FC<PropsBook> = ({ book, close }) => {

    const { authors, title, description, categories, imageLinks } = book

    return (
        <div className="bookPageMain">
            <div className='bookPage'>
                <div className='back' onClick={close}>
                    <ArrowIcon />
                    <span> Вернуться к поиску </span>
                </div>

                <div className='bookpagecontentmain'>
                    <div className='bookPageImageContainer'>
                        <img className='bookpageimg' src={imageLinks?.thumbnail} alt="Отсутствует" />
                    </div>

                    <div className='bookpageinfocontainer'>
                        <div className='bookpageTags'>
                            {categories && categories.map((category: string, index: any) => <span key={index}> #{category} </span>)}
                        </div>

                        <div className='bookpageName'>
                            {title}
                        </div>

                        <div className='bookpageAuthors'>
                            {authors && authors.map((author: string, index: any) => <span key={index}> {author}{authors.length !== index + 1 ? ", " : ''}</span>)}
                        </div>
                        <div className="line" />
                        {description &&
                            <>
                                <div className='textDescriptions'>
                                    Описание
                                </div>
                                <div className='bookpageDescriptions'>
                                    {description}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}