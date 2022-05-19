import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Image,
  Grid,
  Text,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserState } from "../Context/Store";

const MovieSummary = ({ movie, location, time, showSelected = true }) => {
  const { setDate, setTime, date, setMovieName } = UserState();
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Flex alignItems="flex-start" justify="center" margin="30px 0px">
      <Box borderRadius="20px" overflow="hidden" mr="40px">
        <Image
          alt={movie.movie_name}
          objectFit="contain"
          src={movie.movie_image}
          width="230px"
        />
      </Box>
      <Flex
        alignItems="flex-start"
        flexDir="column"
        justifyContent="center"
        maxW="700px"
      >
        <Text
          color="gray.400"
          textTransform="capitalize"
          fontSize={{ base: "2.5rem" }}
        >
          {movie.movie_name}
        </Text>
        <Text color="gray.500">{movie.desc}</Text>
        {showSelected ? (
          <>
            <Flex flexDir="column" margin="20px 0 5px 0" fontSize="1.1rem">
              <Text fontSize="0.8rem" fontWeight="bold" color="gray.400">
                Date
              </Text>
              <Text fontSize="1rem" fontWeight="bold" color="white">
                {date?.slice(1, 11)}
              </Text>
            </Flex>
            <Flex flexDir="column" margin="5px 0" fontSize="1.1rem">
              <Text fontSize="0.8rem" fontWeight="bold" color="gray.400">
                Location
              </Text>
              <Text fontSize="1rem" fontWeight="bold" color="white">
                {location}
              </Text>
            </Flex>
            <Flex flexDir="column" margin="5px 0" fontSize="1.1rem">
              <Text fontSize="0.8rem" fontWeight="bold" color="gray.400">
                Time
              </Text>
              <Text fontSize="1rem" fontWeight="bold" color="white">
                {time}
              </Text>
            </Flex>
          </>
        ) : (
          <Box mt="30px" width="100%">
            <FormControl d="flex">
              <Button
                variant="solid"
                mr={4}
                maxW="222px"
                d="flex"
                textAlign="center"
              >
                <DatePicker
                  className="date"
                  style={{ background: "none !important" }}
                  selected={startDate}
                  onChange={(selectDate) => {
                    setStartDate(selectDate);
                    setDate(JSON.stringify(selectDate));
                    setMovieName(movie.movie_name);
                  }}
                  withPortal
                />
              </Button>
            </FormControl>
            <Grid
              mt={5}
              templateColumns="repeat(3, 1fr)"
              rowGap={2}
              columnGap={4}
            >
              <Button
                color="gray.400"
                variant="outline"
                onClick={() => {
                  setTime("11:00 AM");
                  setMovieName(movie.movie_name);
                }}
              >
                11:00 AM
              </Button>
              <Button
                color="gray.400"
                variant="outline"
                onClick={() => {
                  setTime("01:00 PM");
                  setMovieName(movie.movie_name);
                }}
              >
                01:00 PM
              </Button>
              <Button
                color="gray.400"
                variant="outline"
                onClick={() => {
                  setTime("04:00 PM");
                  setMovieName(movie.movie_name);
                }}
              >
                04:00 PM
              </Button>
              <Button
                color="gray.400"
                variant="outline"
                onClick={() => {
                  setTime("07:00 PM");
                  setMovieName(movie.movie_name);
                }}
              >
                07:00 PM
              </Button>
              <Button
                color="gray.400"
                variant="outline"
                onClick={() => {
                  setTime("10:00 PM");
                  setMovieName(movie.movie_name);
                }}
              >
                10:00 PM
              </Button>
            </Grid>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default MovieSummary;
