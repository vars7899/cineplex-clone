import { Divider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MovieSummary from "../components/MovieSummary";
import ProcessBread from "../components/ProcessBread";
import SeatPreview from "../components/SeatPreview";
import { data } from "../dummy data/Data.js";
import PriceFooter from "../components/PriceFooter";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const Navigate = useNavigate();
  const { date, time, theatreName } = UserState();

  useEffect(() => {
    // ! Check if the flow of data is right
    if (!date || !time) {
      Navigate("/movies");
    }
  }, []);

  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="center"
      h="100%"
      pt="90px"
    >
      <ProcessBread isActive={3} />
      <MovieSummary
        movie={data[0]}
        date={date}
        time={time}
        location={theatreName}
      />
      <SeatPreview />
      <PriceFooter total={22.99} to="/payment" />
    </Flex>
  );
};

export default TicketPage;
