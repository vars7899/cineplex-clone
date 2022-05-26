import { Flex, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MovieSummary from "../components/MovieSummary";
import ProcessBread from "../components/ProcessBread";
import SeatPreview from "../components/SeatPreview";
import axios from "axios";
import PriceFooter from "../components/PriceFooter";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const toast = useToast();
  const Navigate = useNavigate();
  const { date, time, theatreName, movieId } = UserState();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  async function getMovieById() {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/movie/${movieId}`);
      setMovie(data);
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
    // ! Check if the flow of data is right
    if (!date || !time) {
      Navigate("/movies");
    }
    getMovieById();
  }, []);

  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt={{ base: "160px", xl: "90px" }}
    >
      <Box display={{ base: "none", sm: "block" }}>
        <ProcessBread isActive={3} />
      </Box>
      <MovieSummary
        movie={movie[0]}
        date={date}
        time={time}
        location={theatreName}
      />
      <SeatPreview />
      <PriceFooter total={22.99} to="/payment" />
    </Flex>
  );
};

export default TicketPage;
