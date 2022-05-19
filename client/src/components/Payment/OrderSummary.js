import { Box, Divider, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserState } from "../../Context/Store";
import { ticketData } from "../../dummy data/TicketData";

const OrderSummary = () => {
  const {
    standardTicket,
    dBoxTicket,
    balconyTicket,
    theatreName,
    total,
    setTotal,
    taxPrice,
    setTaxPrice,
    serviceCharge,
    setServiceCharge,
    subTotal,
    setSubTotal,
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
  useEffect(() => {
    calcAllPrice();
  });
  return (
    <Box
      bg="rgba(255, 255, 255,0.1)"
      borderRadius="0px 20px 20px 0px"
      p="50px 40px"
      m="-50px -40px -50px 0"
    >
      <Flex justifyContent="flex-start" mb="20px">
        <Image alt="1.jpg" objectFit="contain" src="1.jpg" height="200px" />
        <Flex flexDir="column" ml="15px">
          <Text color="gray.400">Movie</Text>
          <Text color="white">Sonic the hedgehog 2</Text>
          <Text color="gray.400" mt="10px">
            Theatre
          </Text>
          <Text color="white">{theatreName}</Text>
        </Flex>
      </Flex>
      <VStack>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">D-Box Ticket ( {dBoxTicket} )</Text>
          <Text color="white">
            ${calcTicketPrice(ticketData[1].price, dBoxTicket)}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Balcony Ticket ( {balconyTicket} ) </Text>
          <Text color="white">
            ${calcTicketPrice(ticketData[2].price, balconyTicket)}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Standard Ticket ( {standardTicket} )</Text>
          <Text color="white">
            ${calcTicketPrice(ticketData[0].price, standardTicket)}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Sub Total</Text>
          <Text color="white">${subTotal}</Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Service Charge</Text>
          <Text color="white">${serviceCharge}</Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Tax</Text>
          <Text color="white">${taxPrice}</Text>
        </Flex>
        <Divider />
        <Flex w="100%" justifyContent="space-between">
          <Text color="gray.400">Total</Text>
          <Text color="white">${total}</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default OrderSummary;
