import { Flex } from "@chakra-ui/react";
import React from "react";
import ProcessBread from "../components/ProcessBread";
import TheatreList from "../components/TheatreList";

const TheatrePage = () => {
  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt="90px"
    >
      <ProcessBread isActive={0} />
      <TheatreList
        style={{
          zIndex: "10",
          maxHeight: "600px",
          overflow: "hidden",
          maxHeight: "575px",
        }}
      />
    </Flex>
  );
};

export default TheatrePage;
