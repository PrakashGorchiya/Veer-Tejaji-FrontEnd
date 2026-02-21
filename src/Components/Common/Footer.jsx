import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#e67e22" }}
      className="text-dark py-4 mt-5"
    >
      <Container fluid className="text-center">
        <h5>Veer Tejaji Samaj Seva Sansthan</h5>
        <p className="mb-1">Balasamand, Mandore, Jodhpur (Rajasthan)</p>
        <p className="mb-2">
          "वीरता, सेवा और सामाजिक न्याय की प्रेरणा – वीर तेजाजी महाराज"
        </p>
        <hr />
        <p className="mb-0">
          © 2025 Veer Tejaji Samaj Seva Sansthan
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
