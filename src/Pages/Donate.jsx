import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Alert, Spinner, Table } from "react-bootstrap";
import { createDonor, fetchDonors } from "../Redux/actions/donorActions";

function Donate() {
  const dispatch = useDispatch();
  const { donors, loading, error } = useSelector((state) => state.donor);
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    city: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch donors on component mount
  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  useEffect(() => {
    // Check if submission completed successfully
    if (!loading && !error && isSubmittingRef.current) {
      setShowSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        amount: "",
        city: "",
        message: "",
      });
      // Refresh donors list after successful submission
      dispatch(fetchDonors());
      setTimeout(() => setShowSuccess(false), 5000);
      isSubmittingRef.current = false;
    }
  }, [loading, error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donorData = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
    };
    
    isSubmittingRef.current = true;
    dispatch(createDonor(donorData));
  };

  return (
    <Container className="my-5">
      <h2>Support Us (हमें प्रोत्साहन दें)</h2>
      <p>
        आपके योगदान से हमें समाज की बेहतर सेवा करने में मदद मिलती है। आप हमें धन दान करके, स्वयंसेवा करके या हमारी गतिविधियों में भाग लेकर सहयोग कर सकते हैं।
      </p>

      {showSuccess && (
        <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
          Thank you for your donation! Your contribution has been recorded.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible>
          Error: {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Name (नाम) *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile (मोबाइल) *</Form.Label>
          <Form.Control
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount (राशि)</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter donation amount"
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City (शहर)</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message (संदेश)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any message or comment"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Submitting...
            </>
          ) : (
            "Submit Donation"
          )}
        </Button>
      </Form>

      <div className="mt-5">
        <h4>Bank Details (बैंक विवरण):</h4>
        <p>
          <strong>Account Name:</strong> Veer Tejaji Samaj Seva Sansthan<br />
          <strong>Account No:</strong> XXXXXXXXX<br />
          <strong>IFSC:</strong> XXXXXXXX
        </p>
      </div>

      {/* Donors Table Section */}
      <div className="mt-5">
        <h4 className="mb-4">Our Donors (हमारे दानदाता)</h4>
        
        {loading && !donors?.length && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {donors && donors.length > 0 ? (
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name (नाम)</th>
                  <th>City (शहर)</th>
                  <th>Message (संदेश)</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor.id}>
                    <td>{index + 1}</td>
                    <td>{donor.name || "-"}</td>
                    <td>{donor.city || "-"}</td>
                    <td>
                      {donor.message || "दान बिना अहंकार के और सेवा बिना स्वार्थ के करनी चाहिए।"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          !loading && (
            <Alert variant="info">
              No donors found yet. Be the first to donate!
            </Alert>
          )
        )}
      </div>
    </Container>
  );
}

export default Donate;
