import { Container } from "react-bootstrap";

import CustomerBerandaHero from "../components/customer/beranda/Hero";
import CustomerBerandaInfo from "../components/customer/beranda/Info";

export default function Home() {
  return (
    <section id="beranda">
      <CustomerBerandaHero />

      <Container>
        <CustomerBerandaInfo />
      </Container>
    </section>
  );
}
