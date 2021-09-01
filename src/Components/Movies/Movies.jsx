import React, { useState, useEffect } from 'react';
import './Movies.scss'

function Movies() {
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
                    {selectedItem.Title && <div className='MovieDetails'>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h1 className='MovieDetailsTitle'>{selectedItem.Title}</h1>
                            <div className='MovieDetailsCross' onClick={() => setSelected(null)}>X</div>
                        </div>
                        <h5>{selectedItem.Plot}</h5>
                        <a href={`https://www.imdb.com/title/${selectedItem.imdbID}`}>Link</a>
                        <img src={console.log(selectedItem), selectedItem.Poster} />
                    </div>}
                </div>
                <div>
                    <button onClick={()=>setPage(page > 1 ?  page - 1 : 1)}>
                        Previues 
                    </button>
                    <button onClick={()=>setPage(page < 19 ? page + 1 : 19)}>
                        Next
                    </button>
                </div>
            </React.Fragment>

        )
    }
}
export default Movies