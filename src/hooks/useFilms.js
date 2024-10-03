
import { getFilmsByTitle } from "../services/obtainFilms.js"
import { useState, useRef, useMemo } from 'react'


export function useObtainFilms({ search, canSearchFilm, isSort }) {

  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState(null)
  const previeSearch = useRef(search)

  const filteredFilms = useMemo(() => {
    return isSort ? [...films].sort((a, b) =>
      a.title.localeCompare(b.title)
    ) : films;
  }, [isSort,films])

  async function searchFilms() {
    const title = search
    if (previeSearch.current == title) {
      return;
    }
    if (!canSearchFilm) {
      return;
    }

    try {
      setLoading(true)
      setMessageError(null)
      previeSearch.current = title
      const response = await getFilmsByTitle(title)
      if (response.Response == "True") {
        setFilms(mappedMovies(response.Search))
      } else {
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

  return { films: filteredFilms, messageError, loading, searchFilms }
}