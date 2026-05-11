import { useEffect } from "react";
import HomeHero from "../../components/HomeHero/HomeHero";

export default function Home() {
  useEffect(() => {
    document.title = "Fresh-Auto - Parcare Auto Moldova";
  }, []);

  return (
    <>
      <HomeHero />
    </>
  );
}
