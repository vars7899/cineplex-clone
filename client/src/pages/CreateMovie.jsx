import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Textarea,
  Grid,
  GridItem,
  Image,
  Divider,
  Heading,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Frequently from "../components/Frequently";

const CreateMovie = () => {
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
  const movieData = {
    adult: false,
    name: "",
    summary: "",
    tags: [],
    trailer: "",
    releaseDate: Date.now(),
    runtime: "",
    cast: [],
    director: "",
  };
  const [uploading, setUploading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(movieData);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [castMember, setCastMember] = useState("");
  const [runtime, setRuntime] = useState(90);
  const [cast, setCast] = useState([]);
  const [movieGenre, setMovieGenre] = useState(genreEnum[0]);
  const [trailer, setTrailer] = useState("");
  const [tag, setTags] = useState([]);

  const uploadImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "cineplexcloneuploader");
    const Data = await axios
      .post("https://api.cloudinary.com/v1_1/dfcaehp0b/image/upload", formData)
      .then((res) => res.json)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  // update state of movie details
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieDetails({ ...movieDetails, [name]: value });
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

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    <Box bg="#fff" padding="50px 0" h="100%">
      <Divider m="20px 0" />
      <Grid gap="10" padding="0 5vw" h="100%" templateColumns="400px 1.5fr 1fr">
        <GridItem maxH="70%">
          <Image
            borderRadius="10px"
            src={selectedImage.preview}
            alt={selectedImage.name}
            fallbackSrc="https://via.placeholder.com/150"
            objectFit="cover"
            boxSize="100%"
          />
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Movie Name</FormLabel>
            <Input
              type="email"
              name="movieName"
              color="white"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </FormControl>
          <FormControl mt="20px" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              name="description"
              color="white"
              value={description}
              placeholder="please provide a short summary of the movie"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <InputGroup size="md" mt="20px">
            <InputLeftAddon children="Trailer Link" />
            <Input
              color="white"
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
                  console.log(runtime);
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
              color="white"
              value={movieDetails.director}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl mt="20px" isRequired>
            <FormLabel>Cast Member</FormLabel>
            <Flex>
              <Input
                type="text"
                name="cast"
                color="white"
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
            <Button p="0 40px" colorScheme="telegram">
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
            <p>Drop Image here</p>
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

// Legacy
{
  /* <FormControl>
          <FormLabel htmlFor="email">Upload Movie Poster</FormLabel>
          <Input
            id="email"
            type="file"
            onChange={(event) => setSelectedImage(event.target.files[0])}
          />
          <Button onClick={uploadImage}>Upload</Button>
        </FormControl> */
}
