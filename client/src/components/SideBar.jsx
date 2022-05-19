import React from "react";
import { Button, useDisclosure, VStack, StackDivider } from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SideBar = ({ children }) => {
  const Navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div>
      <div onClick={onOpen}>{children}</div>
      <Drawer onClose={onClose} isOpen={isOpen} size="sm" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            d="flex"
            alignItems="center"
            justifyContent="flex-end"
            style={{ background: "#121420", color: "#fff" }}
            h="55px"
          >
            <Button
              onClick={onClose}
              variant="unstyled"
              colorScheme="whiteAlpha"
            >
              <CloseIcon />
            </Button>
          </DrawerHeader>
          <DrawerBody
            style={{ background: "#121420", color: "#fff" }}
            pt="40px"
          >
            <VStack
              divider={<StackDivider borderColor="gray.900" />}
              spacing={4}
              align="stretch"
            >
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/tickets")}
              >
                WHAT'S ON
              </Button>
              <Button
                mr="10px"
                variant="ghost"
                fontWeight="light"
                fontSize="lg"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/theaters")}
              >
                EXPERIENCES
              </Button>
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/search")}
              >
                CINECLUB
              </Button>
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/account")}
              >
                FOOD & DRINK
              </Button>
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/account")}
              >
                WATCH AT HOME
              </Button>
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/account")}
              >
                PARTIES & GROUPS
              </Button>
              <Button
                mr="10px"
                fontWeight="light"
                fontSize="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
                color="#fff"
                onClick={() => Navigate("/account")}
              >
                GIFT CARDS
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideBar;
