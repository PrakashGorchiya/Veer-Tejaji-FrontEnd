import { useEffect, useState } from "react";
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
import { authService } from "../../Services/AuthService";
import api from "../../Services/Api";

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "ADMIN",
    active: true,
  });
  const [passwordData, setPasswordData] = useState({ password: "" });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
      fetchUsers();
    };
    checkAuth();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({ username: "", password: "", email: "", role: "ADMIN", active: true });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      password: "",
      email: user.email || "",
      role: user.role,
      active: user.active,
    });
    setShowModal(true);
  };

  const handleChangePassword = (user) => {
    setSelectedUser(user);
    setPasswordData({ password: "" });
    setShowPasswordModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        setError("Failed to delete user");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (selectedUser) {
        // Update user
        await api.put(`/api/admin/users/${selectedUser.id}`, formData);
      } else {
        // Create user
        await api.post("/api/admin/users", formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to save user");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/api/admin/users/${selectedUser.id}/password`, passwordData);
      setShowPasswordModal(false);
      setPasswordData({ password: "" });
      alert("Password updated successfully");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add New User
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email || "-"}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`badge ${user.active ? "bg-success" : "bg-secondary"}`}>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleChangePassword(user)}
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
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

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={!!selectedUser}
                placeholder="Enter username"
              />
            </Form.Group>

            {!selectedUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!selectedUser}
                  placeholder="Enter password"
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role *</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedUser ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password for {selectedUser?.username}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlePasswordSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>New Password *</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.password}
                onChange={(e) => setPasswordData({ password: e.target.value })}
                required
                placeholder="Enter new password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManageUsers;
