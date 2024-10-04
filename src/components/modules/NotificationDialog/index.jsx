import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoMdCheckmark, IoMdClose, IoMdWallet } from "react-icons/io";

const NotificationDialog = ({
  status = "question",
  leastDestructiveRef,
  isOpen = false,
  close,
  callbackQuestion,
  answerYesQuestion = "",
  callbackResponse,
  children,
}) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={leastDestructiveRef}
      onClose={close}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent fontFamily="CustomSansSerif" rounded={15}>
        <AlertDialogBody>
          <VStack py={5}>
            <Stack
              w="70px"
              my={4}
              p={4}
              bg={
                status == "success"
                  ? "green.400"
                  : status == "error"
                  ? "red.400"
                  : "orangered"
              }
              rounded="full"
            >
              {status == "question" && <IoMdWallet size="100%" color="white" />}
              {status == "success" && (
                <IoMdCheckmark size="100%" color="white" />
              )}
              {status == "error" && <IoMdClose size="100%" color="white" />}
            </Stack>
            {children}
            {callbackQuestion && status == "question" && (
              <VStack>
                <Button
                  w="full"
                  variant="ghost"
                  textColor="orangered"
                  onClick={callbackQuestion}
                >
                  {answerYesQuestion || "Yes"}
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  textColor="gray.400"
                  ref={leastDestructiveRef}
                  onClick={close}
                >
                  Batalkan
                </Button>
              </VStack>
            )}
            {callbackResponse && status != "question" && (
              <VStack>
                <Button
                  w="full"
                  variant="ghost"
                  textColor="orangered"
                  ref={leastDestructiveRef}
                  onClick={callbackResponse}
                >
                  Kembali ke beranda
                </Button>
              </VStack>
            )}
          </VStack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotificationDialog;
