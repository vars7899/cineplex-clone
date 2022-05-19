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
        padding="20px 20px"
        alignItems="flex-end"
        justifyContent="space-between"
        bg="#fff"
        borderRadius="20px"
      >
        <Box className="theatre">
          <Text fontWeight="bold">{theatre.name}</Text>
          <Text color="blackAlpha.500">{theatre.address}</Text>
          <Text color="blackAlpha.500">{theatre.postalCode}</Text>
          <Text color="blackAlpha.500">
            {theatre.city} {theatre.country}
          </Text>
          <Text color="red.800">
            Timing {theatre?.timing[0]} - {theatre?.timing[1]}
          </Text>
        </Box>
        <Button
          onClick={() => {
            handleClick(theatre._id, theatre.name);
          }}
          bg="#00171F"
          color="#fff"
          colorScheme="red"
        >
          Select
        </Button>
      </Flex>
    </Box>
  );
};

export default TheatreListDetails;
