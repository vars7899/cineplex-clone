import ProcessBread from "../components/ProcessBread";
import MovieSummary from "../components/MovieSummary";
import axios from "axios";
import {
  Divider,
  Flex,
  VStack,
  Text,
  Box,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import PriceFooter from "../components/PriceFooter";
import { HiPlus, HiMinus } from "react-icons/hi";
import { UserState } from "../Context/Store";
import { ticketData } from "../dummy data/TicketData";
import LoginAction from "../components/LoginAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketsPage = () => {
  const Navigate = useNavigate();
  const toast = useToast();
  const {
    user,
    standardTicket,
    setStandardTicket,
    dBoxTicket,
    setDBoxTicket,
    balconyTicket,
    setBalconyTicket,
    date,
    time,
    theatreName,
    movieId,
  } = UserState();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  async function getMovieById() {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/movie/${movieId}`);
      console.log(data);
      setMovie(data);
    } catch (error) {
      toast({
        title: `Something went wrong ${error}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!date || !time || !movieId) {
      Navigate("/movies");
    }
    getMovieById();
  }, []);
  return (
    <>
      {/* {!user && <LoginAction />} */}

      <Box
        h=""
        position="relative !important"
        d="flex"
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex
          flexDir="column"
          justifyContent="flex-start"
          alignItems="center"
          h="100%"
          pt="90px"
        >
          {/* Bread Crumb For Progress */}
          <ProcessBread isActive={2} />
          {/* Movie Summary Header */}
          {/* <MovieSummary
            maxW="1000px"
            movie={movie}
            date={date}
            time={time}
            location={theatreName}
          /> */}
          {/* Ticket Bundle UI */}
          <VStack
            w="100%"
            mt="20px"
            mb="50px"
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              justifyContent="space-between"
              w="100%"
              maxW="700px"
              padding="20px 20px"
            >
              <Flex
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  fontSize="2rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="white"
                >
                  Standard
                </Text>
                <Text fontSize="1.05rem" color="gray.400">
                  CPX Ticket ${ticketData[0].price}
                </Text>
                <Flex mt="30px">
                  <Button
                    onClick={() => {
                      standardTicket >= 0 &&
                        setStandardTicket(standardTicket + 1);
                    }}
                  >
                    <HiPlus />
                  </Button>
                  <Input
                    w="80px"
                    textAlign="center "
                    m="0 10px"
                    value={standardTicket}
                    color="white"
                  />
                  <Button
                    onClick={() => {
                      standardTicket > 0 &&
                        setStandardTicket(standardTicket - 1);
                    }}
                  >
                    <HiMinus />
                  </Button>
                </Flex>
              </Flex>
              <Divider orientation="vertical" />
              <Flex
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  fontSize="2rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="white"
                >
                  Balcony
                </Text>
                <Text fontSize="1.05rem" color="gray.400">
                  CPX Ticket ${ticketData[2].price}
                </Text>
                <Flex mt="30px">
                  <Button
                    onClick={() => {
                      balconyTicket >= 0 && setBalconyTicket(balconyTicket + 1);
                    }}
                  >
                    <HiPlus />
                  </Button>
                  <Input
                    w="80px"
                    textAlign="center "
                    m="0 10px"
                    value={balconyTicket}
                    color="white"
                  />
                  <Button
                    onClick={() => {
                      balconyTicket > 0 && setBalconyTicket(balconyTicket - 1);
                    }}
                  >
                    <HiMinus />
                  </Button>
                </Flex>
              </Flex>
              <Divider orientation="vertical" />
              <Flex
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  fontSize="2rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="white"
                >
                  D-Box
                </Text>
                <Text fontSize="1.05rem" color="gray.400">
                  CPX Ticket ${ticketData[1].price}
                </Text>
                <Flex mt="30px">
                  <Button
                    onClick={() => {
                      dBoxTicket >= 0 && setDBoxTicket(dBoxTicket + 1);
                    }}
                  >
                    <HiPlus />
                  </Button>
                  <Input
                    w="80px"
                    textAlign="center "
                    m="0 10px"
                    value={dBoxTicket}
                    color="white"
                  />
                  <Button
                    onClick={() => {
                      dBoxTicket > 0 && setDBoxTicket(dBoxTicket - 1);
                    }}
                  >
                    <HiMinus />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
        <PriceFooter total={22.99} to="/seats" />
      </Box>
    </>
  );
};

export default TicketsPage;
