import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
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
        p="10px 100px"
        bg="rgba(255, 255, 255,0.1)"
        shadow="lg"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      >
        <Flex alignItems="center" justifyContent="flex-end">
          <Text color="gray.400" mr="50px">
            SubTotal: ${handleTotal()}
          </Text>
          <Button colorScheme="gray" padding="0 100px" onClick={handleClick}>
            PROCEED
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default PriceFooter;
