import { Box } from "@chakra-ui/react";
import MovieList from "../components/MovieList";
import SlideShow from "../components/SlideShow";
import { sliderData } from "../dummy data/SliderData";

const HomePage = () => {
  return (
    <Box bg="#121420" color="#fff" w="100%">
      {/* <SlideShow slides={sliderData} /> */}
      {/* <MovieList /> */}
    </Box>
  );
};
export default HomePage;
