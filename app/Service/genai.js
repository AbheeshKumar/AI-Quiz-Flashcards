import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { NextResponse } from "next/server";

const cleanString = (str) => str.replace(/[^a-zA-Z0-9\s]/g, "").trim();

export const promptService = async (inputValue) => {
  const SECRET_KEY = process.env.local.NEXT_PUBLIC_GEMINI_API;

  const chat = new ChatGoogleGenerativeAI({ apiKey: SECRET_KEY });
  ``;
  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
    "You are an expert in generating educational flashcards. For the given keyword, generate a set of flashcards with a question on the front and the correct answer on the back. Each flashcard should consist of one question, three options, and the correct answer."
  );

  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(
    "Create 10 flashcards with questions and four options based on the keyword '{asked_prompt}'. Question should be unqiue and different from each other and not greater than 20 words. Options and topics should not be greater than 10 words. The format should be:\n\n" +
      "Question: [question here]\n" +
      "Topic: [topic]\n" +
      "a) [option 1]\n" +
      "b) [option 2]\n" +
      "c) [option 3]\n" +
      "d) [option 4]\n" +
      "Answer: [correct option, e.g., 'Option 1']"
  );

  const chatPrompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);

  const formattedChatPrompt = await chatPrompt.formatMessages({
    asked_prompt: inputValue,
  });

  const response = await chat.invoke(formattedChatPrompt);
  let flashcards = [];

  if (response && response.content) {
    const rawFlashcards = response.content.split("\n\n");

    flashcards = rawFlashcards.reduce((acc, flashcard, index) => {
      const questionMatch = flashcard.match(/Question:\s*(.*)/i);
      const topicMatch = flashcard.match(/Topic:\s*(.*)/i);
      const optionAMatch = flashcard.match(/a\)\s*(.*)/i);
      const optionBMatch = flashcard.match(/b\)\s*(.*)/i);
      const optionCMatch = flashcard.match(/c\)\s*(.*)/i);
      const optionDMatch = flashcard.match(/d\)\s*(.*)/i);
      let answerMatch = flashcard.match(/Answer:\s*(.*)/i);

      if (
        questionMatch &&
        topicMatch &&
        optionAMatch &&
        optionBMatch &&
        optionCMatch &&
        optionDMatch &&
        answerMatch
      ) {
        const options = ["a", "b", "c", "d"];
        options.forEach((opt) => {
          if (answerMatch[1][0] === opt) {
            answerMatch = cleanString(answerMatch[1]);
            answerMatch = answerMatch.slice(1);
          }
        });
        acc.push({
          id: index + 1,
          question: cleanString(questionMatch[1]),
          topic: cleanString(topicMatch[1]),
          options: {
            a: cleanString(optionAMatch[1]),
            b: cleanString(optionBMatch[1]),
            c: cleanString(optionCMatch[1]),
            d: cleanString(optionDMatch[1]),
          },
          answer: answerMatch?.trim() ?? answerMatch,
        });
      }

      return acc;
    }, []);
  } else {
    console.error("Invalid response structure:", response);
    flashcards = [
      {
        id: 1,
        question: "Error",
        topic: "Error",
        options: { a: "", b: "", c: "", d: "" },
        answer: "Unable to generate flashcards",
      },
    ];
  }

  return NextResponse.json(flashcards);
};
