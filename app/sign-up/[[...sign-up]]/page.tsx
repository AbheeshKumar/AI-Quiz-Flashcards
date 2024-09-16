import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

export default function Page() {
  return (
    <Box bgcolor="whitesmoke" height="100vh" width="100vw">
      <AppBar position="static" sx={{ height: "10%" }}>
        <Toolbar>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography sx={{ flexGrow: 1 }}>Quiz Maker</Typography>
        </Toolbar>
      </AppBar>

      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="80%"
      >
        <SignUp />
      </Stack>
    </Box>
  );
}
