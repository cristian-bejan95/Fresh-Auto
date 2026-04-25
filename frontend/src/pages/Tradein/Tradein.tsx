import { useEffect } from "react";
import Header from "../../components/Header/Header";

function Tradein() {
  useEffect(() => {
    document.title = "Trade-in | Fresh-Auto";
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default Tradein;
