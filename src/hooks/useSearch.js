import { useEffect, useRef, useState } from 'react'

export function useSearch() {
    const [search, setSearch] = useState('');
    const [error, setError] = useState("");
    const [canSearchFilm, setCanSearchFilm]=useState(false)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if(isFirstInput.current){
            if(search.length != 0){
                isFirstInput.current=false
            }else{
                return
            }
        }
        checkSearch()
    }, [search])

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    function checkSearch(){
        if (search.length == 0) {
            setError("No me lo dejes vacio")
            return false;
        }
        if (search.length < 3) {
            setError("Introduce al menos 3 caracteres")
            return false;
        }
        setError(null)
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
       setSearch (new window.FormData(event.target).get("title"))
        setCanSearchFilm(checkSearch());
    }

    return { search, error, canSearchFilm, handleChange, handleSubmit }
}