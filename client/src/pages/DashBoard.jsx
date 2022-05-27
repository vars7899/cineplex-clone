import { Box, Grid, VStack, Flex } from "@chakra-ui/react";
import AdminMovieControl from "../components/AdminMovieControl";
import Frequently from "../components/Frequently";
import Statics from "../components/Statics";
import AdminTheatreControl from "../components/AdminTheatreControl";
import AdminUserControl from "../components/AdminUserControl";
import { UserState } from "../Context/Store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InitialLoader from "../components/Loading/InitialLoader";

const DashBoard = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { user } = UserState();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!user && !user?.isAdmin) {
      Navigate("/");
    } else {
      setInitialLoading(false);
    }
  }, [user]);
  if (initialLoading) {
    return <InitialLoader />;
  }
  return (
    <>
      {initialLoading && <InitialLoader />}
      <Box
        minH="100vh"
        bg="white"
        pt={{ base: "170px", xl: "130px" }}
        width="100%"
        pb="55px"
      >
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
      </Box>
    </>
  );
};
export default DashBoard;
