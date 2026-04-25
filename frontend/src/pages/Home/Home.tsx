import { useEffect } from "react";
import Header from "../../components/Header/Header";

function Home() {
  useEffect(() => {
    document.title = "Fresh-Auto - Parcare Auto Moldova";
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default Home;
