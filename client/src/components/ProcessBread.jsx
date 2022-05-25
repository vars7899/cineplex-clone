import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ProcessBread = ({ isActive }) => {
  const Navigate = useNavigate();
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      padding="15px 0px"
      zIndex="100"
      overflowX="scroll"
    >
      <Breadcrumb
        spacing={{ base: "0px", md: "5px", xl: "30px" }}
        fontSize={{ base: "12px", md: "md" }}
        separator={<HiChevronRight color="#fff" />}
        wrap="nowrap"
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              isActive >= 0 && Navigate("/theaters");
            }}
            padding={{ base: "5px 5px", md: "10px 20px" }}
            borderRadius={{ base: "2px", md: "10px" }}
            bg={isActive === 0 ? "rgba(255, 255, 255,0.1)" : ""}
            color={
              isActive === 0 ? "#fff" : isActive > 0 ? "#00A8E8" : "gray.400"
            }
          >
            THEATRE
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              isActive >= 1 && Navigate("/movies");
            }}
            padding="10px 20px"
            borderRadius="10px"
            bg={isActive === 1 ? "rgba(255, 255, 255,0.1)" : ""}
            color={
              isActive === 1 ? "#fff" : isActive > 1 ? "#00A8E8" : "gray.400"
            }
          >
            MOVIE
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              isActive >= 2 && Navigate("/tickets");
            }}
            padding="10px 20px"
            borderRadius="10px"
            bg={isActive === 2 ? "rgba(255, 255, 255,0.1)" : ""}
            color={
              isActive === 2 ? "#fff" : isActive > 2 ? "#00A8E8" : "gray.400"
            }
          >
            TICKETS
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              isActive >= 3 && Navigate("/seats");
            }}
            padding="10px 20px"
            borderRadius="10px"
            bg={isActive === 3 ? "rgba(255, 255, 255,0.1)" : ""}
            color={
              isActive === 3 ? "#fff" : isActive > 3 ? "#00A8E8" : "gray.400"
            }
          >
            SEATS
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              isActive >= 4 && Navigate("/payment");
            }}
            padding="10px 20px"
            borderRadius="10px"
            bg={isActive === 4 ? "rgba(255, 255, 255,0.1)" : ""}
            color={
              isActive === 4 ? "#fff" : isActive > 4 ? "#00A8E8" : "gray.400"
            }
          >
            PAYMENT
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default ProcessBread;
