import { Image } from "@chakra-ui/image";
import { AspectRatio, Box } from "@chakra-ui/layout";
import React from "react";
import { ControlPane, ControlPaneProps } from "./Controller";
import { Card, State } from "./state";

export type BoardProps = {
  board: State["board"];
  controlPaneProps: ControlPaneProps;
};

export function Board(props: BoardProps) {
  let board: (Card | null)[] = [];
  if (props.board.type !== "empty") {
    board = props.board.board;
  }

  while (board.length < 5) {
    board = board.concat(null);
  }

  return (
    <Box
      w="100%"
      px={[2, 2, 8]}
      py={[10, 12, 16]}
      borderRadius={["xl", "2xl"]}
      backgroundColor="green.900"
      boxShadow="dark-lg"
    >
      <Box d="flex">
        {board.map((card, idx) => (
          <CardSpace key={idx} card={card} />
        ))}
      </Box>
      <ControlPane {...props.controlPaneProps} />
    </Box>
  );
}

export function CardSpace({ card }: { card: Card | null }) {
  return (
    <Box
      mx={[0.5, 1, 2]}
      p={[0, 1]}
      borderWidth="1px"
      borderColor="gray.900"
      borderRadius="md"
      w="100%"
    >
      {card ? <CardContent card={card} /> : null}
    </Box>
  );
}

export function CardContent({ card }: { card: Card }) {
  const convert = (n: number) => {
    if (n === 1) return "A";
    if (n > 10) return ["J", "Q", "K"][n - 11];
    return `${n}`;
  };
  const fname = `card/${convert(card.number)}${card.suit.toUpperCase()}.jpg`;
  const rotate = card.entropy[0] * 2.8 - 1.4;
  const transX = card.entropy[1] * 8 - 4;
  return (
    <AspectRatio ratio={691 / 1056}>
      <Box
        position="relative"
        transform={["", `rotate(${rotate}deg) translateX(${transX}px)`]}
      >
        <Image
          src={fname}
          borderRadius={["md", "lg", "xl"]}
          position="absolute"
          zIndex="1"
        />
        <Box
          position="absolute"
          zIndex="2"
          w="100%"
          h="100%"
          bgGradient="linear(45deg, rgba(0,0,0,.25), rgba(0,0,0,0))"
          borderRadius={["md", "lg", "xl"]}
        />
      </Box>
    </AspectRatio>
  );
}
