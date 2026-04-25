import { useEffect } from "react";
import Header from "../../components/Header/Header";

function Contact() {
  useEffect(() => {
    document.title = "Contacte | Fresh-Auto";
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default Contact;
