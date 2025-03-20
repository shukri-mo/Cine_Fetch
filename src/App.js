import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { UseMovies } from "./UseMovies";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const query='interstellar'

export default function App() {

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){
    const storedValue=localStorage.getItem('watched');
    return JSON.parse(storedValue)
  });
 //error message
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const{movies,isLoading,error}=UseMovies(query)
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function closeMovieList() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
// localStorage.setItem('watched', JSON.stringify([...watched,movie]))



  }
  function handledeleteWatched(id) {
    setWatched(watched.filter((m) => m.imdbID !== id));
  }
/////////////////////////////Listening to key press///////////////////////////////////



//////////////////////////LOCAL STORAGE //////////////////////////////////////

useEffect(function(){
localStorage.setItem('watched', JSON.stringify(watched))
},[watched])








//////////////////////////Clean up function and Abort controller //////////////////////////////////////

  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <Error message={error} />}
          {/* {isLoading?<Loader/>: <MovieList movies={movies} />} */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClose={closeMovieList}
              movie={movies}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handledeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading</p>;
}
function Error({ message }) {
  return (
    <p className="error">
      <span>❌{message}</span>
    </p>
  );
}
// const respond = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=intersellar'`);
// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`).then((res)=>res.json()).then((data)=>console.log(data))

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function SearchBox({ query, setQuery }) {


  //REF

  const element=useRef(null );
useEffect(()=>{
  function callBck(e){
    if(document.activeElement===element.current)return
    if(e.key==='Enter'){
      // element.current.blur() // when user presses enter, blur the input field
      element.current.focus() 
      setQuery("")// when component mounts, focus the input field

    }
  }
  document.addEventListener('keydown',callBck)
},[setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={element}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🎥</span>
      <h1>CineFetch</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
// function ListBox({children}){//movie list box

//   const [isOpen1, setIsOpen1] = useState(true);
//   return(
//     <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen1((open) => !open)}
//     >
//       {isOpen1 ? "–" : "+"}
//     </button>
//     {isOpen1 && (
//      children
//     )}
//   </div>
//   )
// }
function Box({ children }) {
  //watched movie list box
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && children}
    </div>
  );
}
function MovieList({ movies, handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, handleSelectMovie }) {
  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieDetails({ selectedId, onClose, movie, onAddWatched, watched,closeMovieList }) {
  const [movieDescription, setMovieDescription] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID.includes === selectedId
  )?.userRating;
  //Changing the page title using current movie title
//using ref to track behid the scene 
const countRef=useRef(0)
useEffect(()=>{
if(userRating) countRef.current=countRef.current+1

},[userRating])
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDescription;

  useEffect(()=>{
    function handleKeyDown(e){
      if(e.code==='Escape'){
        onClose();
  
      }}
      document.addEventListener('keydown', handleKeyDown);
      return()=>document.removeEventListener('keydown', handleKeyDown);
    
  },[onClose])
  const isTop=imdbRating>8
  console.log(isTop)
  function handleAdd() {
    const newMovie = {
      title,
      poster,
      year,
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
      countRating:countRef.current,
    };
    console.log(newMovie);
    onAddWatched(newMovie);
    onClose();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        const KEY = "77cd1510";
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        console.log(data);
        setMovieDescription(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "React App";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onClose(movie.imdbID)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating{" "}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {" "}
              {!isWatched ? (
                <>
                  {" "}
                  <StarRating
                    StarRating={10}
                    size="24px"
                    onSetRating={setUserRating}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>{" "}
                </>
              ) : (
                <p>You rated with movie {watchedUserRating} </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring{actors}</p>
            <p>Directed by {director}</p>
          </section>
          {selectedId}
        </>
      )}
    </div>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
