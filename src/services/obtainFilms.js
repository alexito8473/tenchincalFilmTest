export const getFilmsByTitle = async (title) =>{
    const result = await fetch(`http://www.omdbapi.com/?apikey=4287ad07&s=${title}`);
    return await result.json();
}