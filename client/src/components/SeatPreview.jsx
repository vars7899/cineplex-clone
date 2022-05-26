import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Button,
  Divider,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { seatAlignment } from "../dummy data/SeatAlignment";
import { BsFillSquareFill } from "react-icons/bs";
import { UserState } from "../Context/Store";

const SeatPreview = () => {
  const toast = useToast();

  const {
    dBoxTicket,
    standardTicket,
    balconyTicket,
    selectedSeats,
    setSelectedSeats,
  } = UserState();
  const [assignSeats, setAssignSeats] = useState(
    dBoxTicket + standardTicket + balconyTicket
  );

  // ! To handle the ticket type
  let standard = standardTicket;
  let dBox = dBoxTicket;
  let balcony = balconyTicket;

  // ! function to assign the selected seats from seat map
  const handleSelect = (type, index, bin) => {
    if (selectedSeats.includes(`${type}  ${index}`)) {
      if ((bin === 1 && standard-- > 0) || (bin === 2 && dBox-- > 0)) {
        setSelectedSeats(
          selectedSeats.filter((item) => item !== `${type}  ${index}`)
        );
      } else {
        toast({
          title: `Seat ${type}  ${index} selected does not match the type of ticket`,
          status: "success",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      }
      return;
    }
    if (selectedSeats.length + 1 <= assignSeats) {
      // ! validate if the user is selecting the right ticket
      if ((bin === 1 && standard-- > 0) || (bin === 2 && dBox-- > 0)) {
        setSelectedSeats([...selectedSeats, `${type}  ${index}`]);
        toast({
          title: `Seat ${type}  ${index} selected`,
          status: "success",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      } else {
        toast({
          title: `Seat ${type}  ${index} selected does not match the type of ticket`,
          status: "success",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      }
    } else {
      if ((bin === 1 && standard-- > 0) || (bin === 2 && dBox-- > 0)) {
        setSelectedSeats([
          ...selectedSeats.splice(1, selectedSeats.length),
          `${type}  ${index}`,
        ]);
      } else {
        toast({
          title: `Seat ${type}  ${index} selected does not match the type of ticket`,
          status: "success",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
      }
    }
    return;
  };
  const seatType = (bin, index, type) => {
    if (bin === 0)
      return (
        <Button
          key={`${type}  ${index}`}
          cursor="default"
          variant="unstyled"
          size={{ base: "10px", md: "16px" }}
        >
          <BsFillSquareFill color="#0a0b0d" />
        </Button>
      );
    else if (bin === 1)
      return (
        <Tooltip
          key={`${type}  ${index}`}
          label={`${type}  ${index}`}
          hasArrow
          placement="top"
        >
          <Button
            variant="unstyled"
            outline="none"
            size={{ base: "10px", md: "16px" }}
            onClick={() => handleSelect(type, index, bin)}
          >
            <BsFillSquareFill
              className={
                selectedSeats.includes(`${type}  ${index}`)
                  ? `seat selected`
                  : `seat`
              }
              color="#a0aec0"
            />
          </Button>
        </Tooltip>
      );
    else if (bin === 2)
      return (
        <Tooltip
          key={`${type}  ${index}`}
          label={`${type}  ${index}`}
          hasArrow
          placement="top"
        >
          <Button
            variant="unstyled"
            size={{ base: "10px", md: "16px" }}
            onClick={() => handleSelect(type, index, bin)}
          >
            <BsFillSquareFill
              color="#f57900"
              className={
                selectedSeats.includes(`${type}  ${index}`)
                  ? `seat selected`
                  : `seat`
              }
            />
          </Button>
        </Tooltip>
      );
  };
  return (
    <Flex
      mt="40px"
      mb="100px"
      w="100%"
      maxW="100vw"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        width="100%"
        bg="blackAlpha.100"
        padding="10px 20px"
        borderRadius="10px"
      >
        <Text fontSize="1.25rem" color="white">
          Seat(s) Selection:  
        </Text>
        {selectedSeats.length === 0 && (
          <Text fontSize="1.25rem" color="gray.400">
            No seat selected
          </Text>
        )}
        <Flex wrap="wrap" maxW="360px">
          {selectedSeats.map((item, index) => (
            <Text fontSize="1.25rem" key={index} color="gray.400">
              {item}, 
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        maxW="700px"
        mt="40px"
      >
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        >
          <div className="screenLine"></div>
          <Text color="gray.400">SCREEN</Text>
        </Box>
        <Box mt="60px">
          <VStack>
            <HStack>
              {seatAlignment.AA.map((seat, index) =>
                seatType(seat, index, "AA")
              )}
            </HStack>
            <HStack>
              {seatAlignment.BB.map((seat, index) =>
                seatType(seat, index, "BB")
              )}
            </HStack>
            <HStack>
              {seatAlignment.CC.map((seat, index) =>
                seatType(seat, index, "CC")
              )}
            </HStack>
            <HStack>
              {seatAlignment.DD.map((seat, index) =>
                seatType(seat, index, "DD")
              )}
            </HStack>
            <HStack>
              {seatAlignment.X.map((seat, index) => seatType(seat, index, "X"))}
            </HStack>
            <HStack>
              {seatAlignment.X.map((seat, index) => seatType(seat, index, "X"))}
            </HStack>
            <HStack>
              {seatAlignment.A.map((seat, index) => seatType(seat, index, "A"))}
            </HStack>
            <HStack>
              {seatAlignment.B.map((seat, index) => seatType(seat, index, "B"))}
            </HStack>
            <HStack>
              {seatAlignment.C.map((seat, index) => seatType(seat, index, "C"))}
            </HStack>
            <HStack>
              {seatAlignment.D.map((seat, index) => seatType(seat, index, "D"))}
            </HStack>
            <HStack>
              {seatAlignment.E.map((seat, index) => seatType(seat, index, "E"))}
            </HStack>
            <HStack>
              {seatAlignment.F.map((seat, index) => seatType(seat, index, "F"))}
            </HStack>
            <HStack>
              {seatAlignment.G.map((seat, index) => seatType(seat, index, "G"))}
            </HStack>
            <HStack>
              {seatAlignment.H.map((seat, index) => seatType(seat, index, "H"))}
            </HStack>
            <HStack>
              {seatAlignment.I.map((seat, index) => seatType(seat, index, "I"))}
            </HStack>
            <HStack>
              {seatAlignment.J.map((seat, index) => seatType(seat, index, "J"))}
            </HStack>
            <HStack>
              {seatAlignment.K.map((seat, index) => seatType(seat, index, "K"))}
            </HStack>
          </VStack>
        </Box>
        <Box w="100%" mt="30px" mb="30px">
          <Button w="100%" variant="outline" color="gray">
            REFRESH SEATING MAP
          </Button>
        </Box>
        <Divider />
        <Flex flexDir="column" alignItems="flex-start" w="100%" color="white">
          <Text fontSize="sm" mb="30px" mt="10px">
            SEAT INFORMATION
          </Text>
          <Flex justifyContent="space-between" w="100%">
            <Box d="flex" alignItems="center" flexDir="column">
              <BsFillSquareFill color="#a0aec0" className="seat" />
              <Text mt="5px">Standard</Text>
            </Box>
            <Box d="flex" alignItems="center" flexDir="column">
              <BsFillSquareFill color="#f57900" className="seat" />
              <Text mt="5px">D-Box</Text>
            </Box>
            <Box d="flex" alignItems="center" flexDir="column">
              <BsFillSquareFill color="#cb3649" className="seat" />
              <Text mt="5px">Occupied</Text>
            </Box>
            <Box d="flex" alignItems="center" flexDir="column">
              <BsFillSquareFill color="green" className="seat" />
              <Text mt="5px">Selected</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SeatPreview;
