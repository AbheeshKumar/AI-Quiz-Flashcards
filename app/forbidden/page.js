import { Box, Container, Typography } from "@mui/material";
import { Navbar } from "../Components/navbar";
export default function Forbidden() {
  return (
    <Box maxWidth="100vw" height="100vh">
      <Navbar />
      <Box
        height="70%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Please Login to access this page</Typography>
      </Box>
    </Box>
  );
}
