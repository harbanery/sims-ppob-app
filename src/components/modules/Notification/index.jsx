import { Alert, CloseButton, Text } from "@chakra-ui/react";
import React from "react";

const Notification = ({ status = "info", message = "", close }) => {
  return (
    <Alert
      w="xs"
      status={status}
      rounded="md"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight={600}>{message || ""}</Text>
      <CloseButton
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        onClick={close}
      />
    </Alert>
  );
};

export default Notification;
