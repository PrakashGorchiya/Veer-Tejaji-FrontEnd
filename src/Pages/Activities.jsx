import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ListGroup, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { fetchVolunteers } from "../Redux/actions/volunteerActions";

function Activities() {
  const dispatch = useDispatch();
  const { volunteers, loading, error } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const activities = [
    "Educational Support Programs (शैक्षणिक सहायता कार्यक्रम)",
    "Health Check-up Camps (स्वास्थ्य जांच शिविर)",
    "Blood Donation Camps (रक्तदान शिविर)",
    "Cultural & Religious Events (सांस्कृतिक एवं धार्मिक आयोजन)",
    "Social Awareness Programs (सामाजिक जागरूकता कार्यक्रम)",
  ];

  const activeVolunteers = volunteers?.filter((v) => v.active) || [];

  return (
    <Container className="my-5">
      <h2>Our Activities (हमारी गतिविधियां)</h2>
      
      <ListGroup className="mt-3">
        {activities.map((activity, index) => (
          <ListGroup.Item key={index}>{activity}</ListGroup.Item>
        ))}
      </ListGroup>

      <h3 className="mt-5 mb-4">Our Active Volunteers (हमारे सक्रिय स्वयंसेवक)</h3>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="warning" className="my-3">
          Error loading volunteers: {error}
        </Alert>
      )}

      {!loading && !error && activeVolunteers.length > 0 && (
        <Row className="g-4 mt-2">
          {activeVolunteers.map((volunteer) => (
            <Col md={4} sm={6} xs={12} key={volunteer.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{volunteer.name}</Card.Title>
                  {volunteer.mobile && (
                    <Card.Text>
                      <strong>Mobile:</strong> {volunteer.mobile}
                    </Card.Text>
                  )}
                  {volunteer.area && (
                    <Card.Text>
                      <strong>Service Area (सेवा क्षेत्र):</strong> {volunteer.area}
                    </Card.Text>
                  )}
                  {volunteer.city && (
                    <Card.Text>
                      <strong>City (शहर):</strong> {volunteer.city}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && !error && activeVolunteers.length === 0 && (
        <Alert variant="info" className="my-3">
          No active volunteers found. Volunteers will be displayed here once available.
        </Alert>
      )}
    </Container>
  );
}

export default Activities;