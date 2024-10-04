import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import DashboardAuth from "../../../assets/Illustrasi Login.png";

const LayoutAuth = () => {
  return (
    <Stack fontFamily="CustomSansSerif">
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Box
          w="full"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flexShrink={2}
        >
          <Outlet />
        </Box>
        <Box
          display={{ base: "none", md: "inline-block" }}
          w="full"
          maxW={{ base: "45%", lg: "55%" }}
          flexShrink={1}
          h="100vh"
          bg="#fff1f0"
        >
          <Image
            w="full"
            h="full"
            draggable={false}
            src={DashboardAuth}
            objectFit={{ base: "cover" }}
            objectPosition="right center"
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default LayoutAuth;
