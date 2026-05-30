import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";
import {
  fetchDonors,
  createDonor,
  updateDonor,
  deleteDonor,
} from "../../Redux/actions/donorActions";
import { authService } from "../../Services/AuthService";

function ManageDonors() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { donors, loading, error } = useSelector((state) => state.donor);

  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
      dispatch(fetchDonors());
    };
    checkAuth();
  }, [dispatch, navigate]);

  const handleAdd = () => {
    setEditingDonor(null);
    setFormData({ name: "", mobile: "", amount: "", city: "", message: "" });
    setShowModal(true);
  };

  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setFormData({
      name: donor.name || "",
      mobile: donor.mobile || "",
      amount: donor.amount || "",
      city: donor.city || "",
      message: donor.message || "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      dispatch(deleteDonor(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donorData = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
    };
    if (editingDonor) {
      dispatch(updateDonor(editingDonor.id, donorData));
    } else {
      dispatch(createDonor(donorData));
    }
    setShowModal(false);
  };

  const totalDonations = donors?.reduce((sum, donor) => sum + (donor.amount || 0), 0) || 0;

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Donors</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add New Donor
          </Button>
        </div>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5>Total Donations: ₹{totalDonations.toLocaleString("en-IN")}</h5>
          <p className="text-muted">Total Donors: {donors?.length || 0}</p>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Amount</th>
                  <th>City</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors?.map((donor, index) => (
                  <tr key={donor.id}>
                    <td>{index + 1}</td>
                    <td>{donor.name}</td>
                    <td>{donor.mobile || "-"}</td>
                    <td>₹{donor.amount?.toLocaleString("en-IN") || 0}</td>
                    <td>{donor.city || "-"}</td>
                    <td>{donor.message || "-"}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(donor)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(donor.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDonor ? "Edit Donor" : "Add New Donor"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile *</Form.Label>
              <Form.Control
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
                placeholder="Enter mobile number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="Enter donation amount"
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter message"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingDonor ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManageDonors;
