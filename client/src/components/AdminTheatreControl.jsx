import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Stack,
  Skeleton,
  useToast,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import EmptyList from "./EmptyList";
import { HiDotsVertical } from "react-icons/hi";
import TheatreDetails from "./TheatreDetails";
import CreateTheatre from "../pages/CreateTheatre";

const TheatreCard = ({ theatre, theatreList, setTheatreList }) => {
  return (
    <VStack
      width="100%"
      bg="gray.100"
      padding="20px 20px 20px 30px"
      borderRadius="10px"
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Text fontSize="xl">{theatre.name}</Text>
        <TheatreDetails
          theatre={theatre}
          setTheatreList={setTheatreList}
          theatreList={theatreList}
        >
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<HiDotsVertical color="black" />}
          />
        </TheatreDetails>
      </Flex>
      <Flex flexDir="column" width="100%">
        <Text color="blackAlpha.500">{theatre.address}</Text>
        <Text color="blackAlpha.500">{theatre.postalCode}</Text>
        <Text color="blackAlpha.500">
          {theatre.city} {theatre.country}
        </Text>
        {/* <Text color="red.800">
          Timing {theatre?.timing[0]} - {theatre?.timing[1]}
        </Text> */}
      </Flex>
    </VStack>
  );
};

const AdminTheatreControl = () => {
  const [theatreList, setTheatreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const toast = useToast();

  const getTheatreList = async () => {
    try {
      const { data } = await axios.get("/api/theatre");
      setTheatreList(data.theatreList);
      console.log(data.theatreList);
    } catch (err) {
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
    getTheatreList();
  }, []);

  return (
    <Box width="100%" padding="10px 20px">
      <Flex alignItems="center" justifyContent="space-between" mb="20px">
        <Text fontSize="2xl" fontWeight="bold">
          THEATRES
        </Text>
        <CreateTheatre
          theatreList={theatreList}
          setTheatreList={setTheatreList}
        >
          <Button
            leftIcon={<VscAdd />}
            // onClick={() => Navigate("/theatre/create")}
            colorScheme="telegram"
          >
            Add Location
          </Button>
        </CreateTheatre>
      </Flex>
      {loading && (
        <Stack width="100%">
          <Skeleton startColor="gray.100" endColor="white" height="100px" />
          <Skeleton startColor="gray.100" endColor="white" height="100px" />
          <Skeleton startColor="gray.100" endColor="white" height="100px" />
        </Stack>
      )}
      {theatreList.length === 0 ? (
        <EmptyList title="Theatre" to={"/theatre/create"} />
      ) : (
        <Grid
          width="100%"
          gap="10px"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        >
          {theatreList.map((item) => (
            <TheatreCard
              theatre={item}
              setTheatreList={setTheatreList}
              theatreList={theatreList}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminTheatreControl;
