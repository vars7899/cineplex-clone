import { Box, Grid, VStack, Flex } from "@chakra-ui/react";
import AdminMovieControl from "../components/AdminMovieControl";
import AdminNavbar from "../components/AdminNavbar";
import Frequently from "../components/Frequently";
import Statics from "../components/Statics";
import CurrentMovies from "../components/CurrentMovies";
import AdminTheatreControl from "../components/AdminTheatreControl";
import AdminUserControl from "../components/AdminUserControl";

const DashBoard = () => {
  return (
    <Box minH="100vh" bg="white" pt="65px" width="100%" pb="55px">
      <AdminNavbar />
      {/* <CurrentMovies /> */}
      <Flex width="100%" justifyContent="center">
        <Grid
          gridTemplateColumns={{ base: "1fr", xl: "1fr 400px" }}
          padding="0 5vw"
          maxW="1500px"
          gap="30px"
        >
          <VStack minWidth="100%">
            <AdminMovieControl />
            <AdminTheatreControl />
            <AdminUserControl />
          </VStack>
          <VStack mt="10px" spacing="40px">
            <Statics />
            <Frequently />
          </VStack>
        </Grid>
      </Flex>

      {/* orders of ticket */}
      {/* create new theatre */}
    </Box>
  );
};
export default DashBoard;
