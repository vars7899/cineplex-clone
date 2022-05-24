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
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  DrawerFooter,
  Button,
  FormControl,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";

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
  //   const [openTime, setOpenTime] = useState(theatre?.timing[0]);
  //   const [closeTime, setCloseTime] = useState(theatre?.timing[1]);
  const [lat, setLat] = useState(theatre?.lat);
  const [long, setLong] = useState(theatre?.long);
  const [eraseName, setEraseName] = useState("");

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
        // timing: [openTime, closeTime],
        lat: lat,
        long: long,
      };
      console.log(theatreObject);
      const { data } = await axios.put(
        `/api/theatre//${theatre?._id}`,
        theatreObject,
        config
      );

      const restOfTheatre = theatreList.filter(
        (item) => item._id !== theatre?._id
      );
      setTheatreList([...restOfTheatre, data]);
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
      setUpdating(false);
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
                    <Text fontSize="xl" color="red">
                      Update Map Coordinates
                    </Text>
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
