import { Film } from './components/film'
import { useObtainFilms } from './hooks/useFilms'
import { useSearch } from './hooks/useSearch'
import './App.css'


function App() {
  const { search, error, isSort, canSearchFilm, handleChange, handleSubmit, handleSort } = useSearch()
  const { films, messageError, loading, searchFilms } = useObtainFilms({ search, canSearchFilm, isSort })

  const handleOnClick = (event) => {
    handleSubmit(event)
    searchFilms()
  }

  return (
    <>
      <header >
        <form onChange={handleChange} onSubmit={handleOnClick}>
          <>
            <input name="title" placeholder='Matrix....'></input>
            <div>
            <input onChange={handleSort} type='checkbox' ></input>
            <span>Sorted</span>
            </div>
            <button type='submit'>Push</button>
          </>
        </form>
        {error ?? <span>{error}</span>}
        {messageError ?? <span>{messageError}</span>}
        {loading ? <p>Esta cargando</p> : <></>}
      </header>
      <main>
        <section className='listFilms'>
          {
            films ? films.map(film => {
              return (
                <Film key={film.id} film={film}></Film>
              )
            }) :
              <p>Buscame una partida</p>
          }
        </section>
      </main>
    </>
  )
}

export default App
