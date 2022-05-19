import { Box } from "@chakra-ui/react";
import AdminNavbar from "../components/AdminNavbar";
import CurrentMovies from "../components/CurrentMovies";

const DashBoard = () => {
  return (
    <Box minH="100vh">
      <AdminNavbar />
      <CurrentMovies />
      {/* Add something */}
      {/* create movie */}
      {/* orders of ticket */}
      {/* create new theatre */}
    </Box>
  );
};
export default DashBoard;
