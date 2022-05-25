import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const TheatreListDetails = ({ theatre }) => {
  const toast = useToast();
  const Navigate = useNavigate();
  const { setLocation, setTheatreName } = UserState();
  function handleClick(_id, name) {
    setLocation(_id);
    console.log(name);
    setTheatreName(name);
    toast({
      title: `${theatre.name} Selected`,
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top-right",
    });
    Navigate("/movies");
  }
  return (
    <Box width="100%">
      <Flex
        width="100%"
        padding="20px 30px"
        alignItems={{ base: "flex-start", md: "flex-end" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box className="theatre">
          <Text fontSize="xl" color="#fff">
            {theatre.name}
          </Text>
          <Text color="gray.100">
            {theatre.city} {theatre.country}
          </Text>
          <Text color="gray.500">{theatre.address}</Text>
          <Text color="gray.500">{theatre.postalCode}</Text>
          <Text color="#feca04">
            Timing {theatre?.timing[0]} - {theatre?.timing[1]}
          </Text>
        </Box>
        <Button
          mt="20px"
          onClick={() => {
            handleClick(theatre._id, theatre.name);
          }}
          bg="#feca04"
          color="#0a0b0d"
          colorScheme="yellow"
          alignSelf="center"
          width={{ base: "100%", md: "auto" }}
        >
          Select
        </Button>
      </Flex>
    </Box>
  );
};

export default TheatreListDetails;
