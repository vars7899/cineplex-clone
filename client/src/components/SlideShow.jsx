import { Image, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const SlideShow = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  useEffect(() => {
    // autoSlide();
  }, [current]);
  const autoSlide = () => {
    setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 10000);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <Box className="slider" mt={{ base: "-125px", xl: "-65px" }}>
      <FiChevronLeft
        fontSize="3rem"
        className="arrow_left"
        onClick={prevSlide}
      />
      <FiChevronRight
        fontSize="3rem"
        className="arrow_right"
        onClick={nextSlide}
      />
      {slides.map((item, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <Image
              h="100vh"
              w="100vw"
              className="slide_img"
              src={item.movie_image}
              alt={item.movie_name}
              objectFit="cover"
              transform="translate(0,0%)"
            />
          )}
        </div>
      ))}
    </Box>
  );
};

export default SlideShow;
