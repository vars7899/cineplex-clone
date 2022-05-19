import React from "react";
import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { BsPlayCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import { fitText } from "../Utils/fitText";

const MovieCard = ({ movie }) => {
  return (
    <Flex
      as={motion.div}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      margin="5px 4px"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        alt={movie.movie_name}
        objectFit="contain"
        src={movie.movie_image}
      />
      <div className="text_overflow">
        <Text
          fontSize={{ base: "md", md: "xl" }}
          padding="5px 10px"
          overflowX="hidden"
        >
          {fitText(movie?.movie_name)}
        </Text>
      </div>

      <Link href={movie.movie_trailer} isExternal className="link">
        <Button
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          w="100%"
          variant="ghost"
          leftIcon={<BsPlayCircle />}
          fontSize="lg"
          fontWeight="light"
          colorScheme="whiteAlpha"
        >
          Watch Trailer
        </Button>
      </Link>
    </Flex>
  );
};

export default MovieCard;
