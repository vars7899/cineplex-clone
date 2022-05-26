import { HStack, Button, IconButton, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsPlayCircle, BsPinMap, BsSearch, BsPerson } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import AccountModal from "../AccountModal";
import SearchSideBar from "../SearchSideBar";
import { UserState } from "../../Context/Store";

const NavOptions = ({ d1, d2 }) => {
  const { user } = UserState();
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
        fontSize={{ base: "sm", md: "md", xl: "15px" }}
        fontWeight="light"
        variant="ghost"
        colorScheme="whiteAlpha"
        color="#fff"
        onClick={() => Navigate("/tickets")}
        leftIcon={
          <Box display={{ base: "none", sm: "block" }}>
            <BsPlayCircle />
          </Box>
        }
        textTransform="uppercase"
      >
        Tickets
      </Button>
      <Button
        padding={{ base: "5px", md: "15px", xl: "10px" }}
        fontSize={{ base: "sm", md: "md", xl: "15px" }}
        variant="ghost"
        fontWeight="light"
        colorScheme="whiteAlpha"
        color="#fff"
        onClick={() => Navigate("/theaters")}
        leftIcon={
          <Box display={{ base: "none", sm: "block" }}>
            <BsPinMap />
          </Box>
        }
        textTransform="uppercase"
      >
        Theaters
      </Button>
      <SearchSideBar>
        <Button
          padding={{ base: "5px", md: "15px", xl: "10px" }}
          fontSize={{ base: "sm", md: "md", xl: "15px" }}
          fontWeight="light"
          variant="ghost"
          colorScheme="whiteAlpha"
          color="#fff"
          leftIcon={
            <Box display={{ base: "none", sm: "block" }}>
              <BsSearch />
            </Box>
          }
          textTransform="uppercase"
        >
          Search
        </Button>
      </SearchSideBar>

      <AccountModal>
        <Button
          fontWeight="light"
          padding={{ base: "5px", md: "15px", xl: "10px" }}
          fontSize={{ base: "sm", md: "md", xl: "15px" }}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="#fff"
          leftIcon={
            <Box display={{ base: "none", sm: "block" }}>
              <BsPerson />
            </Box>
          }
          textTransform="uppercase"
        >
          Account
        </Button>
      </AccountModal>
      {user && user?.isAdmin === true && (
        <IconButton
          fontWeight="100"
          display={{ base: "none", xl: "flex" }}
          variant="ghost"
          colorScheme="whiteAlpha"
          color="#fff"
          icon={<MdDashboardCustomize />}
          fontSize="3xl"
          alignItems="center"
          textTransform="uppercase"
          onClick={() => Navigate("/dashboard")}
        />
      )}
    </HStack>
  );
};

export default NavOptions;
