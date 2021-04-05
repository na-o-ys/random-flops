import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";

export interface ControllerProps {
  onClickRandomizeFlop: () => void;
  onClickRandomizeTurn: () => void;
  onClickRandomizeRiver: () => void;
  onClickClear: () => void;
}

export function Controller(props: ControllerProps) {
  return (
    <Box mt={[8, 12]}>
      <Button
        size="lg"
        colorScheme="blackAlpha"
        variant="outline"
        mx={[2]}
        onClick={props.onClickRandomizeFlop}
      >
        Flop
      </Button>
      <Button
        size="lg"
        colorScheme="blackAlpha"
        variant="outline"
        mx={[2]}
        onClick={props.onClickRandomizeTurn}
      >
        Turn
      </Button>
      <Button
        size="lg"
        colorScheme="blackAlpha"
        variant="outline"
        mx={[2]}
        onClick={props.onClickRandomizeRiver}
      >
        River
      </Button>
    </Box>
  );
}
