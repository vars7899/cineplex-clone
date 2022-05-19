import React from "react";
import { HStack, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsPlayCircle, BsPinMap, BsSearch, BsPerson } from "react-icons/bs";
import AccountModal from "./AccountModal";
import SearchSideBar from "./SearchSideBar";

const NavOptions = ({ d1, d2 }) => {
  const Navigate = useNavigate();
  return (
    <HStack
      d={{ base: d1, xl: d2 }}
      color="#fff"
      w="100%"
      textAlign="center"
      padding={{ base: "10px" }}
      justifyContent="center"
    >
      <Button
        padding={{ base: "5px", md: "15px", xl: "10px" }}
        fontSize={{ base: "sm", md: "md", xl: "lg" }}
        fontWeight="light"
        variant="ghost"
        colorScheme="whiteAlpha"
        color="#fff"
        onClick={() => Navigate("/tickets")}
        leftIcon={<BsPlayCircle />}
      >
        Tickets
      </Button>
      <Button
        padding={{ base: "5px", md: "15px", xl: "10px" }}
        fontSize={{ base: "sm", md: "md", xl: "lg" }}
        variant="ghost"
        fontWeight="light"
        colorScheme="whiteAlpha"
        color="#fff"
        onClick={() => Navigate("/theaters")}
        leftIcon={<BsPinMap />}
      >
        Theaters
      </Button>
      <SearchSideBar>
        <Button
          padding={{ base: "5px", md: "15px", xl: "10px" }}
          fontSize={{ base: "sm", md: "md", xl: "lg" }}
          fontWeight="light"
          variant="ghost"
          colorScheme="whiteAlpha"
          color="#fff"
          leftIcon={<BsSearch />}
        >
          Search
        </Button>
      </SearchSideBar>

      <AccountModal>
        <Button
          fontWeight="light"
          padding={{ base: "5px", md: "15px", xl: "10px" }}
          fontSize={{ base: "sm", md: "md", xl: "lg" }}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="#fff"
          leftIcon={<BsPerson />}
        >
          Account
        </Button>
      </AccountModal>
    </HStack>
  );
};

export default NavOptions;
