import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

const MovieSummary = ({ movie, date, location, time }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        lg: "470px 470px",
      }}
      gap="20px"
      m="0px 5vw"
      alignItems="start"
    >
      <Box borderRadius="20px" overflow="hidden">
        <Image
          alt={movie?.name}
          objectFit="cover"
          height={{ base: "300px", md: "470px" }}
          src={movie?.image}
          width="100%"
        />
      </Box>
      <Flex alignItems="flex-start" flexDir="column" justifyContent="center">
        <Text
          color="white"
          textTransform="uppercase"
          fontSize={{ base: "2.5rem" }}
        >
          {movie?.name}
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
            {date}
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
    </Grid>
  );
};

export default MovieSummary;
