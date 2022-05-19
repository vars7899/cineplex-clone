import { Box, Text } from "@chakra-ui/react";

const AdminNavbar = () => {
  return (
    <Box
      w="100%"
      bg="white"
      p="20px 5vw"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="2xl">Cineplex Admin</Text>
    </Box>
  );
};

export default AdminNavbar;
