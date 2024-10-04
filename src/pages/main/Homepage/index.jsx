import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { services, banners } = useSelector((state) => state.information);

  return (
    <Stack py={8} gap={8}>
      <ServiceSection services={services} />
      <BannerSection banners={banners} />
    </Stack>
  );
};

const ServiceSection = ({ services = [] }) => {
  return (
    <Flex
      w="full"
      justifyContent={{ base: "center", lg: "flex-start" }}
      alignItems="flex-start"
      gap={8}
      wrap="wrap"
      py={4}
    >
      {services?.map((service, index) => (
        <Box
          as={Link}
          to={`/service/${service?.service_code}`}
          key={index}
          maxW={"70px"}
          display="flex"
          flex="1 1 70px"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          cursor={"pointer"}
          noOfLines={2}
        >
          <Stack mx="auto" aspectRatio={1}>
            <Image
              src={service?.service_icon || ""}
              w="full"
              h="full"
              objectFit="contain"
              objectPosition="center"
              draggable={false}
            />
          </Stack>
          <Text fontWeight={500} fontSize="small" textAlign="center">
            {service?.service_name || ""}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

const BannerSection = ({ banners = [] }) => {
  const sliderRef = useRef(null);
  const sliderSettings = {
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const Banner = ({ banner = {} }) => {
    return (
      <Stack alignItems="center">
        <Box px={2} w="full" minW="270px" minH="121px">
          <Image
            src={banner?.banner_image || ""}
            alt={banner?.banner_name || ""}
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
      </Stack>
    );
  };

  return (
    <Box w="full" py={4}>
      <Text fontWeight={600}>Temukan Promo Menarik</Text>
      <Box w="full" my={6} overflowX="hidden">
        <Slider ref={sliderRef} {...sliderSettings}>
          {banners?.map((banner, index) => (
            <Banner key={index} banner={banner} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Homepage;
