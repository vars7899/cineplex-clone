import { useRef, useState } from "react";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Box,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  DrawerFooter,
  Button,
  Img,
  FormControl,
  Flex,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Wrap,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { UserState } from "../Context/Store";
import { MdClear } from "react-icons/md";
import axios from "axios";

const MovieDetails = ({ children, movie, setMovies, movies }) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  // Data fields of new Movie
  const [pageLoading, setPageLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState(movie?.image);
  const [movieName, setMovieName] = useState(movie?.name);
  const [description, setDescription] = useState(movie?.desc);
  const [directorName, setDirectorName] = useState(movie?.director);
  const [castMember, setCastMember] = useState("");
  const [runtime, setRuntime] = useState(movie?.runtime);
  const [cast, setCast] = useState(movie?.cast);
  const [movieGenre, setMovieGenre] = useState(movie?.genre);
  const [trailer, setTrailer] = useState(movie?.trailer);
  const [eraseName, setEraseName] = useState("");

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

  // handle Delete Movie
  const handleDelete = async () => {
    if (eraseName !== movie?.name) return;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `/api/movie/deletemovie/${movie?._id}`,
        config
      );
      setEraseName("");
      setMovies(movies.filter((item) => item?._id !== movie?._id));
      onClose();
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  };

  // handle update Request
  const handleUpdate = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      setUpdating(true);
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
      const { data } = await axios.put(
        `/api/movie/editmovie/${movie?._id}`,
        movieObject,
        config
      );
      const restOfMovies = movies.filter((item) => item._id !== movie?._id);
      console.log(restOfMovies);
      setMovies([...restOfMovies, data]);
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setUpdating(false);
      toast({
        title: `Movie details were successfully updated`,
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      onClose();
    }
  };

  return (
    <div>
      <Box onClick={onOpen}>{children}</Box>
      <Drawer
        size="lg"
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Movie Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Img
                maxH="sm"
                objectFit="cover"
                objectPosition="0% 0%"
                borderRadius="10px"
                src={imageUrl}
              />
              <Box>
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
                    value={trailer}
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
              </Box>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Update Movie Poster
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
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
                      isLoading={uploading}
                    >
                      Upload
                    </Button>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Danger Zone
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack spacing="5">
                      <Text fontSize="xl" color="red">
                        Remove Movie Permanently from the DataBase
                      </Text>
                      <Text>
                        You are about to erase all the data related to the
                        selected Movie. Files cannot be recovered after erasing.
                        Please make sure the selected movie is the movie you
                        wish to destroy.
                      </Text>
                      <Text>
                        If you wish to continue? Please write movie name (
                        {movie?.name}) and click remove
                      </Text>
                      <Input
                        value={eraseName}
                        onChange={(e) => setEraseName(e.target.value)}
                      />
                      <Button
                        mt="20px"
                        colorScheme="red"
                        isFullWidth
                        onClick={handleDelete}
                        isDisabled={eraseName !== movie?.name}
                      >
                        Remove
                      </Button>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="telegram"
              isLoading={updating}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MovieDetails;
