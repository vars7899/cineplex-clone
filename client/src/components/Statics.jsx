import { Box, Divider, Flex, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserState } from "../Context/Store";

const Statics = () => {
  const toast = useToast();
  const { user } = UserState();
  const [stat, setStat] = useState([0, 0, 0, 0]);
  const getAllStats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user/statics", config);
      setStat([data?.user, data?.movie, data?.theatre, data?.ticket]);
      console.log(data);
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    getAllStats();
  }, [user]);
  return (
    <Box
      border="1px solid grey"
      borderRadius="10px"
      width="90%"
      padding={{ base: "20px 30px" }}
    >
      <Text fontSize="2xl" textAlign="center">
        Admin Statics
      </Text>
      <Divider m="10px 0" />
      <VStack spacing="10px">
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Users</Text>
          <Text color="gray">{stat[0]}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Movies</Text>
          <Text color="gray">{stat[1]}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Theatres</Text>
          <Text color="gray">{stat[2]}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text>Total Tickets sold</Text>
          <Text color="gray">{stat[3]}</Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Statics;
