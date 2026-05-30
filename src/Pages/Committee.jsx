import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { fetchCommitteeMembers } from "../Redux/actions/committeeActions";

function Committee() {
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.committee);

  useEffect(() => {
    dispatch(fetchCommitteeMembers());
  }, [dispatch]);

  // Fallback to default members if API data is empty
  const defaultMembers = [
    {
      id: 1,
      role: "President (अध्यक्ष)",
      name: "श्रीमान बगताराम जी गोरचिया",
      photoUrl: "/images/committee/president.jpg",
    },
    {
      id: 2,
      role: "Vice President (उपाध्यक्ष)",
      name: "श्रीमान मोहनराम जी तंग",
      photoUrl: "/images/committee/Vice_president.jpg",
    },
    {
      id: 3,
      role: "Secretary (सचिव)",
      name: "श्रीमान मोहनराम जी सोऊ",
      photoUrl: "/images/committee/Secretary.jpg",
    },
    {
      id: 4,
      role: "Treasurer (कोषाध्यक्ष)",
      name: "श्रीमान पवन जी बेन्दा",
      photoUrl: "/images/committee/Treasure.jpg",
    },
  ];

  const displayMembers = members && members.length > 0 ? members : defaultMembers;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">
        Committee Members (समिति सदस्यगण)
      </h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="warning" className="my-3">
          Error loading committee members: {error}. Showing default data.
        </Alert>
      )}

      <Row className="g-4">
        {displayMembers.map((member) => (
          <Col md={3} sm={6} xs={12} key={member.id || member.role}>
            <Card className="shadow-sm h-100 text-center">
              {/* Photo Section */}
              <Card.Img
                variant="top"
                src={member.photoUrl || member.photo || "/images/committee/placeholder.png"}
                alt={member.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/images/committee/placeholder.png";
                }}
              />

              <Card.Body>
                <Card.Title className="fw-bold">
                  {member.role}
                </Card.Title>

                <Card.Text>
                   {member.name}
                </Card.Text>

                {/* {member.mobile && (
                  <Card.Text>
                    <strong>संपर्क:</strong> {member.mobile}
                  </Card.Text>
                )} */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Committee;
