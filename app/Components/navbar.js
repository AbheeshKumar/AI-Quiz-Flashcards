"use client";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <nav>
      <Box py="2rem" display="flex" justifyContent="center" alignItems="center">
        <AppBar
          variant="none"
          sx={{
            bgcolor: "rgba(31, 224, 44, 0.6)",
            width: "95%",
            borderRadius: "30px",
          }}
          position="sticky"
        >
          <Toolbar>
            <Box
              width="50%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={{ sm: "1rem", md: "2rem" }}
            >
              <AdbIcon
                fontSize="large"
                sx={{
                  display: { xs: "flex", md: "flex" },
                  mr: 1,
                }}
              />
              <Typography fontSize={{ xs: 16, md: 24 }} sx={{ flexGrow: 1 }}>
                Quiz Maker
              </Typography>
            </Box>
            <Box
              width="50%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              flex="1"
              sx={{
                mr: { xs: "1rem", md: "2rem" },
                gap: { xs: "1rem", md: "3rem" },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  bgcolor: "#EB148F",
                  "&:hover": {
                    bgcolor: "#d0057a",
                  },
                  [theme.breakpoints.down("sm")]: {
                    padding: "8px 10px",
                  },
                }}
                onClick={() => router.push("/flashcards")}
              >
                <Typography fontSize={{ xs: "0.7rem", md: "1rem" }}>
                  View Flashcards
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  bgcolor: "#EB148F",
                  "&:hover": {
                    bgcolor: "#d0057a",
                  },
                  [theme.breakpoints.down("sm")]: {
                    padding: "8px 10px",
                  },
                }}
                onClick={() => router.push("/generate")}
              >
                <Typography fontSize={{ xs: "0.7rem", md: "1rem" }}>
                  Create New Quiz
                </Typography>
              </Button>
              <SignedOut>
                <Button href="/sign-in" sx={{ mr: "1rem" }} variant="contained">
                  Login
                </Button>
                <Button href="/sign-up" variant="contained">
                  Sign out
                </Button>
              </SignedOut>
              <SignedIn>
                <Box>
                  <UserButton
                    appearance={{
                      elements: {
                        formButtonPrimary: styles.primaryColor,
                      },
                    }}
                  />
                </Box>
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
};

export { Navbar };
