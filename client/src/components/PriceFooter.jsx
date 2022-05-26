import { Box, Button, Grid, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Store";
import { ticketData } from "../dummy data/TicketData";

const PriceFooter = ({ to }) => {
  const toast = useToast();
  const Navigate = useNavigate();
  const { standardTicket, dBoxTicket, balconyTicket, setTotal } = UserState();

  // ! Function to validate and move user to next step
  function handleClick() {
    if (to === "/seats") {
      if (!standardTicket && !dBoxTicket && !balconyTicket) {
        return toast({
          title: `No Ticket Selected`,
          status: "error",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      }
      Navigate(to);
    } else {
      Navigate(to);
    }
  }

  // ! function to handle the total of all the tickets
  function handleTotal() {
    let sum;
    sum = (
      ticketData[0].price * standardTicket +
      ticketData[1].price * dBoxTicket +
      ticketData[2].price * balconyTicket
    ).toFixed(2);
    setTotal(sum);
    return sum;
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
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      >
        <Grid
          alignItems="center"
          gridTemplateColumns={{ base: "1fr", md: "2fr 300px" }}
          justifyContent={{ base: "center", md: "flex-end" }}
          gap="20px"
        >
          <Text color="gray.400" textAlign={{ base: "center", md: "end" }}>
            SubTotal: ${handleTotal()}
          </Text>
          <Button
            bg="#feca04"
            color="black"
            colorScheme="yellow"
            padding="0 100px"
            onClick={handleClick}
            width={{ base: "100%", lg: "auto" }}
          >
            PROCEED
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default PriceFooter;
