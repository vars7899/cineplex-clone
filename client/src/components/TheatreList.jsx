import React, { useEffect, useState } from "react";
import {
  Grid,
  VStack,
  Text,
  useToast,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import TheatreListDetails from "./TheatreListDetails";
import axios from "axios";
import FetchingLoader from "./FetchingLoader";

const TheatreList = () => {
  const toast = useToast();
  const [loadingTheatreData, setLoadingTheatreData] = useState(false);
  const [allTheatre, setAllTheatre] = useState([]);
  const [position, setPosition] = useState(null);

  // ! Logic to get details of theatres from the server
  async function fetchAllTheatre() {
    setLoadingTheatreData(true);
    try {
      const { data } = await axios.get("/api/theatre");
      setAllTheatre(data.theatreList);
      setLoadingTheatreData(false);
    } catch (err) {
      setLoadingTheatreData(false);
      return toast({
        title: `OOOPS!!! Request to GET Theatre Data failed\n ${err}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    fetchAllTheatre();
  }, []);

  // ? Grab location of the user
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <Box mr="-5vw" ml="-5vw" borderTop="1px solid gray" maxW="100vw">
      {loadingTheatreData && <FetchingLoader />}
      <Grid
        templateColumns={{ base: "1fr auto", lg: "minmax(400px,500px) 3fr" }}
        width="100vw"
      >
        <VStack
          minWidth="350px"
          height="80vh"
          overflowY="scroll"
          divider={<StackDivider borderColor="gray.200" />}
        >
          {allTheatre.map((theatre) => (
            <TheatreListDetails key={theatre._id} theatre={theatre} />
          ))}
        </VStack>
        <MapContainer
          center={[49.23038, -123.00036]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allTheatre.map((theatre) => (
            <Marker
              key={theatre._id}
              position={[theatre.lat, theatre.long]}
              onClick={() => setPosition([theatre.lat, theatre.long])}
            >
              <Popup>
                <Text fontSize="lg">{theatre.name}</Text>
                <Text fontSize="sm">{theatre.address}</Text>
                <Text fontSize="sm">{theatre.postalCode}</Text>
              </Popup>
            </Marker>
          ))}
          <LocationMarker />
        </MapContainer>
      </Grid>
    </Box>
  );
};

export default TheatreList;
