import * as axios from 'axios'

const apiKey = 'AIzaSyDwJfLcgT0e_Q6In9Qj682ZAuPzL-S1pTA'
const apiURL = 'https://www.googleapis.com'
//оптимизация бека чтобы лишнее не приходило
const field = 'totalItems,items(volumeInfo/imageLinks, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/categories)'

const instance = axios.default.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/json',
  },
})

export const API = {
  async fetchBooks(subject: string, searchText: string, sortBy: string, offset: number) {
    try {
      console.log('api')
      const url = `/books/v1/volumes/?q=${searchText}+${subject}&fields=${field}&maxResults=30&orderBy=${sortBy}&offset=${offset}&key=${apiKey}`
      const req = instance.get(url)
      return req
    } catch (error: any) {
      console.log(error.response)
    }
  },
}