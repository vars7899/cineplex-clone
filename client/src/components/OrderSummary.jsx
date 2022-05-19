import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

const OrderSummary = () => {
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <Text fontSize="2rem">ORDER SUMMARY</Text>
      <TableContainer>
        <Table variant="simple" minW="400px">
          <Tbody>
            <Tr>
              <Td>D-BOX</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>STANDARD</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>TAX</Td>
              <Td isNumeric>0.94</Td>
            </Tr>
            <Tr>
              <Td>TOTAL</Td>
              <Td isNumeric>94.54</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default OrderSummary;
