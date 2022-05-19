import React from "react";
import {
  Button,
  useDisclosure,
  VStack,
  StackDivider,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SearchSideBar = ({ children }) => {
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
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input />
            </FormControl>
            <VStack
              divider={<StackDivider borderColor="gray.900" />}
              spacing={4}
              align="stretch"
            >
              {/* put the search result here */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SearchSideBar;
