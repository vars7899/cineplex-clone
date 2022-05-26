import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Grid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserState } from "../Context/Store";

const MovieSummary = ({ movie }) => {
  const { date, location, time } = UserState();
  const [readMore, setReadMore] = useState(false);

  return (
    <Flex alignItems="flex-start" justify="center" margin="30px 0px">
      <Box borderRadius="20px" overflow="hidden" mr="40px">
        <Image
          alt={movie.name}
          objectFit="contain"
          src={movie.image}
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
          color="white"
          textTransform="uppercase"
          fontSize={{ base: "2.5rem" }}
        >
          {movie.name}
        </Text>
        <Box>
          <Text color="gray.500">
            {!readMore ? movie?.desc.slice(0, 250) : movie?.desc}
          </Text>
          {movie?.desc.length > 250 && (
            <Text
              color="white"
              style={{ fontWeight: "bolder", cursor: "pointer" }}
              onClick={() => setReadMore((readMore) => !readMore)}
            >
              {!readMore ? " Read More..." : " Read Less..."}
            </Text>
          )}
        </Box>
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
      </Flex>
    </Flex>
  );
};

export default MovieSummary;
