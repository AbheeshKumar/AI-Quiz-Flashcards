"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { Navbar } from "./Components/navbar";
import { Image } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box width="100vw" pb="2rem">
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          background:
            "linear-gradient(135deg, rgba(224, 44, 31,0.2), rgba(31, 224, 44, 0.3), rgba(44, 31, 224, 0.4))",
          clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 60%)",
          height: "100vh",
          width: "100vw",
          zIndex: 1,
        }}
      />

      <Box zIndex="100">
        <Navbar />
        <Box width="80%" margin="0 auto">
          <Box
            my="2rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 32, md: 64 }}
              textTransform="capitalize"
              variant="h3"
              fontWeight="bold"
            >
              Stop <u>Wasting</u> time on making Quizzes
            </Typography>
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 32, md: 64 }}
              textTransform="capitalize"
              variant="h3"
              fontWeight="bold"
            >
              And Focus on <u>teaching</u>
            </Typography>
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 32, md: 64 }}
              textTransform="capitalize"
              w
              variant="h3"
              fontWeight="bold"
            >
              Let us <u>automate</u> that for you
            </Typography>
          </Box>
          <Stack
            my="3rem"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
          >
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 24, md: 32 }}
              textTransform="capitalize"
              fontWeight="bold"
            >
              Generate quizzes in a matter of minutes
            </Typography>
            <Image sx={{ width: "300px", height: "200px" }} />
          </Stack>
          <Stack
            my="3rem"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
          >
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 24, md: 32 }}
              textTransform="capitalize"
              fontWeight="bold"
            >
              Support documents(pdf, txt) right out of box
            </Typography>
            <Image sx={{ width: "300px", height: "200px" }} />
          </Stack>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <Typography
              textAlign="center"
              color="rgba(224, 44, 31,1)"
              fontSize={{ xs: 24, md: 32 }}
              textTransform="capitalize"
              fontWeight="bold"
            >
              Try it out for yourself
            </Typography>
            <Button
              variant="contained"
              sx={{
                cursor: "pointer",
                minWidth: "200px",
                maxWidth: "200px",
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
              <Typography> Generate Quiz</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
