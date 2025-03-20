import{useState,useEffect} from "react"
export function UseMovies(query){
    const KEY = "77cd1510";
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");
      const [movies, setMovies] = useState([]);
      
    useEffect(() => {
    
        const controller = new AbortController();
    
        async function fetchMovie() {
          // Prevent empty search
          setIsLoading(true);
          setError("");
    
          try {
            const response = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
    
            if (!response.ok) {
              throw new Error("Error fetching data");
            }
    
            const data = await response.json();
    
            if (data.Response === "False") {
              throw new Error("Movie not found");
            }
    
            setMovies(data.Search);
            setError("");
          } catch (err) {
            console.error("Fetch error:", err.message);
            if (error.name !== "AbortedError") {
              setError(err.message || "Movie not found");
            }
          } finally {
            setIsLoading(false);
          }
        }
        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
        // closeMovieList()
        fetchMovie();
        return function () {
          controller.abort();
        };
      }, [query]);
      return{movies,isLoading,error}
    
}