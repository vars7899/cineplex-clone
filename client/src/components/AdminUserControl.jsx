import {
  Box,
  Divider,
  Stack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserState } from "../Context/Store";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import EmptyList from "./EmptyList";

const UserCard = ({ user, userList, setUserList, admin }) => {
  const toast = useToast();
  const handleClick = async () => {
    if (!user && !admin) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/user/status/${user?._id}`,
        {},
        config
      );
      const restOfUser = userList.filter((item) => item._id !== user._id);
      setUserList([data, ...restOfUser]);
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
  return (
    <Tr fontSize="md">
      <Td>{user?.firstName}</Td>
      <Td display={{ base: "none", md: "table-cell" }}>{user?.lastName}</Td>
      <Td display={{ base: "none", md: "table-cell" }}>{user?.email}</Td>
      {/* <Td>{user?.createdAt}</Td> */}
      <Td textAlign="center">
        {user?.isAdmin ? (
          <IoCheckmarkSharp color="green" />
        ) : (
          <IoCloseSharp color="red" />
        )}
      </Td>
      <Td isNumeric>
        <Button size="sm" onClick={handleClick} colorScheme="red">
          Admin
        </Button>
      </Td>
    </Tr>
  );
};

const AdminUserControl = () => {
  const { user } = UserState();
  const toast = useToast();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllUser = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user", config);
      setUserList(data);
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [user]);

  if (loading)
    return (
      <Stack width="100%">
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
        <Skeleton startColor="gray.100" endColor="white" height="100px" />
      </Stack>
    );
  return (
    <Box width="100%">
      <Box padding="10px 20px" width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          User
        </Text>
        {userList.length === 0 ? (
          <EmptyList title="User" to={"/"} />
        ) : (
          <TableContainer mt="20px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Last Name
                  </Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Email</Th>
                  {/* <Th>First Logged in</Th> */}
                  <Th>Admin</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList.map((item) => (
                  <UserCard
                    admin={user}
                    user={item}
                    userList={userList}
                    setUserList={setUserList}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Divider />
    </Box>
  );
};

export default AdminUserControl;
