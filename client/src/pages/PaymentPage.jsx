import ProcessBread from "../components/ProcessBread";
import { Box, Flex, Grid } from "@chakra-ui/react";
import OrderSummary from "../components/Payment/OrderSummary";
import OrderDetails from "../components/Payment/OrderDetails";

const PaymentPage = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      h="100%"
      pt={{ base: "160px", xl: "90px" }}
      pb={{ base: "160px" }}
      m="0 5vw"
    >
      <Box display={{ base: "none", sm: "block" }}>
        <ProcessBread isActive={4} />
      </Box>
      <Flex alignItems="center">
        <Grid
          width="100%"
          gridTemplateColumns={{ base: "1fr", "2xl": "1fr 0.5fr" }}
        >
          <Box justifySelf="end">
            <OrderDetails />
          </Box>
          <Box justifySelf={{ base: "stretch" }}>
            <OrderSummary />
          </Box>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default PaymentPage;
