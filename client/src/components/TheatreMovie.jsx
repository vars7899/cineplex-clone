import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import { data } from "../dummy data/Data";
import MovieSummary from "./MovieSummary";

const MoviePanel = ({ movie }) => {
  return (
    <Box mb="80px">
      <MovieSummary movie={movie} showSelected={false} />
    </Box>
  );
};

const TheatreMovie = () => {
  return (
    <Box>
      {data.map((movie, index) => {
        return <MoviePanel key={index} movie={movie} />;
      })}
    </Box>
  );
};

export default TheatreMovie;
