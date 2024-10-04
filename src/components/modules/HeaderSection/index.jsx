import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { formatCurrency } from "../../../helpers/currency";
import { HiOutlineEye } from "react-icons/hi";
import ProfilePhoto from "../../../assets/Profile Photo.png";

const HeaderSection = ({ account = {}, balance = 0, location = "" }) => {
  const allowPathname = ["/", "/top-up", "/transaction", "/service"];

  if (
    !allowPathname.find((path) => location.startsWith(path)) ||
    location.startsWith("/account")
  ) {
    return null;
  }

  return (
    <Flex
      w="full"
      direction={{ base: "column", md: "row" }}
      pt={8}
      gap={{ base: 4, md: 8 }}
      justifyContent="space-between"
    >
      <ProfileSection account={account} />
      <SaldoSection balance={balance} />
    </Flex>
  );
};

const ProfileSection = ({ account = {} }) => {
  return (
    <Box w={{ base: "full", md: "40%" }}>
      <Avatar
        src={
          account?.profile_image &&
          account?.profile_image !=
            "https://minio.nutech-integrasi.com/take-home-test/null"
            ? account?.profile_image
            : ProfilePhoto
        }
        border="1px solid lightgray"
        size="lg"
        mb={3}
      />
      <Text fontWeight={400} fontSize="xl">
        Selamat datang,
      </Text>
      <Text fontWeight={600} fontSize="4xl">
        {`${account?.first_name || ""} ${account?.last_name || "Anda"}`}
      </Text>
    </Box>
  );
};

const SaldoSection = ({ balance = 0 }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      w={{ base: "full", md: "60%" }}
      bg="orangered"
      textColor="white"
      p={7}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      rounded={15}
    >
      <Text>Saldo anda</Text>
      <HStack gap={2} fontWeight={600} fontSize="3xl">
        <Text>Rp</Text>
        {isOpen ? (
          <Text>{formatCurrency(balance) || 0}</Text>
        ) : (
          <Text>&bull;&bull;&bull;&bull;&bull;&bull;</Text>
        )}
      </HStack>
      <HStack cursor="pointer" userSelect="none" onClick={onToggle}>
        {isOpen ? (
          <Text fontSize="small">Tutup Saldo</Text>
        ) : (
          <Text fontSize="small">Lihat Saldo</Text>
        )}
        <HiOutlineEye />
      </HStack>
    </Box>
  );
};

export default HeaderSection;
