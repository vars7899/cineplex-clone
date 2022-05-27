import { Box, Image } from "@chakra-ui/react";
import wheel from "../../animation/whe.gif";

const InitialLoader = () => {
  return (
    <Box
      position="relative"
      height="100vh"
      width="100vw"
      bg="#030303"
      zIndex="110"
    >
      <Image
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        src={wheel}
        objectFit="contain"
        height="500px"
      />
    </Box>
  );
};

export default InitialLoader;
