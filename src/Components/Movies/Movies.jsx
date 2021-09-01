import React, {useState, useEffect} from 'react';
import './Movies.scss'

function Movies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        fetch("http://www.omdbapi.com/?s=superhero&apikey=cf799ee3")
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
    }, [])

    useEffect(() => {
            fetch(`http://www.omdbapi.com/?i=${selected}&apikey=cf799ee3`)
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
            <div className='cards'>
                {items.Search?.length > 0 && items.Search.map(item => (
                    <div key={item.Title} className='card' onClick={()=>setSelected(item.imdbID)}>
                        <h1>{item.Title}</h1>
                    </div>
                ))}
                {selectedItem.Title && <div className='MovieDetails'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h1 className='MovieDetailsTitle'>{selectedItem.Title}</h1> 
                        <div className='MovieDetailsCross' onClick={()=>setSelected(null)}>X</div>
                    </div>
                    <h5>{selectedItem.Plot}</h5>
                    <img src={selectedItem.Poster}/>
                </div>}
            </div>
        )
    }
}
export default Movies