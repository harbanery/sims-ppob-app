import {
  Link as ChakraLink,
  Button,
  Stack,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSolidLock } from "react-icons/bi";
import { SiMaildotru } from "react-icons/si";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { FormPassword, FormText } from "../../../components/modules/Form";
import { optionToast } from "../../../helpers/constant";
import Notification from "../../../components/modules/Notification";
import { validateLogin } from "../../../helpers/validation";
import HeaderAuth from "../../../components/modules/HeaderAuth";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/membershipSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => state.membership);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const loginForm = [
    {
      type: "text",
      name: "email",
      icon: <SiMaildotru />,
      value: user?.email,
      placeholer: "masukkan email anda",
      error: errors?.email,
    },
    {
      type: "password",
      name: "password",
      icon: <BiSolidLock />,
      value: user?.password,
      placeholer: "masukkan password anda",
      error: errors?.password,
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

    const validationErrors = validateLogin(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await dispatch(loginUser(user)).unwrap();

        toast({
          render: ({ onClose }) => (
            <Notification
              status="success"
              message={result?.message || "Login Success"}
              close={onClose}
            />
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
            <Notification
              status="error"
              message={error?.message || "Login Failed"}
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
    <Box h={{ base: "100vh", md: "100vh" }} px={6} py={12}>
      <Stack
        mx="auto"
        w={{ base: "full", xl: "70%" }}
        justifyContent="center"
        alignItems="center"
        h="full"
      >
        <HeaderAuth description="Masuk atau buat akun untuk memulai" />
        <Stack w="full" py={6} gap={8}>
          {loginForm?.map((form, index) => (
            <Stack key={index}>
              {form?.type === "text" ? (
                <FormText
                  key={index}
                  icon={form?.icon}
                  name={form?.name}
                  value={form?.value}
                  placeholder={form?.placeholer}
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
                  placeholder={form?.placeholer}
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
          Belum punya akun? Registrasi{" "}
          <ChakraLink
            as={ReactRouterLink}
            to="/auth/register"
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

export default Login;
