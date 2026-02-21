import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { createVolunteer } from "../Redux/actions/volunteerActions";

function Contact() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.volunteer);
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    area: "",
    city: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if submission completed successfully
    if (!loading && !error && isSubmittingRef.current) {
      setShowSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        area: "",
        city: "",
        message: "",
      });
      setTimeout(() => setShowSuccess(false), 5000);
      isSubmittingRef.current = false;
    }
  }, [loading, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create volunteer entry with contact information
    const volunteerData = {
      name: formData.name,
      mobile: formData.mobile,
      area: formData.area || formData.message,
      city: formData.city,
      active: false, // Contact form submissions are not active volunteers by default
    };
    
    isSubmittingRef.current = true;
    dispatch(createVolunteer(volunteerData));
  };

  return (
    <Container className="my-5">
      <h2>Contact Us (संपर्क करें)</h2>
      <p className="mt-3 mb-4">
        Please fill out the form below to get in touch with us. We'll get back to you as soon as possible.
      </p>

      {showSuccess && (
        <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
          Thank you for contacting us! We have received your message and will get back to you soon.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible>
          Error: {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-3">
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
          <Form.Label>Email (ईमेल)</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
          <Form.Label>Area of Interest / Service Area (रुचि का क्षेत्र)</Form.Label>
          <Form.Control
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter your area of interest or service area"
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
            placeholder="Enter your message"
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
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
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
