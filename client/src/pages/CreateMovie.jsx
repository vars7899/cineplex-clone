import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tag,
  TagLabel,
  Text,
  Textarea,
  Grid,
  GridItem,
  Image,
  Divider,
  Flex,
  Wrap,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Frequently from "../components/Frequently";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const Navigate = useNavigate();
  const toast = useToast();
  const { user } = UserState();
  // Movie type enum
  const genreEnum = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
  ];

  // Data fields of new Movie
  const [pageLoading, setPageLoading] = useState(true);
  const [postingData, setPostingData] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [castMember, setCastMember] = useState("");
  const [runtime, setRuntime] = useState(90);
  const [cast, setCast] = useState([]);
  const [movieGenre, setMovieGenre] = useState(genreEnum[0]);
  const [trailer, setTrailer] = useState("");

  // Enable Image Drop feature
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedImage(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  // POST image to cloudinary to get image url
  const uploadImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "cineplexcloneuploader");
    const { data } = await axios
      .post("https://api.cloudinary.com/v1_1/dfcaehp0b/image/upload", formData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUploading(false);
        return toast({
          title: `Poster was successfully Uploaded`,
          status: "success",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      });
    setImageUrl(data?.secure_url);
  };

  // Add cast member to the list
  const handleAddCast = () => {
    setCast([...cast, castMember]);
    setCastMember("");
  };

  // remove cast member from the list
  const handleRemove = (castToRemove) => {
    setCast(cast.filter((person) => person !== castToRemove));
  };

  // POST new Movie Data to server
  const createNewMovie = async () => {
    // Validate Inputs
    if (
      !imageUrl ||
      !movieName ||
      !description ||
      !directorName ||
      !runtime ||
      !cast ||
      !movieGenre ||
      !trailer
    ) {
      return toast({
        title: `Please fill in all the required fields`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
    setPostingData(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const movieObject = {
      name: movieName,
      image: imageUrl,
      desc: description,
      director: directorName,
      runtime: runtime,
      cast: cast,
      genre: movieGenre,
      trailer: trailer,
    };
    try {
      const { data } = await axios.post(
        "/api/movie/addmovie",
        movieObject,
        config
      );
      toast({
        title: `${movieName} was create successfully`,
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      Navigate("/dashboard");
    } catch (error) {
      return toast({
        title: `${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setPageLoading(false);
  }, [user, Navigate]);
  if (pageLoading) return null;

  return (
    <Box bg="#fff" padding="50px 0" h="100%">
      <Divider m="20px 0" />
      <Grid
        mt="100px"
        gap="10"
        padding="0 5vw"
        h="100%"
        templateColumns={{ base: "1fr", lg: "400px 1.5fr 1fr" }}
      >
        <GridItem maxH={{ base: "100%", lg: "70%" }} position="relative">
          {selectedImage ? (
            <Image
              borderRadius="10px"
              src={selectedImage.preview}
              alt={selectedImage.name}
              fallbackSrc="https://via.placeholder.com/150"
              objectFit="cover"
              boxSize="100%"
              zIndex="1"
            />
          ) : (
            <Center
              borderRadius="10px"
              height={{ base: "200px", md: "100%" }}
              border="2px solid #edf2f7"
            >
              <Text>Please Upload Movie Poster</Text>
            </Center>
          )}
          {uploading && (
            <Center
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              h="100%"
              w="100%"
              z-index="5"
              backdropFilter="blur(10px)"
            >
              <Text fontSize="xl" color="white">
                Uploading...
              </Text>
            </Center>
          )}
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Movie Name</FormLabel>
            <Input
              type="email"
              name="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </FormControl>
          <FormControl mt="20px" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              name="description"
              value={description}
              placeholder="please provide a short summary of the movie"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <InputGroup size="md" mt="20px">
            <InputLeftAddon children="Trailer Link" />
            <Input
              placeholder="https://youtube-link.com"
              onChange={(e) => setTrailer(e.target.value)}
            />
          </InputGroup>
          <FormControl mt="20px" isRequired>
            <FormLabel>Genre</FormLabel>
            <Select
              variant="outline"
              onChange={(e) => {
                setMovieGenre(e.target.value);
              }}
              value={movieGenre}
            >
              {genreEnum.map((genre) => (
                <option value={genre}>{genre}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt="20px" isRequired>
            <FormLabel>Run time (Minutes)</FormLabel>
            <Flex>
              <Input
                width="75px"
                padding="0 20px"
                type="number"
                name="runtime"
                value={runtime}
                onChange={(e) => {
                  setRuntime(e.target.value);
                }}
                disabled
              />
              <Slider
                ml="20px"
                defaultValue={runtime}
                min={0}
                max={180}
                step={1}
                onChange={(event) => setRuntime(event)}
              >
                <SliderTrack bg="red.100">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Flex>
          </FormControl>

          <FormControl mt="20px" isRequired>
            <FormLabel>Director Name</FormLabel>
            <Input
              type="text"
              name="director"
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
            />
          </FormControl>
          <FormControl mt="20px" isRequired>
            <FormLabel>Cast Member</FormLabel>
            <Flex>
              <Input
                type="text"
                name="cast"
                value={castMember}
                onChange={(e) => {
                  setCastMember(e.target.value);
                }}
              />
              <Button onClick={handleAddCast} p="0px 30px" ml="10px">
                Add
              </Button>
            </Flex>

            <Wrap mt="10px">
              {cast.length > 0 &&
                cast.map((item, index) => {
                  return (
                    <Tag
                      size="lg"
                      key={index}
                      variant="subtle"
                      colorScheme="green"
                    >
                      <TagLabel>{item}</TagLabel>
                      <MdClear
                        cursor="pointer"
                        onClick={() => handleRemove(item)}
                      />
                    </Tag>
                  );
                })}
            </Wrap>
          </FormControl>
          <Box mt="20px" w="100%" d="flex" justifyContent="flex-end">
            <Button p="0 40px" colorScheme="telegram" onClick={createNewMovie}>
              Create Movie
            </Button>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            {...getRootProps()}
            h="300px"
            d="flex"
            mt="30px"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
            border="5px dashed #edf2f7"
          >
            <Input {...getInputProps()} />
            {selectedImage ? (
              <p>Drop Image to replace</p>
            ) : (
              <p>Drop Image here</p>
            )}
          </Box>
          <Button
            onClick={uploadImage}
            isFullWidth
            m="20px 0px"
            colorScheme="telegram"
          >
            Upload
          </Button>
          <Divider mb="20px" />
          <Frequently />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CreateMovie;
