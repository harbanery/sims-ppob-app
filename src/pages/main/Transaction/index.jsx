import {
  Box,
  Button,
  Collapse,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { formatCurrency } from "../../../helpers/currency";
import { formatDate, formatTime } from "../../../helpers/date";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOffset,
  getTransaction,
} from "../../../features/transactionSlice";

const Transaction = () => {
  const dispatch = useDispatch();
  const { transactions, offset, limit, next, loading } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getTransaction({ offset: offset, limit: limit }));
  }, [offset, limit]);

  const handleShowMore = () => {
    dispatch(changeOffset());
  };

  const CardTransaction = ({ record = {} }) => {
    return (
      <Box
        key={record?.invoice_number}
        w="full"
        px={8}
        py={4}
        display="flex"
        justifyContent="space-between"
        border="1px solid lightgray"
        rounded={10}
      >
        <Stack>
          <HStack
            fontWeight={700}
            textColor={
              record?.transaction_type === "TOPUP" ? "green.400" : "orangered"
            }
            fontSize="2xl"
            alignItems="center"
          >
            <Text
              dangerouslySetInnerHTML={{
                __html:
                  record?.transaction_type === "TOPUP" ? "&plus;" : "&minus;",
              }}
            />
            <Text>{`Rp.${formatCurrency(record?.total_amount) || 0}`}</Text>
          </HStack>
          <HStack fontSize="smaller" textColor="lightgray" gap={3}>
            <Text>{formatDate(record?.created_on)}</Text>
            <Text>{formatTime(record?.created_on)}</Text>
          </HStack>
        </Stack>
        <Text py={4} fontWeight={600} fontSize="smaller">
          {record?.description || "Transaksi yang Tidak Diketahui"}
        </Text>
      </Box>
    );
  };

  return (
    <Stack py={8}>
      <Text py={4} fontWeight={600} fontSize="xl">
        Semua Transaksi
      </Text>
      <VStack gap={8}>
        {transactions?.map((record, index) => (
          <VStack w="full" gap={8} key={index}>
            {record?.map((transaction, index) => (
              <CardTransaction key={index} record={transaction} />
            ))}
            {loading && transactions?.[transactions?.length - 1] === record && (
              <Skeleton w="full" height="98px" rounded={10} />
            )}
          </VStack>
        ))}
      </VStack>
      <VStack>
        <Collapse in={next && !loading} animateOpacity>
          <Button
            variant="ghost"
            my={4}
            size="lg"
            textColor="orangered"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </Collapse>
      </VStack>
    </Stack>
  );
};

export default Transaction;
