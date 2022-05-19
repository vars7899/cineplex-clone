import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { UserState } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderDetailForm = () => {
  const Navigate = useNavigate();
  const toast = useToast();
  const {
    total,
    selectedSeats,
    movieId,
    theatreId,
    time,
    date,
    taxPrice,
    subTotal,
    serviceCharge,
    user,
  } = UserState();
  useEffect(() => {
    if (!date || !time) {
      toast({
        title: `Session expired`,
        status: "info",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      Navigate("/theatres");
    }
  }, []);
  const payNow = async (token) => {
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
          token,
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
  };
  return (
    <Box maxW="700px">
      <Flex flexDir="column" mb="10">
        <Text fontSize="3xl" color="#fff">
          Payment Details
        </Text>
        <Text color="gray.400">
          Enter your personal details to complete your purchase
        </Text>
      </Flex>
      <Box>
        <Flex mb="20px">
          <FormControl mr="10px">
            <FormLabel color="gray.400">First Name</FormLabel>
            <Input color="white" variant="outline" required />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.400">Last Name</FormLabel>
            <Input color="white" variant="outline" />
          </FormControl>
        </Flex>
        <FormControl mb="20px">
          <FormLabel color="gray.400">Email Address</FormLabel>
          <Input color="white" variant="outline" />
        </FormControl>
        <FormControl mb="20px">
          <FormLabel color="gray.400">Address Line</FormLabel>
          <Input color="white" variant="outline" />
        </FormControl>

        <Flex mb="20px">
          <FormControl mr="10px">
            <FormLabel color="gray.400">Postal Code</FormLabel>
            <Input color="white" variant="outline" required />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.400">Country</FormLabel>
            <Input color="white" variant="outline" />
          </FormControl>
        </Flex>
        <Flex justifyContent="flex-end">
          {/* <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            label="Checkout"
            name="Pay with Credit Card"
            amount={total * 100}
            description={`Your total is $${total}`}
            token={payNow}
          /> */}
          <Button onClick={() => payNow()}>Checkout</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default OrderDetailForm;
