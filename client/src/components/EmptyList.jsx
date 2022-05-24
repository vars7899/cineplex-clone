import { Center, Link, Text, VStack } from "@chakra-ui/react";
import { IoFolderOpen } from "react-icons/io5";

const EmptyList = ({ title, to }) => {
  return (
    <Center
      bg="gray.100"
      maxWidth="1000px"
      height={{ base: "300px", md: "500px" }}
      padding="0px 70px"
      borderRadius="10px"
    >
      <VStack>
        <IoFolderOpen color="grey.300" fontSize="50px" />
        <Text fontSize="sm" textAlign="center">
          You haven't added any {title} to Database yet
        </Text>
        <Link fontSize="sm" href={to} fontWeight="extrabold">
          Add a {title}
        </Link>
      </VStack>
    </Center>
  );
};

export default EmptyList;
