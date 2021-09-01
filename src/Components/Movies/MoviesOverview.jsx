import React, { useState, useEffect } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';
import './MoviesOverview.scss'

function MoviesOverview() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?s=superhero&apikey=cf799ee3&page=${page}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result)
                },

                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [page])

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${selected}&type=movie&apikey=cf799ee3`)
            .then(res => res.json())
            .then(
                (result) => {
                    setSelectedItem(result)
                },
                (error) => {
                    setError(error)
                }
            )
    }, [selected])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <React.Fragment>
                <div className='cards'>
                    {items.Search?.length > 0 && items.Search.map(item => (
                        <div key={item.imdbID} className='card' onClick={() => setSelected(item.imdbID)}>
                            <h1>{item.Title}</h1>
                        </div>
                    ))}
                    {selectedItem.Title && <MovieDetails movie={selectedItem}/>}
                </div>
                <div>
                    <button disabled={page===1} onClick={()=>setPage(page > 1 ?  page - 1 : 1)}>
                        Previous 
                    </button>
                    <button disabled={page===19} onClick={()=>setPage(page < 19 ? page + 1 : 19)}>
                        Next
                    </button>
                </div>
            </React.Fragment>

        )
    }
}
export default MoviesOverview