import { Box, Divider, Typography } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import styles from "../page.module.css";
import { useCallback, useEffect, useState } from "react";

const OptionsSection = ({
  choice,
  setchosenOptions,
  chosenOptions,
  questionId,
}) => {
  const handleSelect = () => {
    setchosenOptions({ ...chosenOptions, [questionId]: choice });
  };
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
      bgcolor={
        questionId ? (chosenOptions[questionId] === choice ? "blue" : "") : ""
      }
      overflow="auto"
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "lightblue",
        },
        "&:focus": {
          backgroundColor: "blue",
          outline: "none",
          boxShadow: "0 0 0 2px blue",
        },
      }}
      tabIndex={0}
      onClick={handleSelect}
    >
      <CircleOutlinedIcon color="primary" />
      <Typography textAlign="start" fontSize="0.9rem" mx="0.5rem">
        {choice}
      </Typography>
    </Box>
  );
};

export default function Flashcard({
  output,
  isFlipped,
  chosenOptions,
  setchosenOptions,
  setScore,
}) {
  const { id, question, options, answer, topic } = output;
  const [isTrue, setIsTrue] = useState(false);
  useEffect(() => {
    for (const [key, value] of Object.entries(chosenOptions)) {
      if (value.trim() == answer.trim()) {
        setScore((prev) => prev + 1);
        setIsTrue(true);
      }
    }
  }, [isFlipped]);
  return (
    <Box
      key={id}
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.1)"
      borderRadius="0.5rem"
      mt="2rem"
      width="300px"
      height="400px"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        height="30%"
        fontSize="0.9rem"
        fontWeight="bold"
        p="1rem"
      >
        {question}
        <Box
          p="0.2rem"
          px="1rem"
          maxHeight="24px"
          display="flex"
          flex="1"
          fontSize="0.8rem"
          borderRadius="50px"
          bgcolor="lightblue"
        >
          {topic}
        </Box>
      </Box>
      <Divider />
      <div className={styles.flipCard}>
        <div
          className={`${styles.flipCardInner} ${
            isFlipped ? styles.flipCardTrue : ""
          }`}
        >
          <div className={styles.flipCardFront}>
            <OptionsSection
              chosenOptions={chosenOptions}
              setchosenOptions={setchosenOptions}
              choice={options.a}
              questionId={id}
            />
            <OptionsSection
              chosenOptions={chosenOptions}
              setchosenOptions={setchosenOptions}
              choice={options.b}
              questionId={id}
            />
            <OptionsSection
              chosenOptions={chosenOptions}
              setchosenOptions={setchosenOptions}
              choice={options.c}
              questionId={id}
            />
            <OptionsSection
              chosenOptions={chosenOptions}
              setchosenOptions={setchosenOptions}
              choice={options.d}
              questionId={id}
            />
          </div>
          <div
            className={`${styles.flipCardBack} ${
              isTrue ? styles.flipCardBackCorrect : styles.flipCardBackIncorrect
            }`}
          >
            <Typography fontSize="1.2rem" fontWeight="bold">
              {answer}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
}
