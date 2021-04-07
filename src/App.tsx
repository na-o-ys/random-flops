import { Box, ChakraProvider, Icon, Link, Text } from "@chakra-ui/react";
import React, { useReducer } from "react";
import { FaGithub } from "react-icons/fa";
import { reducer } from "./action";
import "./App.css";
import { Board } from "./Board";
import { Controller, ControllerProps, ControlPaneProps } from "./Controller";
import { getInitialState } from "./state";

function App() {
  // const controllerProps: ControllerProps = {
  //   onClickRandomizeFlop() {
  //     dispatch({ type: "randomize_flop" });
  //   },
  //   onClickRandomizeTurn() {
  //     dispatch({ type: "randomize_turn" });
  //   },
  //   onClickRandomizeRiver() {
  //     dispatch({ type: "randomize_river" });
  //   },
  //   onClickClear() {
  //     dispatch({ type: "clear" });
  //   },
  // };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  const controlPaneProps: ControlPaneProps = {
    isOnlyFlopsChecked: state.onlyFlops,
    isLockThisFlopChecked: state.lockThisFlop,
    toggleOnlyFlops() {
      dispatch({ type: "toggle_only_flops" });
    },
    toggleLockThisFlop() {
      dispatch({ type: "toggle_lock_this_flop" });
    },
    onClickOpenButton() {
      dispatch({ type: "open" });
    },
  };
  const innerHeight = `${window.innerHeight}px`;

  return (
    <ChakraProvider>
      <Box
        mx={[2, 3, "auto"]}
        h={[innerHeight, innerHeight, "100vh"]}
        maxW="860"
        d="flex"
        flexDir="column"
        justifyContent="center"
        color="gray.600"
      >
        <Box flexGrow={1} />
        <Board board={state.board} controlPaneProps={controlPaneProps} />
        {/* <Box w="100%" d="flex" justifyContent="center">
          <Controller {...controllerProps} />
        </Box> */}
        <Box flexGrow={1.3} />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export function Footer() {
  return (
    <Box mb={[2, 2, 4]} w="100%" d="flex" justifyContent="center">
      <Text
        fontSize={["xs", "xs", "sm"]}
        color="gray.400"
        fontWeight="semibold"
      >
        Random Flops
      </Text>
      <Text fontSize={["xs", "xs", "sm"]} color="gray.400">
        ,
      </Text>

      <Link href="https://github.com/na-o-ys/random-flops" isExternal>
        <Box d="flex">
          <Text fontSize={["xs", "xs", "sm"]} color="gray.400" mx={["1", "2"]}>
            2021-
          </Text>
          <Icon
            as={FaGithub}
            w={["15px", "15px", "17px"]}
            h={["15px", "15px", "17px"]}
            lineHeight={["18px", "18px", "21px"]}
            color="gray.400"
            display="inline"
          />
        </Box>
      </Link>
    </Box>
  );
}

export default App;
