import { useState, useEffect } from "react";
import { Box, Grid, useToast } from "@chakra-ui/react";
import MovieSummary from "./MovieSummary";
import axios from "axios";
import MovieBrowser from "./MovieBrowser";

const MoviePanel = ({ movie }) => {
  return (
    <Box>
      {/* <MovieSummary movie={movie} showSelected={false} /> */}
      <MovieBrowser movie={movie} />
    </Box>
  );
};

const TheatreMovie = () => {
  const toast = useToast();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllMovies() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/movie");
      setMovieList(data);
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAllMovies();
  }, []);
  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", xl: "1fr 1fr 1fr" }}
      gap="20px"
      padding="0px 5vw"
      pb={{ base: "100px" }}
    >
      {movieList.map((movie, index) => {
        return <MoviePanel key={index} movie={movie} />;
      })}
    </Grid>
  );
};

export default TheatreMovie;
