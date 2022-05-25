import { Flex, Box } from "@chakra-ui/react";
import ProcessBread from "../components/ProcessBread";
import TheatreList from "../components/TheatreList";

const TheatrePage = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt={{ base: "140px", xl: "90px" }}
    >
      <Box display={{ base: "none", sm: "block" }}>
        <ProcessBread isActive={0} />
      </Box>
      <TheatreList
        style={{
          zIndex: "10",
          overflow: "hidden",
        }}
      />
    </Flex>
  );
};

export default TheatrePage;
