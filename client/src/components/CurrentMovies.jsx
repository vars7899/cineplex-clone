import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "../dummy data/Data";
import MovieList from "./MovieList";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const CurrentMovies = () => {
  const Navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  // Function to get all the movies from the server
  const fetchMovieList = async () => {
    const { data } = await axios.get("/api/movie");
    setMovieList(data);
  };

  useEffect(() => {
    fetchMovieList();
  }, []);
  return (
    <Box w="100vw" padding="0 5vw" margin="30px 0">
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="white" fontSize="xl">
          Now Showing
        </Text>
        <Button leftIcon={<VscAdd />} onClick={() => Navigate("/create")}>
          Add Movie
        </Button>
      </Flex>
      <Box h="450px" d="flex" overflowX="scroll" padding="10px 0">
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
        <Box minW="300px" maxW="300px" pr="10px">
          <Image src={data[0].movie_image} objectFit="contain" />
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentMovies;
