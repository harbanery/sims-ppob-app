import { Container, Stack } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../../components/modules/Navbar";
import HeaderSection from "../../../components/modules/HeaderSection";
import { useSelector } from "react-redux";

const LayoutMain = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.membership);
  const { balance } = useSelector((state) => state.transaction);

  return (
    <Stack fontFamily="CustomSansSerif">
      <Navbar location={pathname} />
      <Container maxW="container.xl">
        <HeaderSection account={user} balance={balance} location={pathname} />
        <Outlet />
      </Container>
    </Stack>
  );
};

export default LayoutMain;
