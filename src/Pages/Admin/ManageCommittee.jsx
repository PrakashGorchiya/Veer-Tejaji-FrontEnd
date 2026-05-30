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
  fetchCommitteeMembers,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
} from "../../Redux/actions/committeeActions";
import { authService } from "../../Services/AuthService";

function ManageCommittee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.committee);

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    mobile: "",
    photoUrl: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
      dispatch(fetchCommitteeMembers());
    };
    checkAuth();
  }, [dispatch, navigate]);

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({ role: "", name: "", mobile: "", photoUrl: "" });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      role: member.role || "",
      name: member.name || "",
      mobile: member.mobile || "",
      photoUrl: member.photoUrl || "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(deleteCommitteeMember(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      dispatch(updateCommitteeMember(editingMember.id, formData));
    } else {
      dispatch(createCommitteeMember(formData));
    }
    setShowModal(false);
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Committee Members</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add New Member
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
                  <th>Role</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Photo URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members?.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.role}</td>
                    <td>{member.name}</td>
                    <td>{member.mobile || "-"}</td>
                    <td>
                      <a
                        href={member.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.85rem" }}
                      >
                        View Image
                      </a>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
            {editingMember ? "Edit Member" : "Add New Member"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Role *</Form.Label>
              <Form.Control
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                placeholder="e.g., President (अध्यक्ष)"
              />
            </Form.Group>

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
              <Form.Label>Photo URL (Cloudinary) *</Form.Label>
              <Form.Control
                type="url"
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.value })
                }
                required
                placeholder="Enter Cloudinary image URL"
              />
              <Form.Text className="text-muted">
                Upload image to Cloudinary first, then paste the URL here
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingMember ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManageCommittee;
