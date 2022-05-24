import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Img,
  useToast,
  VStack,
  Text,
  Flex,
  Link,
  IconButton,
  Grid,
  Button,
  Divider,
  GridItem,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import EmptyList from "./EmptyList";

const MovieCard = ({ item, movies, setMovies }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <Grid
        alignSelf="end"
        mt="30px"
        gap="20px"
        maxW="1000px"
        gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}
      >
        <Img
          borderRadius="10px"
          w={{ base: "100%", md: "300px" }}
          maxH="400px"
          objectFit="cover"
          objectPosition="0% 0%"
          src={item?.image}
        />
        <Flex flexDir="column">
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="xl">{item?.name}</Text>{" "}
            <MovieDetails movie={item} setMovies={setMovies} movies={movies}>
              <IconButton
                variant="ghost"
                aria-label="Search database"
                icon={<HiDotsVertical color="black" />}
              />
            </MovieDetails>
          </Flex>
          <Text fontSize="sm" color="grey">
            {!readMore ? item?.desc.slice(0, 600) : item?.desc}
            {item?.desc.length > 600 && (
              <span
                style={{ fontWeight: "bolder", cursor: "pointer" }}
                onClick={() => setReadMore((readMore) => !readMore)}
              >
                {!readMore ? " Read More..." : " Read Less..."}
              </span>
            )}
          </Text>

          <Divider mt="20px" />
          <Grid gridTemplateColumns={"100px auto"} mt="20px">
            <GridItem>
              <Text fontSize="sm">Director</Text>
              <Text fontSize="sm">Genre</Text>
              <Text fontSize="sm">Runtime</Text>
              <Text fontSize="sm">Trailer</Text>
            </GridItem>
            <GridItem>
              <Text fontSize="sm">{item.director}</Text>
              <Text fontSize="sm">{item?.genre}</Text>
              <Text fontSize="sm">{item?.runtime}</Text>
              <Text fontSize="sm">
                <Link
                  color="telegram"
                  textDecoration="underline"
                  href={item?.trailer}
                  isExternal
                >
                  <MdOutlineVideoLibrary />
                </Link>
              </Text>
            </GridItem>
          </Grid>
        </Flex>
      </Grid>
      <Divider />
    </>
  );
};

const AdminMovieControl = () => {
  const Navigate = useNavigate();
  const toast = useToast();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/movie");
      console.log(data);
      setMovies(data);
    } catch (error) {
      toast({
        title: `Something went wrong`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);
  if (loading)
    return (
      <Stack width="100%">
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
      </Stack>
    );

  return (
    <Box>
      <Box padding="10px 20px" width="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            NOW SHOWING
          </Text>

          <Button
            leftIcon={<VscAdd />}
            onClick={() => Navigate("/movie/create")}
            colorScheme="telegram"
          >
            Add Movie
          </Button>
        </Flex>
        {movies.length === 0 && loading === false ? (
          <EmptyList title="Movie" to={"/movie/create"} />
        ) : (
          <VStack spacing="20px" width="100%">
            {movies.map((item) => (
              <MovieCard item={item} movies={movies} setMovies={setMovies} />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default AdminMovieControl;
