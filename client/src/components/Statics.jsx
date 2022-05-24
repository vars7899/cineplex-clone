import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/react";

const Statics = () => {
  return (
    <Box
      border="1px solid grey"
      borderRadius="10px"
      width="100%"
      padding="20px 20px"
    >
      <Text fontSize="2xl" textAlign="center">
        Admin Statics
      </Text>
      <Divider m="10px 0" />
      <VStack spacing="10px">
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Users</Text>
          <Text color="gray">204</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Movies</Text>
          <Text color="gray">20</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Theatres</Text>
          <Text color="gray">5</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Tickets sold</Text>
          <Text color="gray">2045</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Statics;
