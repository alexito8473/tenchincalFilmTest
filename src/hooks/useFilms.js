
import { getFilmsByTitle } from "../services/obtainFilms.js"
import { useState, useEffect, useRef } from 'react'

export function useObtainFilms({ search, canSearchFilm }) {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState(null)
  const previeSearch = useRef(search)
  
  const searchFilms = async () => {
    const title = search
    if(previeSearch.current==title) return;
    if (canSearchFilm) {
      try {
        setLoading(true)
        setMessageError(null)
        previeSearch.current=title
        const response = await getFilmsByTitle(title)
        if(response.Response=="True"){
          setFilms(mappedMovies(response.Search))
        }else{
          setFilms([])
          setMessageError(response.Error)
        }
      } catch (error) {
        setFilms([])
        setMessageError("New error")
      } finally {
        setLoading(false)
      }
    }
  }
  
  function mappedMovies(jsonMovie) {
    return jsonMovie.map((film) => {
      return {
        id: film.imdbID,
        title: film.Title,
        year: film.Year,
        type: film.Type,
        poster: film.Poster
      }
    })
  }

  return { films, messageError, loading, searchFilms }
}