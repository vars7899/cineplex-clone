import React from "react";
import { background, Box, Button, Flex } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, useHref, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import NavOptions from "./NavOptions";

const NavBar = () => {
  const Navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: "100%",
        zIndex: "100",
        position: "relative",
        backdropFilter: location.pathname === "/" && "blur(5px)",
        background: location.pathname !== "/" && "#00171F",
        position: "fixed",
      }}
    >
      <Flex
        h="65px"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        background="none"
        color="#fff"
        padding="0 50px"
      >
        <SideBar>
          <Button variant="unstyled" fontSize="xl">
            <HamburgerIcon />
          </Button>
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
          Cineplex
        </Box>
        <Box>
          <NavOptions d1="none" d2="flex" />
        </Box>
      </Flex>
      <Flex>
        <NavOptions d1="flex" d2="none" />
      </Flex>
    </div>
  );
};

export default NavBar;
