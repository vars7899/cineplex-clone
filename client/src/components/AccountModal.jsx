import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./RegisterPanel";
import { motion } from "framer-motion";
import { UserState } from "../Context/Store";
import AccountDetails from "./AccountDetails";

const AccountModal = ({ children }) => {
  const { user } = UserState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children && <Box onClick={onOpen}>{children}</Box>}

      <Modal as={motion.div} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {user ? (
              <AccountDetails onClose={onClose} />
            ) : (
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Login</Tab>
                  <Tab>Register</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <LoginPanel onClose={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <RegisterPanel onClose={onClose} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountModal;
