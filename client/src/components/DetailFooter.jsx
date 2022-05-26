import {
  Box,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatHelpText,
  Grid,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DetailFooter = ({ movie, date, time, theatre }) => {
  const Navigate = useNavigate();
  const toast = useToast();

  function handleClick() {
    if (!movie || !date || !time) {
      toast({
        title: `Please select Date and Time to proceed`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    Navigate("/tickets");
  }
  return (
    <>
      <Box
        w="100%"
        position="fixed"
        bottom="0"
        p={{ base: "10px", md: "10px 5vw" }}
        backdropFilter="blur(80px)"
        shadow="lg"
        zIndex="50"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Grid
            gridTemplateColumns="repeat(4,1fr)"
            gap={6}
            display={{ base: "none", lg: "grid" }}
          >
            <Stat bg="blackAlpha.50" p="5px 10px" borderRadius="5">
              <StatLabel color="gray.400">Location</StatLabel>
              {theatre ? (
                <StatHelpText color="white" margin="0">
                  {theatre?.slice(0, 16)}...
                </StatHelpText>
              ) : (
                <StatHelpText color="white" margin="0">
                  Please select location
                </StatHelpText>
              )}
            </Stat>
            <Stat bg="blackAlpha.50" p="5px 10px" borderRadius="5">
              <StatLabel color="gray.400">Movie</StatLabel>
              {movie ? (
                <StatHelpText color="white" margin="0">
                  {movie?.slice(0, 18)} {movie.length > 18 && "..."}
                </StatHelpText>
              ) : (
                <StatHelpText color="white" margin="0">
                  Please select movie
                </StatHelpText>
              )}
            </Stat>
            <Stat bg="blackAlpha.50" p="5px 10px" borderRadius="5">
              <StatLabel color="gray.400">Date</StatLabel>
              {date ? (
                <StatHelpText color="white" margin="0">
                  {date}
                </StatHelpText>
              ) : (
                <StatHelpText color="white" margin="0">
                  YYYY-MM-DD
                </StatHelpText>
              )}
            </Stat>
            <Stat bg="blackAlpha.50" p="5px 10px" borderRadius="5">
              <StatLabel color="gray.400">Time</StatLabel>
              {time ? (
                <StatHelpText color="white" margin="0">
                  {time}
                </StatHelpText>
              ) : (
                <StatHelpText color="white" margin="0">
                  --:-- XX
                </StatHelpText>
              )}
            </Stat>
          </Grid>

          <Button
            bg="#feca04"
            color="black"
            colorScheme="yellow"
            padding="0 100px"
            onClick={handleClick}
            width={{ base: "100%", lg: "auto" }}
          >
            BUY TICKETS
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default DetailFooter;
