import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BsCameraVideo } from "react-icons/bs";
import { UserState } from "../Context/Store";
import TimeAndDate from "./TimeAndDate";

const MovieBrowser = ({ movie }) => {
  const { setMovieName } = UserState();
  return (
    <Box
      width="100%"
      height="100%"
      bg="rebeccapurple"
      borderRadius="10px"
      overflow="hidden"
      position="relative"
    >
      <Image src={movie?.image} objectFit="cover" width="100%" height="100%" />
      <Box
        position="absolute"
        zIndex="2"
        bottom="0%"
        left="0%"
        padding={{ base: "20px 15px", md: "20px 25px" }}
        width="100%"
        height="100%"
        style={{
          background: "rgb(0,0,0)",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)",
        }}
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          textTransform="uppercase"
          color="white"
          mb={{ base: "-3px", md: "-10px" }}
        >
          {movie?.name}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800">
          {movie?.genre}
        </Text>
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mt="20px"
        >
          <Link href={movie?.trailer} isExternal>
            <Tooltip label="Watch Trailer">
              <IconButton
                size="sm"
                colorScheme="whiteAlpha"
                icon={<BsCameraVideo color="white" />}
              />
            </Tooltip>
          </Link>
          <TimeAndDate>
            <Button
              size="sm"
              bg="#feca04"
              color="black"
              onClick={() => {
                setMovieName(movie?.name);
              }}
            >
              Get Reservation
            </Button>
          </TimeAndDate>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieBrowser;
