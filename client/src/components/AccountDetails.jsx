import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const AccountDetails = ({ onClose }) => {
  const toast = useToast();
  const { user, setUser } = UserState();
  const navigate = useNavigate();

  // ? handle the logout functionality
  const handleLogout = () => {
    localStorage.removeItem("cineplex-user");
    setUser(null);
    onClose();
    navigate("/");
    toast({
      title: `User logged out successfully`,
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div>
      <VStack mb="30px">
        <Avatar
          size="2xl"
          name={`${user?.firstName} ${user?.lastName}`}
          src={user?.image}
          mb="20px"
        />
        <Text fontSize="4xl">{`${user?.firstName} ${user?.lastName}`}</Text>
        <Text fontSize="sm">{user?.email}</Text>
      </VStack>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text>Manage Account</Text>
                <Text fontSize="xs">Profile and payment settings</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl mb="20px">
              <FormLabel>First Name</FormLabel>
              <Input
                isRequired
                type="text"
                value={user?.firstName}
                isFullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                isRequired
                type="text"
                value={user?.lastName}
                isFullWidth
              />
            </FormControl>
            <Button
              colorScheme="telegram"
              style={{ marginTop: "30px" }}
              isFullWidth
              variant="solid"
              mb={"10px"}
            >
              UPDATE USER DETAILS
            </Button>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text>CineClub</Text>
                <Text fontSize="xs">The movie-lover membership</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        colorScheme="red"
        style={{ marginTop: "30px" }}
        isFullWidth
        variant="solid"
        mb={"10px"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default AccountDetails;
