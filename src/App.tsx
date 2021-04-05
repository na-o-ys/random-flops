import { Box, ChakraProvider } from "@chakra-ui/react";
import React, { useReducer } from "react";
import { reducer } from "./action";
import "./App.css";
import { Board } from "./Board";
import { Controller, ControllerProps } from "./Controller";
import { getInitialState } from "./state";

function App() {
  const controllerProps: ControllerProps = {
    onClickRandomizeFlop() {
      dispatch({ type: "randomize_flop" });
    },
    onClickRandomizeTurn() {
      dispatch({ type: "randomize_turn" });
    },
    onClickRandomizeRiver() {
      dispatch({ type: "randomize_river" });
    },
    onClickClear() {
      dispatch({ type: "clear" });
    },
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <ChakraProvider>
      <Box
        m={[2, 3, 4]}
        h="100vh"
        d="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Box flexGrow={1} />
        <Board board={state.board} />
        <Box w="100%" d="flex" justifyContent="center">
          <Controller {...controllerProps} />
        </Box>
        <Box flexGrow={1.5} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
