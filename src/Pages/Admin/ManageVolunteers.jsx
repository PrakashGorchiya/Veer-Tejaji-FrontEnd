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
  fetchVolunteers,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../../Redux/actions/volunteerActions";
import { authService } from "../../Services/AuthService";

function ManageVolunteers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { volunteers, loading, error } = useSelector((state) => state.volunteer);

  const [showModal, setShowModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    area: "",
    city: "",
    active: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
      dispatch(fetchVolunteers());
    };
    checkAuth();
  }, [dispatch, navigate]);

  const handleAdd = () => {
    setEditingVolunteer(null);
    setFormData({ name: "", mobile: "", area: "", city: "", active: true });
    setShowModal(true);
  };

  const handleEdit = (volunteer) => {
    setEditingVolunteer(volunteer);
    setFormData({
      name: volunteer.name || "",
      mobile: volunteer.mobile || "",
      area: volunteer.area || "",
      city: volunteer.city || "",
      active: volunteer.active !== undefined ? volunteer.active : true,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      dispatch(deleteVolunteer(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVolunteer) {
      dispatch(updateVolunteer(editingVolunteer.id, formData));
    } else {
      dispatch(createVolunteer(formData));
    }
    setShowModal(false);
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Volunteers</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add New Volunteer
          </Button>
        </div>
      </div>

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
                  <th>Area</th>
                  <th>City</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers?.map((volunteer, index) => (
                  <tr key={volunteer.id}>
                    <td>{index + 1}</td>
                    <td>{volunteer.name}</td>
                    <td>{volunteer.mobile || "-"}</td>
                    <td>{volunteer.area || "-"}</td>
                    <td>{volunteer.city || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          volunteer.active ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {volunteer.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(volunteer)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(volunteer.id)}
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
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
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="Enter mobile number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                placeholder="Enter service area"
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
              <Form.Check
                type="checkbox"
                label="Active"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingVolunteer ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManageVolunteers;
