import './MovieDetails.scss';

function MovieDetails({movie}) {
    return (
        <div className='MovieDetails'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h1 className='MovieDetailsTitle'>{movie.Title}</h1>
            </div>
            <h5>{movie.Plot}</h5>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`}>Link</a>
            <img src={console.log(movie), movie.Poster} />
        </div>
    );
}

export default MovieDetails;