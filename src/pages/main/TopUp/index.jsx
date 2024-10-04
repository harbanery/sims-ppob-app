import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdOutlineMoney } from "react-icons/md";
import { formatCurrency } from "../../../helpers/currency";
import { FormNominal } from "../../../components/modules/Form";
import { validateTopUp } from "../../../helpers/validation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { optionToast } from "../../../helpers/constant";
import Notification from "../../../components/modules/Notification";
import { topUp } from "../../../features/transactionSlice";
import NotificationDialog from "../../../components/modules/NotificationDialog";

const TopUp = () => {
  const recommended_nominals = [
    "10000",
    "20000",
    "50000",
    "100000",
    "250000",
    "500000",
  ];

  const [nominal, setNominal] = useState("");
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChangeNominal = (e) => {
    changeNominal(e.target.value);
  };

  const changeNominal = (nominal_value) => {
    setNominal(nominal_value);

    setError("");
  };

  const handleTopUp = async (e) => {
    e.preventDefault();
    onClose();

    const { value, error } = validateTopUp(nominal);
    setError(error);

    if (!error) {
      const dataBalance = {
        top_up_amount: value,
      };

      try {
        await dispatch(topUp(dataBalance)).unwrap();

        toast({
          render: ({ onClose }) => (
            <NotificationDialog
              status="success"
              leastDestructiveRef={cancelRef}
              isOpen={true}
              close={onClose}
              callbackResponse={() => {
                onClose();
              }}
            >
              <VStack py={3}>
                <Text fontSize="xl" lineHeight={4}>
                  Top Up sebesar
                </Text>
                <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
                  {`Rp${formatCurrency(nominal)}`}
                </Text>
                <Text fontSize="xl" lineHeight={4}>
                  Berhasil
                </Text>
              </VStack>
            </NotificationDialog>
          ),
          ...optionToast,
        });
        const timeout = setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
        return () => clearTimeout(timeout);
      } catch (error) {
        toast({
          render: ({ onClose }) => (
            <NotificationDialog
              status="error"
              leastDestructiveRef={cancelRef}
              isOpen={true}
              close={onClose}
              callbackResponse={() => {
                onClose();
              }}
            >
              <VStack py={3}>
                <Text fontSize="xl" lineHeight={4}>
                  Top Up sebesar
                </Text>
                <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
                  {`Rp${formatCurrency(nominal)}`}
                </Text>
                <Text fontSize="xl" lineHeight={4}>
                  Gagal
                </Text>
              </VStack>
            </NotificationDialog>
          ),
          ...optionToast,
        });
        navigate("/", { replace: true });
      }
    } else {
      toast({
        render: ({ onClose }) => (
          <Notification
            status="error"
            message={error || "Form Validation Failed"}
            close={onClose}
          />
        ),
        ...optionToast,
      });
    }
  };

  return (
    <Stack py={8}>
      <VStack py={10} alignItems="flex-start">
        <Text fontSize="xl" fontWeight={400} lineHeight={0.5}>
          Silahkan masukan
        </Text>
        <Text fontSize="4xl" fontWeight={600}>
          Nominal Top Up
        </Text>
      </VStack>
      <Flex
        justify="space-between"
        direction={{ base: "column-reverse", lg: "row" }}
        gap={{ base: 4, lg: 8 }}
      >
        <Box
          w={{ base: "full", lg: "55%", xl: "65%" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={{ base: 4, lg: 8 }}
        >
          <FormNominal
            icon={<MdOutlineMoney />}
            name="nominal"
            value={nominal}
            callback={handleChangeNominal}
            placeholder="masukan nominal Top Up"
            error={error}
          />
          <Button
            w="full"
            size="lg"
            bg="orangered"
            textColor="white"
            _hover={{
              bg: "orange.700",
            }}
            onClick={onOpen}
            disabled={nominal ? false : true}
          >
            Top Up
          </Button>
        </Box>
        <Box w={{ base: "full", lg: "45%", xl: "35%" }}>
          <Flex
            justifyContent="space-between"
            wrap={"wrap"}
            gap={{ base: 4, lg: 8 }}
          >
            {recommended_nominals?.map((nominal_value, index) => (
              <Button
                key={index}
                variant="outline"
                flex="1 1 25%"
                size="lg"
                fontWeight={500}
                fontSize="medium"
                borderColor="gray.300"
                onClick={() => changeNominal(nominal_value)}
              >
                {`Rp${formatCurrency(nominal_value) || 0}`}
              </Button>
            ))}
          </Flex>
        </Box>
      </Flex>
      <NotificationDialog
        status="question"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        close={onClose}
        callbackQuestion={handleTopUp}
        answerYesQuestion="Ya, lanjutkan Top Up"
      >
        <VStack py={3}>
          <Text fontSize="xl" lineHeight={4}>
            Anda yakin untuk Top Up sebesar
          </Text>
          <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
            {`Rp${formatCurrency(nominal)}`}
          </Text>
        </VStack>
      </NotificationDialog>
    </Stack>
  );
};

export default TopUp;
