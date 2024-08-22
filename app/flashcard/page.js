"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useSearchParams } from "next/navigation";
import { collection, doc, getDocs } from "firebase/firestore";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const OptionsSection = ({ answer, choice }) => {
  return (
    <Box
      width="100%"
      minHeight="50px"
      borderRadius="25px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      px="0.5rem"
      border="1px solid black"
      bgcolor={choice === answer ? "lightgreen" : "white"}
      overflow="auto"
      tabIndex={0}
    >
      <CircleOutlinedIcon color="primary" />
      <Typography textAlign="start" fontSize="0.9rem" mx="0.5rem">
        {choice}
      </Typography>
    </Box>
  );
};

export default function Flashcard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [flashcards, setFlashcards] = useState();
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashCard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashCard();
  }, [search, user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Grid justifyContent="center" alignItems="center" container spacing={8}>
      {flashcards?.map((flashcard, index) => (
        <Grid item key={index}>
          <Card sx={{ width: "300px", height: "400px", my: "2rem" }}>
            <CardActionArea sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <Box sx={{ height: "100%" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    height="30%"
                  >
                    <Typography fontSize="0.9rem" fontWeight="bold">
                      {flashcard.question}
                    </Typography>
                    <Box
                      p="0.2rem"
                      px="1rem"
                      maxHeight="25px"
                      display="flex"
                      flex={1}
                      borderRadius="50px"
                      bgcolor="lightblue"
                    >
                      <Typography fontSize="0.8rem">
                        {flashcard.topic}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    height="70%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <OptionsSection
                      choice={flashcard.options.a}
                      answer={flashcard.answer}
                    />
                    <OptionsSection
                      choice={flashcard.options.b}
                      answer={flashcard.answer}
                    />
                    <OptionsSection
                      choice={flashcard.options.c}
                      answer={flashcard.answer}
                    />
                    <OptionsSection
                      choice={flashcard.options.d}
                      answer={flashcard.answer}
                    />
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
