import {
  Link as ChakraLink,
  Button,
  Stack,
  Text,
  useToast,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSolidLock } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import { validateRegister } from "../../../helpers/validation";
import Notification from "../../../components/modules/Notification";
import { FormPassword, FormText } from "../../../components/modules/Form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { optionToast } from "../../../helpers/constant";
import HeaderAuth from "../../../components/modules/HeaderAuth";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/membershipSlice";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => state.membership);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const registerForm = [
    {
      type: "text",
      name: "email",
      icon: <SiMaildotru />,
      value: user?.email,
      placeholder: "Email",
      error: errors?.email,
    },
    {
      type: "text",
      name: "first_name",
      icon: <FaRegUser />,
      value: user?.first_name,
      placeholder: "Nama depan",
      error: errors?.first_name,
    },
    {
      type: "text",
      name: "last_name",
      icon: <FaRegUser />,
      value: user?.last_name,
      placeholder: "Nama belakang",
      error: errors?.last_name,
    },
    {
      type: "password",
      name: "password",
      icon: <BiSolidLock />,
      value: user?.password,
      placeholder: "Password",
      error: errors?.password,
    },
    {
      type: "password",
      name: "confirm_password",
      icon: <BiSolidLock />,
      value: user?.confirm_password,
      placeholder: "Konfirmasi password",
      error: errors?.confirm_password,
    },
  ];

  const handleChangeForm = (e) => {
    setUser({
      ...user,
      [e?.target?.name]: e?.target?.value,
    });

    setErrors({
      ...errors,
      [e?.target?.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const dataUser = {
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        password: user?.password,
      };
      try {
        const result = await dispatch(registerUser(dataUser)).unwrap();

        toast({
          render: ({ onClose }) => (
            <Notification
              status="success"
              message={result?.message || "Register Success"}
              close={onClose}
            />
          ),
          ...optionToast,
        });
        const timeout = setTimeout(() => {
          navigate("/auth/login", { replace: true });
        }, 500);
        return () => clearTimeout(timeout);
      } catch (error) {
        toast({
          render: ({ onClose }) => (
            <Notification
              status="error"
              message={error?.message || "Register Failed"}
              close={onClose}
            />
          ),
          ...optionToast,
        });
      }
    } else {
      toast({
        render: ({ onClose }) => (
          <Notification
            status="error"
            message={"Form Validation Failed"}
            close={onClose}
          />
        ),
        ...optionToast,
      });
    }
  };

  return (
    <Box h={{ base: "auto", xl: "100vh" }} px={6} py={12}>
      <Stack
        mx="auto"
        w={{ base: "full", xl: "70%" }}
        justifyContent="center"
        alignItems="center"
        h="full"
      >
        <HeaderAuth description="Lengkapi data untuk membuat akun" />
        <Stack w="full" py={6} gap={{ base: 6, md: 8 }}>
          {registerForm?.map((form, index) => (
            <Stack key={index}>
              {form?.type === "text" ? (
                <FormText
                  key={index}
                  icon={form?.icon}
                  name={form?.name}
                  value={form?.value}
                  placeholder={form?.placeholder}
                  loading={loading}
                  error={form?.error}
                  callback={handleChangeForm}
                />
              ) : (
                <FormPassword
                  key={index}
                  icon={form?.icon}
                  name={form?.name}
                  value={form?.value}
                  placeholder={form?.placeholder}
                  loading={loading}
                  error={form?.error}
                  callback={handleChangeForm}
                />
              )}
            </Stack>
          ))}
        </Stack>
        <Button
          w="full"
          size="lg"
          bg="orangered"
          textColor="white"
          _hover={{
            bg: "orange.700",
          }}
          my={4}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Masuk
        </Button>
        <Text>
          Sudah punya akun? Login{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/auth/login"
            fontWeight={600}
            textColor="orangered"
            _hover={{
              textColor: "orange.600",
            }}
            _active={{
              textColor: "orange.700",
            }}
          >
            di sini
          </ChakraLink>
        </Text>
      </Stack>
    </Box>
  );
};

export default Register;
