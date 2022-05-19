import React, { useState } from "react";
import MovieSummary from "../components/MovieSummary";
import ProcessBread from "../components/ProcessBread";
import PriceFooter from "../components/PriceFooter";
import { Box, Divider, Flex, Grid } from "@chakra-ui/react";
import OrderSummary from "../components/Payment/OrderSummary";
import OrderDetailForm from "../components/Payment/OrderDetailForm";

const PaymentPage = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt="90px"
    >
      <ProcessBread isActive={4} />
      <Grid
        bg="rgba(255, 255, 255, 0.1)"
        mt="10px"
        minW="1100"
        gridTemplateColumns="3fr 2fr"
        gap="60px"
        p="50px 40px"
        borderRadius="20px"
        minH="575px"
      >
        <OrderDetailForm />
        <OrderSummary />
      </Grid>
      <PriceFooter total={22.99} />
    </Flex>
  );
};

export default PaymentPage;
