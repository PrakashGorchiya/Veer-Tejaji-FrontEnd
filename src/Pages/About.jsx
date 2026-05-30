import { Container, Row, Col, Card } from "react-bootstrap";
import veerTejajiMaharaj from "../assets/Images/Veer_Tejaji_Maharaj.png";

function About() {
  return (
    <Container className="my-4">
      <Row>
        <Col lg={12}>
          <Card className="p-4 shadow mb-4">
            <h2 className="mb-3" style={{ fontSize: "1.75rem" }}>About Us (हमारे बारे में)</h2>
            <p className="text-justify" style={{ fontSize: "0.95rem" }}>
              वीर तेजाजी समाज सेवा संस्थान एक गैर-लाभकारी संगठन है जो समाज सेवा के लिए समर्पित है। 
              हम वीर तेजाजी महाराज के आदर्शों और मूल्यों से प्रेरित होकर शिक्षा, सामाजिक न्याय, 
              सांस्कृतिक विकास और मानवता की सेवा के लिए काम करते हैं।
            </p>
            <p className="text-justify mt-3" style={{ fontSize: "0.95rem" }}>
              हमारा संस्थान बालसमंद, मंडोर, जोधपुर (राजस्थान) में स्थित है और पूरे क्षेत्र में 
              विभिन्न सामाजिक कार्यक्रमों और सेवाओं का आयोजन करता है।
            </p>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={4} className="text-center mb-3 mb-lg-0">
          <img 
            src={veerTejajiMaharaj} 
            alt="Veer Tejaji Maharaj" 
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", width: "auto", objectFit: "contain" }}
          />
        </Col>
        <Col lg={8}>
          <Card className="p-3 shadow h-100">
            <h3 className="mb-3" style={{ fontSize: "1.3rem" }}>Our History (हमारा इतिहास)</h3>
            <p className="text-justify" style={{ fontSize: "0.95rem" }}>
              वीर तेजाजी समाज सेवा संस्थान की स्थापना वीर तेजाजी महाराज के आदर्शों को आगे बढ़ाने 
              और समाज के कल्याण के लिए की गई थी। वीर तेजाजी महाराज राजस्थान के एक महान लोक देवता 
              थे जिन्होंने अपने जीवन में बहादुरी, सेवा और सामाजिक न्याय के मूल्यों को स्थापित किया। 
              उनका जन्म राजस्थान के खरनाल गाँव में हुआ था और उन्हें गायों की रक्षा के लिए अपने प्राण 
              न्यौछावर करने वाले वीर के रूप में जाना जाता है।
            </p>
            <p className="text-justify mt-3" style={{ fontSize: "0.95rem" }}>
              वीर तेजाजी महाराज की कहानी साहस, त्याग और समर्पण की एक अनूठी मिसाल है। उन्होंने अपने 
              जीवन में गायों की रक्षा के लिए सांप के काटने से बचाने के लिए अपने प्राणों की आहुति दी। 
              उनकी इस महान बलिदान की कहानी आज भी राजस्थान और पूरे भारत में प्रेरणा का स्रोत है।
            </p>
            <p className="text-justify mt-3" style={{ fontSize: "0.95rem" }}>
              हमारा संस्थान इन्हीं मूल्यों को आधार बनाकर समाज के सभी वर्गों, विशेषकर वंचित और 
              जरूरतमंद लोगों की सेवा करने के लिए प्रतिबद्ध है। हम वीर तेजाजी महाराज के आदर्शों को 
              आज के समय में जीवित रखने का प्रयास करते हैं और समाज में शिक्षा, स्वास्थ्य, सांस्कृतिक 
              विकास और सामाजिक न्याय के लिए निरंतर कार्य कर रहे हैं।
            </p>
            {/* <p className="text-justify mt-3" style={{ fontSize: "0.95rem" }}>
              बालसमंद, मंडोर, जोधपुर क्षेत्र में हमारा संस्थान विभिन्न सामाजिक कार्यक्रमों, शैक्षणिक 
              सहायता कार्यक्रमों, स्वास्थ्य शिविरों और सांस्कृतिक आयोजनों के माध्यम से समाज की सेवा 
              कर रहा है। हमारा उद्देश्य एक ऐसे समाज का निर्माण करना है जो वीर तेजाजी महाराज के 
              मूल्यों से प्रेरित हो और सभी के लिए समान अवसर प्रदान करे।
            </p> */}
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mt-3">
        <Col md={6}>
          <Card className="p-3 shadow h-100">
            <h3 className="mb-3" style={{ fontSize: "1.3rem" }}>Our Core Values (हमारे मूल मूल्य)</h3>
            <ul style={{ fontSize: "0.95rem" }}>
              <li className="mb-2 text-justify">
                <strong>सेवा (Service):</strong> निस्वार्थ भाव से समाज की सेवा करना
              </li>
              <li className="mb-2 text-justify">
                <strong>शिक्षा (Education):</strong> शिक्षा के माध्यम से समाज का विकास
              </li>
              <li className="mb-2 text-justify">
                <strong>सामाजिक न्याय (Social Justice):</strong> समाज के सभी वर्गों के लिए न्याय
              </li>
              <li className="mb-2 text-justify">
                <strong>सांस्कृतिक संरक्षण (Cultural Preservation):</strong> हमारी सांस्कृतिक विरासत को बचाना
              </li>
              <li className="mb-2 text-justify">
                <strong>गौ संरक्षण (Cow Protection):</strong> गायों की रक्षा और संरक्षण
              </li>
            </ul>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow h-100">
            <h3 className="mb-3" style={{ fontSize: "1.3rem" }}>Key Activities (मुख्य गतिविधियां)</h3>
            <ul style={{ fontSize: "0.95rem" }}>
              <li className="mb-2 text-justify">
                <strong>शैक्षणिक सहायता:</strong> जरूरतमंद छात्रों को शिक्षा सामग्री और छात्रवृत्ति प्रदान करना
              </li>
              <li className="mb-2 text-justify">
                <strong>स्वास्थ्य शिविर:</strong> नियमित स्वास्थ्य जांच शिविरों का आयोजन
              </li>
              <li className="mb-2 text-justify">
                <strong>रक्तदान शिविर:</strong> समाज में रक्तदान के महत्व को बढ़ावा देना
              </li>
              <li className="mb-2 text-justify">
                <strong>सांस्कृतिक कार्यक्रम:</strong> सांस्कृतिक और धार्मिक आयोजनों का प्रबंधन
              </li>
              <li className="mb-2 text-justify">
                <strong>सामाजिक जागरूकता:</strong> विभिन्न सामाजिक मुद्दों पर जागरूकता कार्यक्रम
              </li>
              <li className="mb-2 text-justify">
                <strong>गौ सेवा:</strong> गायों की देखभाल और संरक्षण के लिए कार्य
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12}>
          <Card className="p-3 shadow">
            <h3 className="mb-3" style={{ fontSize: "1.3rem" }}>Our Location (हमारा स्थान)</h3>
            <Row>
              <Col md={6}>
                <p style={{ fontSize: "0.95rem" }}>
                  <strong>Address (पता):</strong><br />
                  आदित्य पार्क, बालसमंद, मंडोर, जोधपुर (राजस्थान)<br />
                  Aaditya park, Balsamand, Mandore, Jodhpur (Rajasthan)
                </p>
              </Col>
              <Col md={6}>
                <p style={{ fontSize: "0.95rem" }}>
                  <strong>Contact Us (संपर्क करें):</strong><br />
                  हमारी वेबसाइट के "Contact" पेज के माध्यम से हमसे संपर्क कर सकते हैं।<br />
                  You can contact us through the "Contact" page on our website.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
