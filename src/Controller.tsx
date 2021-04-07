import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Box, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import "./Controller.css";

export interface ControlPaneProps {
  isOnlyFlopsChecked: boolean;
  isLockThisFlopChecked: boolean;
  toggleOnlyFlops: () => void;
  toggleLockThisFlop: () => void;
  onClickOpenButton: () => void;
}

export function ControlPane(props: ControlPaneProps) {
  const [isActive, setIsActive] = useState(0);
  return (
    <Box w="100%" position="relative" d="flex" mt={[12, 16]}>
      <Box flexBasis={1} flexGrow={1} />
      <Box
        w={["90px", "120px"]}
        h={["90px", "120px"]}
        position="relative"
        style={{
          filter: "drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3))",
        }}
      >
        <Image
          src="/chip.png"
          className="open-button"
          onTransitionEnd={() => setIsActive(0)}
          isactive={isActive}
          position="absolute"
          w="100%"
          h="100%"
          zIndex="1"
        />
        <Box
          position="absolute"
          zIndex="2"
          w="100%"
          h="100%"
          bgGradient="linear(45deg, rgba(0,0,0,.4), rgba(0,0,0,0))"
          borderRadius="50%"
          onClick={() => {
            props.onClickOpenButton();
            setIsActive(1);
          }}
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
