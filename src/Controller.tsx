import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Box, VStack } from "@chakra-ui/layout";
import React from "react";

export interface ControllerProps {
  onClickRandomizeFlop: () => void;
  onClickRandomizeTurn: () => void;
  onClickRandomizeRiver: () => void;
  onClickClear: () => void;
}

export function Controller(props: ControllerProps) {
  return (
    <Box mt={[8, 10, 14]}>
      <Button
        size="lg"
        color="orange.400"
        borderColor="orange.400"
        variant="outline"
        mx={[2, 4]}
        onClick={props.onClickRandomizeFlop}
      >
        Flop
      </Button>
      <Button
        size="lg"
        color="orange.400"
        borderColor="orange.400"
        variant="outline"
        mx={[2, 4]}
        onClick={props.onClickRandomizeTurn}
      >
        Turn
      </Button>
      <Button
        size="lg"
        color="orange.400"
        borderColor="orange.400"
        variant="outline"
        mx={[2, 4]}
        onClick={props.onClickRandomizeRiver}
      >
        River
      </Button>
    </Box>
  );
}

export interface ControlPaneProps {
  isOnlyFlopsChecked: boolean;
  isLockThisFlopChecked: boolean;
  toggleOnlyFlops: () => void;
  toggleLockThisFlop: () => void;
  onClickOpenButton: () => void;
}

export function ControlPane(props: ControlPaneProps) {
  return (
    <Box w="100%" position="relative" d="flex" mt={[16, 16]}>
      <Box flexBasis={1} flexGrow={1} />
      <Box>
        <Image
          src="/chip.png"
          w={["90px", "120px"]}
          style={{ filter: "drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.4))" }}
          onClick={props.onClickOpenButton}
        />
      </Box>
      <Box
        flexBasis={1}
        flexGrow={1}
        d="flex"
        flexDir="column"
        justifyContent="flex-end"
        color="gray.300"
      >
        <VStack ml={[6, 10, 16]} align="flex-start">
          <Checkbox
            onChange={props.toggleOnlyFlops}
            isChecked={props.isOnlyFlopsChecked}
            isDisabled={props.isLockThisFlopChecked}
            size="sm"
          >
            Only flops
          </Checkbox>
          <Checkbox
            onChange={props.toggleLockThisFlop}
            isChecked={props.isLockThisFlopChecked}
            size="sm"
          >
            Fix the flop
          </Checkbox>
        </VStack>
      </Box>
    </Box>
  );
}
