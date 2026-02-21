import { Container, Row, Col, Card } from "react-bootstrap";
import Donate from "./Donate";
import veerTejajiMaharaj from "../assets/Images/Veer_Tejaji_Maharaj.png";
import orgLogo from "../assets/Images/Veer Tejaji samaj seva sansthan Balsamand Mandore Jodhpur.png";
import omBg from "../assets/Images/OM_1.png";
import heroBanner from "../assets/Images/hero-banner_3.png";

function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section>

      <div
        style={{
          position: "relative",
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: 650,
        }}
      >
          <Container>
            <Row className="align-items-center text-light">
              <Col lg={12} className="text-center px-3">
                <h1 className="fw-bold mb-2" style={{ fontSize: "3rem", marginTop:"26rem" }}>
                  वीर तेजाजी समाज सेवा संस्थान
                </h1>

                <p className="fw-bold mb-2" style={{ fontSize: "1.25rem" }}>
                  बालसमंद, मंडोर, जोधपुर (राजस्थान)
                </p>

                <p
                  className="mt-3 "
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    maxWidth: "650px",
                    margin: "0 auto",
                  }}
                >
                  वीर तेजाजी महाराज के आदर्शों से प्रेरित होकर, हम सामाजिक न्याय,
                  शिक्षा, सांस्कृतिक मूल्यों और मानवता की सेवा के लिए कार्य करते हैं।
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      {/* </div> */}
      </section>

      {/* ================= MISSION & VISION ================= */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col lg={4} className="text-center mb-4 mb-lg-0">
            <img
              src={veerTejajiMaharaj}
              alt="Veer Tejaji Maharaj"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "280px", objectFit: "contain" }}
            />
          </Col>

          <Col lg={8}>
            <Row className="g-4">
              <Col md={6}>
                <Card className="p-4 shadow h-100">
                  <h4 className="mb-2">Our Mission (हमारा उद्देश्य)</h4>
                  <p className="mb-0">
                    शिक्षा, सामाजिक सद्भाव, सांस्कृतिक विरासत, गौ संरक्षण और
                    जरूरतमंदों के कल्याण को बढ़ावा देकर निस्वार्थ भाव से समाज की
                    सेवा करना।
                  </p>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="p-4 shadow h-100">
                  <h4 className="mb-2">Our Vision (हमारा इरादा)</h4>
                  <p className="mb-0">
                    वीर तेजाजी महाराज के मूल्यों से प्रेरित एक एकजुट, जागरूक और
                    जिम्मेदार समाज का निर्माण करना।
                  </p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* ================= ACTIVITIES ================= */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Activities</h2>
        <Row className="g-4">
          {[
            "Education Support (शिक्षा सहायता)",
            "Health Camps (स्वास्थ्य शिविर)",
            "Blood Donation (रक्तदान)",
            "Cultural Events (सांस्कृतिक कार्यक्रम)",
          ].map((item, i) => (
            <Col md={3} key={i}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Card.Text>
                    हम समाज के कल्याण और सामाजिक विकास के लिए सक्रिय रूप से{" "}
                    {item.toLowerCase()} का आयोजन करते हैं।
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;




// import { Container, Row, Col, Card } from "react-bootstrap";
// import Donate from "./Donate";
// import veerTejajiMaharaj from "../assets/Images/Veer_Tejaji_Maharaj.png";
// import orgLogo from "../assets/Images/Veer Tejaji samaj seva sansthan Balsamand Mandore Jodhpur.png";
// import omBg from "../assets/Images/OM_1.png";

// function Home() {
//   return (
//     <>
//       {/* ================= HERO SECTION ================= */}
//       <div
//         style={{
//           position: "relative",
//           backgroundImage: `url(${omBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Overlay */}
//         <div
//           style={{
//             background:
//               "linear-gradient(rgba(255,158,68,0.88), rgba(255,158,68,0.88))",
//             padding: "50px 0",
//           }}
//         >
//           <Container>
//             <Row className="align-items-center text-light">
//               {/* LEFT IMAGE */}
//               <Col lg={3} className="text-center mb-4 mb-lg-0">
//                 <img
//                   src={veerTejajiMaharaj}
//                   alt="Veer Tejaji Maharaj"
//                   className="img-fluid"
//                   style={{
//                     maxHeight: "240px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </Col>

//               {/* CENTER CONTENT */}
//               <Col lg={6} className="text-center px-3">
//                 <h1 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
//                   वीर तेजाजी समाज सेवा संस्थान
//                 </h1>

//                 <p className="mb-2" style={{ fontSize: "1.05rem" }}>
//                   बालसमंद, मंडोर, जोधपुर (राजस्थान)
//                 </p>

//                 <p
//                   className="mt-3"
//                   style={{
//                     fontSize: "1rem",
//                     lineHeight: "1.7",
//                     maxWidth: "650px",
//                     margin: "0 auto",
//                   }}
//                 >
//                   वीर तेजाजी महाराज के आदर्शों से प्रेरित होकर, हम सामाजिक न्याय,
//                   शिक्षा, सांस्कृतिक मूल्यों और मानवता की सेवा के लिए कार्य करते हैं।
//                 </p>
//               </Col>

//               {/* RIGHT IMAGE */}
//               <Col lg={3} className="text-center mb-4 mb-lg-0">
//                 <img
//                   src={orgLogo}
//                   alt="Veer Tejaji Samaj Seva Sansthan"
//                   className="img-fluid"
//                   style={{
//                     maxHeight: "240px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>

//       {/* ================= MISSION & VISION ================= */}
//       <Container className="my-5">
//         <Row className="align-items-center">
//           <Col lg={4} className="text-center mb-4 mb-lg-0">
//             <img
//               src={veerTejajiMaharaj}
//               alt="Veer Tejaji Maharaj"
//               className="img-fluid rounded shadow"
//               style={{ maxHeight: "280px", objectFit: "contain" }}
//             />
//           </Col>

//           <Col lg={8}>
//             <Row className="g-4">
//               <Col md={6}>
//                 <Card className="p-4 shadow h-100">
//                   <h4 className="mb-2">Our Mission (हमारा उद्देश्य)</h4>
//                   <p className="mb-0">
//                     शिक्षा, सामाजिक सद्भाव, सांस्कृतिक विरासत, गौ संरक्षण और
//                     जरूरतमंदों के कल्याण को बढ़ावा देकर निस्वार्थ भाव से समाज की
//                     सेवा करना।
//                   </p>
//                 </Card>
//               </Col>

//               <Col md={6}>
//                 <Card className="p-4 shadow h-100">
//                   <h4 className="mb-2">Our Vision (हमारा इरादा)</h4>
//                   <p className="mb-0">
//                     वीर तेजाजी महाराज के मूल्यों से प्रेरित एक एकजुट, जागरूक और
//                     जिम्मेदार समाज का निर्माण करना।
//                   </p>
//                 </Card>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>

//       {/* ================= ACTIVITIES ================= */}
//       <Container className="my-5">
//         <h2 className="text-center mb-4">Our Activities</h2>
//         <Row className="g-4">
//           {[
//             "Education Support (शिक्षा सहायता)",
//             "Health Camps (स्वास्थ्य शिविर)",
//             "Blood Donation (रक्तदान)",
//             "Cultural Events (सांस्कृतिक कार्यक्रम)",
//           ].map((item, i) => (
//             <Col md={3} key={i}>
//               <Card className="h-100 shadow-sm">
//                 <Card.Body>
//                   <Card.Title>{item}</Card.Title>
//                   <Card.Text>
//                     हम समाज के कल्याण और सामाजिक विकास के लिए सक्रिय रूप से{" "}
//                     {item.toLowerCase()} का आयोजन करते हैं।
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Home;
