import {
  Avatar,
  AvatarBadge,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { FormText } from "../../../components/modules/Form";
import { useNavigate } from "react-router-dom";
import { validateProfile } from "../../../helpers/validation";
import Notification from "../../../components/modules/Notification";
import { optionToast } from "../../../helpers/constant";
import {
  logout,
  updateImageProfile,
  updateProfile,
} from "../../../features/membershipSlice";

const Account = () => {
  const { user, loading } = useSelector((state) => state.membership);

  const [account, setAccount] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
  });
  const [errors, setErrors] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const accountForms = [
    {
      type: "email",
      label: "Email",
      icon: <SiMaildotru size="14px" />,
      value: user?.email,
      placeholder: "user@email.com",
      readOnly: true,
    },
    {
      type: "text",
      label: "Nama Depan",
      icon: <FaRegUser size="14px" />,
      name: "first_name",
      value: account?.first_name,
      placeholder: "Nama depan",
      readOnly: !isOpen ? true : false,
      error: errors?.first_name,
    },
    {
      type: "text",
      label: "Nama Belakang",
      icon: <FaRegUser size="14px" />,
      name: "last_name",
      value: account?.last_name,
      placeholder: "Nama belakang",
      readOnly: !isOpen ? true : false,
      error: errors?.last_name,
    },
  ];

  const handleChangeAccount = (e) => {
    setAccount({
      ...account,
      [e?.target?.name]: e?.target?.value,
    });

    setErrors({
      ...errors,
      [e?.target?.name]: "",
    });
  };

  const handleEditImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(file?.type)) {
      toast({
        render: ({ onClose }) => (
          <Notification
            status="error"
            message={"Foto harus berformat jpg atau png"}
            close={onClose}
          />
        ),
        ...optionToast,
      });
    } else if (file?.size > 100000) {
      toast({
        render: ({ onClose }) => (
          <Notification
            status="error"
            message={"Ukuran foto melebihi maksimum dari 100 kb"}
            close={onClose}
          />
        ),
        ...optionToast,
      });
    } else {
      try {
        const result = await dispatch(updateImageProfile(file)).unwrap();

        toast({
          render: ({ onClose }) => (
            <Notification
              status="success"
              message={result?.message || "Update Profile Success"}
              close={onClose}
            />
          ),
          ...optionToast,
        });
      } catch (error) {
        toast({
          render: ({ onClose }) => (
            <Notification
              status="error"
              message={error?.message || "Update Profile Failed"}
              close={onClose}
            />
          ),
          ...optionToast,
        });
      }
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfile(account);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await dispatch(updateProfile(account)).unwrap();

        toast({
          render: ({ onClose }) => (
            <Notification
              status="success"
              message={result?.message || "Update Profile Success"}
              close={onClose}
            />
          ),
          ...optionToast,
        });
        onClose();
      } catch (error) {
        toast({
          render: ({ onClose }) => (
            <Notification
              status="error"
              message={error?.message || "Update Profile Failed"}
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

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    navigate("/auth/login", { replace: true });
  };

  return (
    <Stack
      w={{ base: "container", md: "container.sm", lg: "container.md" }}
      mx="auto"
      py={8}
    >
      <Stack alignItems="center" py={4}>
        <FormControl>
          <FormLabel textAlign="center" pointerEvents="none">
            <Avatar
              src={
                user?.profile_image &&
                user?.profile_image !=
                  "https://minio.nutech-integrasi.com/take-home-test/null"
                  ? user?.profile_image
                  : "/src/assets/Profile Photo.png"
              }
              size="2xl"
              cursor="pointer"
              pointerEvents="auto"
            >
              <AvatarBadge
                border="1px solid lightgray"
                boxSize="0.6em"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                right={1}
                bottom={2}
              >
                <Icon as={BiSolidPencil} w={4} h={4} color="gray.500" />
              </AvatarBadge>
            </Avatar>
          </FormLabel>
          <Input display="none" type="file" onChange={handleEditImage} />
        </FormControl>
        <Text py={2} fontWeight={600} fontSize="4xl">{`${
          account?.first_name ? account?.first_name : ""
        } ${account?.last_name ? account?.last_name : ""}`}</Text>
      </Stack>
      <Stack gap={6}>
        {accountForms?.map((form, index) => (
          <Stack key={index}>
            {form?.type === "text" ? (
              <FormText
                label={form?.label}
                icon={form?.icon}
                name={form?.name}
                value={form?.value}
                placeholder={form?.placeholder}
                loading={loading}
                error={form?.error}
                readOnly={form?.readOnly}
                callback={handleChangeAccount}
              />
            ) : (
              <FormText
                label={form?.label}
                icon={form?.icon}
                value={form?.value}
                placeholder={form?.placeholder}
                loading={loading}
                readOnly={form?.readOnly}
              />
            )}
          </Stack>
        ))}
      </Stack>
      {!isOpen && (
        <Stack my={6} gap={8}>
          <Button
            variant="outline"
            borderColor="orangered"
            textColor="orangered"
            _hover={{
              bg: "orangered",
              borderColor: "inital",
              textColor: "white",
            }}
            onClick={onOpen}
            isLoading={loading}
          >
            Edit Profile
          </Button>
          <Button
            bg="orangered"
            textColor="white"
            _hover={{
              bg: "orange.700",
            }}
            onClick={handleLogout}
            isLoading={loading}
          >
            Logout
          </Button>
        </Stack>
      )}
      {isOpen && (
        <Stack my={6} gap={8}>
          <Button
            bg="orangered"
            textColor="white"
            _hover={{
              bg: "orange.700",
            }}
            onClick={handleEditProfile}
            isLoading={loading}
          >
            Simpan
          </Button>
          <Button
            variant="outline"
            borderColor="orangered"
            textColor="orangered"
            _hover={{
              bg: "orangered",
              borderColor: "inital",
              textColor: "white",
            }}
            onClick={onClose}
            isLoading={loading}
          >
            Batalkan
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Account;
