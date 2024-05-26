import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

export default function CustomerBerandaHero() {
  const styleItem = { height: "100%", maxHeight: "700px" };
  const styleImg = {
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "700px",
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={styleItem}>
        <Image src="./images/carousel_1.png" style={styleImg} />
        <Carousel.Caption>
          <h1 className="text-title-carousel">Rental Mobil Jogja</h1>
          <h1 className="text-subtitle-carousel">
            Buru diskon menarik disini!
          </h1>
          <p className="text-caption-carousel">
            Dapatkan pengalaman renal yang menarik bersama keluarga anda.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={styleItem}>
        <Image src="./images/carousel_2.png" style={styleImg} />
        <Carousel.Caption>
          <h1 className="text-title-carousel">Rental Mobil Jogja</h1>
          <h1 className="text-subtitle-carousel">
            Buru diskon menarik disini!
          </h1>
          <p className="text-caption-carousel">
            Dapatkan pengalaman renal yang menarik bersama keluarga anda.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
