import { useEffect, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { UserState } from "../../Context/Store";
import MovieSummary from "../MovieSummary";
import axios from "axios";

const OrderDetails = () => {
  const { movieId, date, location, time } = UserState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  async function getMovieById() {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/movie/${movieId}`);
      setMovie(data);
      console.log(data);
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
    getMovieById();
  }, []);

  return (
    <Box width="100%">
      <MovieSummary
        movie={movie[0]}
        date={date}
        location={location}
        time={time}
      />
    </Box>
  );
};

export default OrderDetails;
