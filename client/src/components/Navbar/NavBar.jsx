import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../animation/logo1.png";
import SideBar from "../SideBar";
import NavOptions from "./NavOptions";
import { UserState } from "../../Context/Store";
import { MdDashboardCustomize } from "react-icons/md";

const NavBar = () => {
  const { user } = UserState();
  const Navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: "100%",
        zIndex: "100",
        position: "relative",
        backdropFilter: location.pathname === "/" && "blur(5px)",
        background: location.pathname !== "/" && "#0a0b0d",
        position: "fixed",
      }}
    >
      <Flex
        h="90px"
        w="100%"
        maxWidth="100vw"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        background="none"
        color="#fff"
        padding={{ base: "0px 25px", lg: "0 30px" }}
      >
        <SideBar>
          <IconButton
            variant="unstyled"
            fontSize="3xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            icon={<HamburgerIcon />}
          />
        </SideBar>

        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          fontSize="xl"
          cursor="pointer"
          onClick={() => Navigate("/")}
        >
          <Image src={logo} objectFit="contain" height="50px" />
        </Box>
        <Box>
          <NavOptions d1="none" d2="flex" />
        </Box>
        {user && user?.isAdmin === true && (
          <IconButton
            fontWeight="100"
            display={{ base: "flex", xl: "none" }}
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
      </Flex>
      <Flex>
        <NavOptions d1="flex" d2="none" />
      </Flex>
    </div>
  );
};

export default NavBar;
