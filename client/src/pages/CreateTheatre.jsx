import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Store";
import TimePicker from "react-time-picker";
import axios from "axios";
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
  Textarea,
  DrawerFooter,
  Button,
  FormControl,
  Flex,
  useToast,
  Text,
  Divider,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";

const CreateTheatre = ({ children, theatreList, setTheatreList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();
  const toast = useToast();
  const { user } = UserState();
  const firstField = useRef();

  // Data fields of Theatre
  const [pageLoading, setPageLoading] = useState(true);
  const [postingData, setPostingData] = useState(false);
  const [theatreName, setTheatreName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  function NewCoordinates() {
    const map = useMapEvents({
      dblclick(e) {
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

  // handle post Request
  const handlePost = async () => {
    // Validate Inputs
    if (
      !theatreName ||
      !address ||
      !city ||
      !postalCode ||
      !country ||
      !openTime ||
      !closeTime ||
      !lat ||
      !long
    ) {
      return toast({
        title: `Please fill in all the required fields`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      setPostingData(true);
      const theatreObject = {
        name: theatreName,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
        timing: [openTime, closeTime],
        lat: lat,
        long: long,
      };
      const { data } = await axios.post(
        `/api/theatre/create`,
        theatreObject,
        config
      );

      setTheatreList([...theatreList, data]);
      setLat("");
      setLong("");
      toast({
        title: `Theatre details were successfully updated`,
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setPostingData(false);
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
              <MapContainer
                center={["49.26038", "-123.11336"]}
                zoom={16}
                style={{ width: "100vh !important" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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
                <FormControl mt="20px" isRequired>
                  <FormLabel>Timing</FormLabel>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb="10px"
                  >
                    <Text>Open</Text>
                    {}
                    <TimePicker
                      style={{ border: "none" }}
                      onChange={setOpenTime}
                      value={openTime}
                    />
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt="10px"
                  >
                    <Text>Close</Text>
                    <TimePicker onChange={setCloseTime} value={closeTime} />
                  </Flex>
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="telegram"
              isLoading={postingData}
              onClick={handlePost}
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CreateTheatre;
