import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Store";

const TimeAndDate = ({ children }) => {
  const { setDate, setTime, setMovieName, time, date } = UserState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function clearData() {
    setDate(null);
    setTime(null);
    setMovieName(null);
  }

  const timeEnum = [
    "",
    "10:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "07:30 PM",
    "09:00 PM",
    "10:30 PM",
  ];

  const dateEnum = [
    "",
    moment().format("MMM Do YYYY"),
    moment().add(1, "days").format("MMM Do YYYY"),
    moment().add(2, "days").format("MMM Do YYYY"),
    moment().add(3, "days").format("MMM Do YYYY"),
    moment().add(4, "days").format("MMM Do YYYY"),
    moment().add(5, "days").format("MMM Do YYYY"),
    moment().add(6, "days").format("MMM Do YYYY"),
    moment().add(7, "days").format("MMM Do YYYY"),
  ];

  useEffect(() => {
    setDate(dateEnum[0]);
    setTime(timeEnum[0]);
  }, []);

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          clearData();
          onClose();
        }}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerHeader style={{ background: "#0a0b0d", color: "#fff" }}>
            Movie Reservation
          </DrawerHeader>

          <DrawerBody style={{ background: "#0a0b0d", color: "#fff" }}>
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <FormControl mt="20px" isRequired>
                <FormLabel>Select Date</FormLabel>
                <Select
                  bg="#0a0b0d"
                  variant="outline"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                >
                  {dateEnum.map((d) => (
                    <option key={d} style={{ background: "#0a0b0d" }} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt="20px" isRequired>
                <FormLabel>Select Time</FormLabel>
                <Select
                  bg="#0a0b0d"
                  variant="outline"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                >
                  {timeEnum.map((t) => (
                    <option key={t} style={{ background: "#0a0b0d" }} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
          </DrawerBody>

          <DrawerFooter style={{ background: "#0a0b0d", color: "#fff" }}>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                clearData();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              bg="#feca04"
              color="black"
              onClick={() => {
                onClose();
              }}
            >
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TimeAndDate;
