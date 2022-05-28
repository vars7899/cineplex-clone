import {
  Box,
  Divider,
  Flex,
  Text,
  VStack,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { UserState } from "../../Context/Store";
import { ticketData } from "../../dummy data/TicketData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSummary = () => {
  const toast = useToast();
  const Navigate = useNavigate();
  const {
    standardTicket,
    dBoxTicket,
    balconyTicket,
    total,
    setTotal,
    taxPrice,
    setTaxPrice,
    serviceCharge,
    setServiceCharge,
    subTotal,
    setSubTotal,
    user,
    selectedSeats,
    movieId,
    theatreId,
    time,
    date,
  } = UserState();

  // ! function to calculate all the price
  function calcAllPrice() {
    let basePriceOfTicket =
      standardTicket * ticketData[0].price +
      dBoxTicket * ticketData[1].price +
      balconyTicket * ticketData[2].price;
    setSubTotal(basePriceOfTicket);
    setTaxPrice((basePriceOfTicket * 0.07).toFixed(2));
    setServiceCharge((basePriceOfTicket * 0.01).toFixed(2));
    setTotal(
      (
        parseFloat(subTotal) +
        parseFloat(taxPrice) +
        parseFloat(serviceCharge)
      ).toFixed(2)
    );
    return;
  }
  function calcTicketPrice(priceOfOne, numberOfTicket) {
    return priceOfOne * numberOfTicket;
  }

  async function handleClick() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        "/api/ticket",
        {
          seats: selectedSeats,
          movieId,
          theatreId,
          time,
          date,
          tax: taxPrice,
          subTotal,
          serviceCharge,
          total,
          user,
        },
        config
      );
      if (response.status === 200) {
        // toast({
        //   title: `Ticket was sent to email`,
        //   status: "success",
        //   isClosable: true,
        //   duration: 3000,
        //   position: "top-right",
        // });
        window.open(response.data.url);
      }
    } catch (err) {
      toast({
        title: `${err}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    if (!user) {
      Navigate("/seats");
    }
    calcAllPrice();
  });

  return (
    <Box
      p="50px  0"
      m={{ base: "0px 5vw", "2xl": "0 -2.5vw" }}
      minW="320px"
      maxW={{ base: "auto", "2xl": "450px" }}
    >
      <Box>
        <Text
          fontSize="lg"
          color="white"
          textTransform="uppercase"
          pb="25px"
          pl="15px"
        >
          Order Summary
        </Text>
        <Divider />
      </Box>
      <VStack pt="25px" spacing="25px">
        {dBoxTicket && (
          <Flex w="100%" justifyContent="space-between" p="0 15px">
            <Text color="gray.400">D-Box Ticket ( {dBoxTicket} )</Text>
            <Text color="white">
              ${calcTicketPrice(ticketData[1].price, dBoxTicket)}
            </Text>
          </Flex>
        )}
        {balconyTicket && (
          <Flex w="100%" justifyContent="space-between" p="0 15px">
            <Text color="gray.400">Balcony Ticket ( {balconyTicket} ) </Text>
            <Text color="white">
              ${calcTicketPrice(ticketData[2].price, balconyTicket)}
            </Text>
          </Flex>
        )}
        {standardTicket && (
          <Flex w="100%" justifyContent="space-between" p="0 15px">
            <Text color="gray.400">Standard Ticket ( {standardTicket} )</Text>
            <Text color="white">
              ${calcTicketPrice(ticketData[0].price, standardTicket)}
            </Text>
          </Flex>
        )}

        <Divider />
        <Flex w="100%" justifyContent="space-between" p="0 15px">
          <Text color="gray.400">Sub Total</Text>
          <Text color="white">${subTotal}</Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between" p="0 15px">
          <Text color="gray.400">Service Charge</Text>
          <Text color="white">${serviceCharge}</Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between" p="0 15px">
          <Text color="gray.400">Tax</Text>
          <Text color="white">${taxPrice}</Text>
        </Flex>
        <Divider />
        <Flex w="100%" justifyContent="space-between" p="0 15px">
          <Text color="gray.400">Total</Text>
          <Text color="white">${total}</Text>
        </Flex>
        <Button
          bg="#feca04"
          color="black"
          colorScheme="yellow"
          padding="0 100px"
          onClick={() => handleClick()}
          isFullWidth
        >
          Pay Now
        </Button>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
