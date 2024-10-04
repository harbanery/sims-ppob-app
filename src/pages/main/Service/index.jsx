import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdOutlineMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../../helpers/currency";
import { useDispatch, useSelector } from "react-redux";
import { FormText } from "../../../components/modules/Form";
import { createTransaction } from "../../../features/transactionSlice";
import { optionToast } from "../../../helpers/constant";
import NotificationDialog from "../../../components/modules/NotificationDialog";

const Service = () => {
  const { code } = useParams();
  const { services } = useSelector((state) => state.information);

  const service_detail = services?.find(
    (service) => service?.service_code === code
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handlePayTransaction = async (e) => {
    e.preventDefault();
    onClose();

    const dataTransaction = {
      service_code: service_detail?.service_code,
    };

    try {
      await dispatch(createTransaction(dataTransaction)).unwrap();

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
            <VStack py={3} textAlign="center">
              <Text fontSize="xl" lineHeight={4}>
                {`Pembayaran ${
                  service_detail?.service_name?.toLowerCase() || ""
                } sebesar`}
              </Text>
              <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
                {`Rp${formatCurrency(service_detail?.service_tariff)}`}
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
            <VStack py={3} textAlign="center">
              <Text fontSize="xl" lineHeight={4}>
                {`Pembayaran ${
                  service_detail?.service_name?.toLowerCase() || ""
                } sebesar`}
              </Text>
              <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
                {`Rp${formatCurrency(service_detail?.service_tariff)}`}
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
  };

  return (
    <Stack py={8}>
      <VStack py={10} alignItems="flex-start" fontSize="xl">
        <Text fontWeight={500}>Pembayaran</Text>
        <Flex gap={2} alignItems="center">
          <Stack maxW="35px">
            <Image src={service_detail?.service_icon || ""} />
          </Stack>
          <Text fontWeight={600}>{service_detail?.service_name || ""}</Text>
        </Flex>
      </VStack>
      <Stack my={2}>
        <FormText
          icon={<MdOutlineMoney />}
          value={formatCurrency(service_detail?.service_tariff)}
          readOnly={true}
        />
      </Stack>
      <Button
        my={2}
        bg="orangered"
        color="white"
        size="lg"
        _hover={{ bg: "orange.600" }}
        _active={{ bg: "orange.700" }}
        onClick={onOpen}
      >
        Bayar
      </Button>
      <NotificationDialog
        status="question"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        close={onClose}
        callbackQuestion={handlePayTransaction}
        answerYesQuestion="Ya, lanjutkan Bayar"
      >
        <VStack py={3} textAlign="center">
          <Text fontSize="xl" lineHeight={4}>
            {`Bayar ${
              service_detail?.service_name?.toLowerCase() || ""
            } senilai`}
          </Text>
          <Text fontWeight={700} fontSize="3xl" lineHeight={10}>
            {`Rp${formatCurrency(service_detail?.service_tariff)}`}
          </Text>
        </VStack>
      </NotificationDialog>
    </Stack>
  );
};

export default Service;
