import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import TheatreMovie from "../components/TheatreMovie";
import ProcessBread from "../components/ProcessBread";
import DetailFooter from "../components/DetailFooter";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const Navigate = useNavigate();
  const { time, date, movieName, theatreName } = UserState();
  useEffect(() => {
    if (!theatreName) Navigate("/theaters");
  }, []);

  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt="90px"
    >
      <ProcessBread isActive={1} />
      <TheatreMovie />
      <DetailFooter
        time={time}
        date={date}
        movie={movieName}
        theatre={theatreName}
      />
    </Flex>
  );
};

export default MoviePage;
