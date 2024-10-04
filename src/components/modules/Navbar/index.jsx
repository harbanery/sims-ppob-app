import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ location = "" }) => {
  const navigate = useNavigate();

  const menuLists = [
    {
      name: "Top Up",
      navigation: "/top-up",
    },
    {
      name: "Transaction",
      navigation: "/transaction",
    },
    {
      name: "Akun",
      navigation: "/account",
    },
  ];

  return (
    <Box borderBottom="1px solid lightgray" w="full">
      <Flex
        py={3}
        px={2}
        mx={"auto"}
        maxW="container.xl"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavLink to={"/"} replace={true}>
          <HStack pl={2}>
            <Image w={"20px"} src="/src/assets/Logo.png" />
            <Text fontWeight={600}>SIMS PPOB</Text>
          </HStack>
        </NavLink>

        <Stack px={2} display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={<FaChevronDown />}
              variant="outline"
            />
            <MenuList>
              {menuLists?.map((menu, index) => (
                <MenuItem
                  key={index}
                  textColor={
                    location == menu?.navigation ? "orangered" : "black"
                  }
                  isDisabled={location == menu?.navigation}
                  _disabled={{
                    textColor:
                      location == menu?.navigation ? "orangered" : "black",
                  }}
                  onClick={() =>
                    navigate(menu?.navigation || "/", { replace: true })
                  }
                >
                  {menu?.name || "Invalid"}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Stack>

        <HStack display={{ base: "none", md: "block" }}>
          {menuLists?.map((menu, index) => (
            <Button
              key={index}
              variant="ghost"
              textColor={location == menu?.navigation ? "orangered" : "black"}
              isDisabled={location == menu?.navigation}
              _disabled={{
                textColor: location == menu?.navigation ? "orangered" : "black",
              }}
              onClick={() =>
                navigate(menu?.navigation || "/", { replace: true })
              }
            >
              {menu?.name || "Invalid"}
            </Button>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
