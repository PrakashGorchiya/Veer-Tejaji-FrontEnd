import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  fetchGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../../Redux/actions/galleryActions";
import { authService } from "../../Services/AuthService";

function ManageGallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.gallery);

  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    photoUrl: "",
    category: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
      dispatch(fetchGalleryImages());
    };
    checkAuth();
  }, [dispatch, navigate]);

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({ title: "", photoUrl: "", category: "" });
    setShowModal(true);
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title || "",
      photoUrl: image.photoUrl || "",
      category: image.category || "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteGalleryImage(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingImage) {
      dispatch(updateGalleryImage(editingImage.id, formData));
    } else {
      dispatch(createGalleryImage(formData));
    }
    setShowModal(false);
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Gallery Images</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add New Image
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {images?.map((image, index) => (
                    <tr key={image.id}>
                      <td>{index + 1}</td>
                      <td>{image.title || "-"}</td>
                      <td>{image.category || "-"}</td>
                      <td>
                        <img
                          src={image.photoUrl}
                          alt={image.title}
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(image)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(image.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row className="g-3">
            {images?.map((image) => (
              <Col md={3} key={image.id}>
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={image.photoUrl}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      {image.title || "Untitled"}
                    </Card.Title>
                    {image.category && (
                      <Card.Text style={{ fontSize: "0.85rem" }}>
                        Category: {image.category}
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingImage ? "Edit Image" : "Add New Image"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter image title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Events, Activities"
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
              {editingImage ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ManageGallery;
