import React from "react";
import AccountModal from "./AccountModal";
import { Button, Container, Flex, Image } from "@chakra-ui/react";

const LoginAction = () => {
  return (
    <AccountModal>
      <Flex
        position="absolute"
        marginTop="-7vh"
        h="100vh"
        w="100vw"
        zIndex="200"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        backdropFilter="blur(3px)"
      >
        <Container
          position="relative"
          height="400px"
          width="450px"
          borderRadius={5}
          overflow="hidden"
        >
          <Image
            src="animation/login.gif"
            height="400"
            width="450"
            objectFit="cover"
            position="absolute"
            top="0"
            left="0"
          />
          <Image
            src="logo.png"
            height="100"
            width="150"
            objectFit="contain"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          />
          <Button
            colorScheme="blackAlpha"
            isFullWidth
            position="absolute"
            bottom="0"
            left="0"
            size="lg"
          >
            LOGIN TO CONTINUE
          </Button>
        </Container>
      </Flex>
    </AccountModal>
  );
};

export default LoginAction;
