import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const FormText = ({
  label = "",
  icon,
  name = "",
  value = "",
  placeholder = "",
  loading = false,
  readOnly = false,
  error = "",
  callback,
}) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Tooltip
        hasArrow
        label={error || ""}
        bg="red"
        placement="top-start"
        rounded="5px"
        isDisabled={!error ? true : false}
      >
        <InputGroup>
          {icon && (
            <InputLeftElement
              h="full"
              pointerEvents="none"
              textColor={!value ? "gray.300" : "black"}
              _groupFocus={{
                textColor: "orangered",
              }}
            >
              {icon}
            </InputLeftElement>
          )}
          <Input
            type="text"
            name={name}
            value={value}
            size="lg"
            fontWeight={600}
            textColor="black"
            fontSize="md"
            borderColor="gray.300"
            isInvalid={error ? true : false}
            isDisabled={loading}
            isReadOnly={readOnly}
            _focus={{
              borderColor: "orangered",
              boxShadow: "0 0 0 1px orangered",
            }}
            placeholder={placeholder}
            _placeholder={{ color: "lightgray" }}
            onChange={callback}
          />
        </InputGroup>
      </Tooltip>
    </FormControl>
  );
};

export const FormPassword = ({
  label = "",
  icon,
  name = "",
  value = "",
  placeholder = "",
  loading = false,
  error = "",
  callback,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Tooltip
        hasArrow
        label={error || ""}
        bg="red"
        placement="top-start"
        rounded="5px"
        isDisabled={!error ? true : false}
      >
        <InputGroup>
          {icon && (
            <InputLeftElement
              h="full"
              pointerEvents="none"
              textColor={!value ? "gray.300" : "black"}
              _groupFocus={{
                textColor: "orangered",
              }}
            >
              {icon}
            </InputLeftElement>
          )}
          <Input
            type={!isOpen ? "password" : "text"}
            name={name || "password"}
            value={value}
            size="lg"
            fontWeight={600}
            textColor="black"
            fontSize="md"
            borderColor="gray.300"
            isDisabled={loading}
            isInvalid={error ? true : false}
            _focus={{
              borderColor: "orangered",
              boxShadow: "0 0 0 1px orangered",
            }}
            placeholder={placeholder}
            _placeholder={{ color: "lightgray" }}
            onChange={callback}
          />
          <InputRightElement
            h="full"
            textColor="gray.300"
            _groupFocus={{
              textColor: "orangered",
            }}
            _hover={{
              textColor: "black",
            }}
            userSelect="none"
          >
            {!isOpen ? (
              <HiOutlineEye onClick={onToggle} cursor="pointer" />
            ) : (
              <HiOutlineEyeOff onClick={onToggle} cursor="pointer" />
            )}
          </InputRightElement>
        </InputGroup>
      </Tooltip>
    </FormControl>
  );
};

export const FormNominal = ({
  icon,
  name = "",
  value = "",
  placeholder = "",
  loading = false,
  readOnly = false,
  error = "",
  callback,
}) => {
  return (
    <FormControl>
      <Tooltip
        hasArrow
        label={error || ""}
        bg="red"
        placement="top-start"
        rounded="5px"
        isDisabled={!error ? true : false}
      >
        <InputGroup>
          {icon && (
            <InputLeftElement
              h="full"
              pointerEvents="none"
              textColor={!value ? "gray.300" : "black"}
              _groupFocus={{
                textColor: "orangered",
              }}
            >
              {icon}
            </InputLeftElement>
          )}
          <Input
            type="text"
            inputMode="numeric"
            pattern="^[0-9]*$"
            autoComplete="transaction-amount"
            name={name}
            value={value}
            size="lg"
            fontWeight={600}
            textColor="black"
            fontSize="md"
            borderColor="gray.300"
            isInvalid={error ? true : false}
            isDisabled={loading}
            isReadOnly={readOnly}
            _focus={{
              borderColor: "orangered",
              boxShadow: "0 0 0 1px orangered",
            }}
            placeholder={placeholder}
            _placeholder={{ color: "lightgray" }}
            onChange={callback}
          />
        </InputGroup>
      </Tooltip>
    </FormControl>
  );
};
