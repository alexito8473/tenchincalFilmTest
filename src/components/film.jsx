import "../components/film.css"
export function Film({ film }) {
    return (
        <>
            <div className="film">
                <h2>
                    {film.title}
                </h2>
                <h3>{film.year}</h3>
                <div className="poster">
                    <img src={film.poster} />
                </div>
            </div>
        </>
    )
}