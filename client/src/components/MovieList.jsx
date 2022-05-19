import React from "react";
import { Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { data } from "../dummy data/Data.js";
import MovieCard from "./MovieCard.jsx";
import { motion } from "framer-motion";

const MovieList = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      mt="40px"
      padding={{ sm: "0px", md: "0px 50px" }}
    >
      <Text fontSize="3rem" mb="20px">
        Movies
      </Text>
      <SimpleGrid
        w="100%"
        minChildWidth="200px"
        spacing="10px"
        column={{ sm: "2", md: "3", base: "5" }}
      >
        {data.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default MovieList;
