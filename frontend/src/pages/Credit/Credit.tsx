import { useEffect } from "react";
import Header from "../../components/Header/Header";

function Leasing() {
  useEffect(() => {
    document.title = "Leasing | Fresh-Auto";
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default Leasing;
