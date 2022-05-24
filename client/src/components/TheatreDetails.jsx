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
  Popover,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Store";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";

const TheatreDetails = ({ children, theatre, setTheatreList, theatreList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();
  const toast = useToast();
  const { user } = UserState();
  const firstField = useRef();

  // Data fields of Theatre
  const [pageLoading, setPageLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [theatreName, setTheatreName] = useState(theatre?.name);
  const [address, setAddress] = useState(theatre?.address);
  const [city, setCity] = useState(theatre?.city);
  const [postalCode, setPostal] = useState(theatre?.postalCode);
  const [country, setCountry] = useState(theatre?.country);
  const [timing, setTiming] = useState(theatre?.timing);
  const [lat, setLat] = useState(theatre?.lat);
  const [long, setLong] = useState(theatre?.long);
  const [eraseName, setEraseName] = useState("");

  function NewCoordinates() {
    const map = useMapEvents({
      dblclick(e) {
        console.log(e.latlng);
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
      },
    });
    return (
      <Marker position={[lat, long]}>
        <Popup keepInView>
          <Text fontSize="lg">New Coordinates</Text>
        </Popup>
      </Marker>
    );
  }

  // handle Delete Theatre
  const handleDelete = async () => {
    if (eraseName !== theatre?.name) return;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `/api/theatre/delete/${theatre?._id}`,
        config
      );
      onClose();
      setTheatreList(theatreList.filter((item) => item?._id !== theatre?._id));
      setEraseName("");
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
      const theatreObject = {
        name: theatreName,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
        timing: timing,
        lat: lat,
        long: long,
      };
      const { data } = await axios.put(
        `/api/theatre//${theatre?._id}`,
        theatreObject,
        config
      );

      const restOfTheatre = theatreList.filter(
        (item) => item._id !== theatre?._id
      );
      console.log(restOfTheatre);
      setTheatreList([...restOfTheatre, data]);
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
        title: `Theatre details were successfully updated`,
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
          <DrawerHeader borderBottomWidth="1px">Theatre Details</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <MapContainer center={[theatre?.lat, theatre?.long]} zoom={16}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[theatre?.lat, theatre?.long]}>
                  <Popup>
                    <Text fontSize="lg">{theatre?.name}</Text>
                    <Text fontSize="sm">{theatre?.address}</Text>
                    <Text fontSize="sm">{theatre?.postalCode}</Text>
                  </Popup>
                </Marker>
                <NewCoordinates />
              </MapContainer>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Theatre Name</FormLabel>
                  <Input
                    type="text"
                    name="theatreName"
                    value={theatreName}
                    onChange={(e) => setTheatreName(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="20px" isRequired>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    type="text"
                    name="address"
                    value={address}
                    placeholder="please provide a short summary of the movie"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="20px" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="20px" isRequired>
                  <FormLabel>Postal Code</FormLabel>
                  <Input
                    type="text"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="20px" isRequired>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormControl>
                {/* <FormControl mt="20px" isRequired>
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
                </FormControl> */}
              </Box>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Update Coordinates
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} width="100%">
                    <Text>
                      Double click on Map on the new location Coordinates
                    </Text>
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
                        Remove Theatre Permanently from the DataBase
                      </Text>
                      <Text>
                        You are about to erase all the data related to the
                        selected Theatre. Files cannot be recovered after
                        erasing. Please make sure the selected Theatre is the
                        Theatre you wish to destroy.
                      </Text>
                      <Text>
                        If you wish to continue? Please write Theatre name (
                        {theatre?.name}) and click remove
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
                        isDisabled={eraseName !== theatre?.name}
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

export default TheatreDetails;
