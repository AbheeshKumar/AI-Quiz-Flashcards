"use client";

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Navbar } from "../Components/navbar";
import AdbIcon from "@mui/icons-material/Adb";
import { db } from "../../firebase";
import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import styles from "../page.module.css";
import Flashcard from "../Components/flashcard";
import { LoadingButton } from "@mui/lab";
import pdfToText from "react-pdftotext";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { promptService } from "../Service/genai";

export default function Home() {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenOptions, setchosenOptions] = useState({});
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchPrompt = async () => {
    setOutput([]);
    setScore(0);
    setIsFlipped(false);
    setIsloading(true);
    const answer = await promptService(input);
    const answer_json = await answer.json();
    setOutput(answer_json);
    setIsloading(false);
  };

  const extractText = (event) => {
    const file = event.target.files[0];
    pdfToText(file).then((text) => {
      setInput(text);
    });
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please Enter your name");
      return;
    }
    const total_score = output.length;
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard Collection with the same name already exists");
      } else {
        collections.push({ name, score, total_score });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name, score, total_score }] });
    }

    const colRef = collection(userDocRef, name);
    output.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      pb="2rem"
      bgcolor="whitesmoke"
      width="100vw"
      minHeight="100vh"
    >
      <Navbar />
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="70%"
          alignItems="center"
          gap="2rem"
          my="2rem"
        >
          <textarea
            onChange={(e) => setInput(e.target.value)}
            className={styles.textarea}
            value={input}
            rows={15}
          />
          {/* <InputLabel>Number of Questions</InputLabel> */}
          {/* <Select value={questions} onChange={handleSelectChange}>
            <MenuItem>5</MenuItem>
            <MenuItem>10</MenuItem>
            <MenuItem>15</MenuItem>
            <MenuItem>20</MenuItem>
          </Select> */}
          {isLoading ? (
            <LoadingButton loading variant="contained">
              Submit
            </LoadingButton>
          ) : (
            <Button onClick={fetchPrompt} size="large" variant="contained">
              Generate
            </Button>
          )}
          <input type="file" accept="/pdf" onChange={extractText} />
          {isLoading && <CircularProgress />}
        </Box>

        {output.length > 0 ? (
          <>
            <Box
              width="200px"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              border="1px solid black"
              borderRadius="10px"
            >
              <Typography fontSize="1.2rem">Total Score:</Typography>
              <Typography fontSize="1.5rem">
                {score}/{output.length}
              </Typography>
            </Box>
            <Grid
              justifyContent="center"
              alignItems="center"
              container
              spacing={8}
            >
              {output?.map((out) => (
                <Grid key={out.index} item>
                  <Flashcard
                    chosenOptions={chosenOptions}
                    setchosenOptions={setchosenOptions}
                    isFlipped={isFlipped}
                    output={out}
                    setScore={setScore}
                  />
                </Grid>
              ))}
            </Grid>
            {isFlipped ? (
              ""
            ) : (
              <>
                <Button
                  onClick={() => setIsFlipped(true)}
                  size="large"
                  variant="contained"
                >
                  Submit Quiz
                </Button>
              </>
            )}
            <Button onClick={handleOpen}>Save Quiz</Button>
          </>
        ) : (
          ""
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Fill the following</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={saveFlashCards}>Save Flashcards</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
}
