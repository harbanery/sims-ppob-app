import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

const HeaderAuth = ({ description = "" }) => {
  return (
    <>
      <HStack>
        <Image w={"30px"} src="/src/assets/Logo.png" />
        <Text fontWeight={600} fontSize="2xl">
          SIMS PPOB
        </Text>
      </HStack>
      <Text
        w={{ base: "full", lg: "80%" }}
        my={4}
        fontWeight={600}
        fontSize={{ base: "2xl", md: "2xl", xl: "4xl" }}
        textAlign="center"
      >
        {description || ""}
      </Text>
    </>
  );
};

export default HeaderAuth;
