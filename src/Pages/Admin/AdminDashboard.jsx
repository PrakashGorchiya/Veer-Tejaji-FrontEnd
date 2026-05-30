import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchCommitteeMembers,
  fetchDonors,
  fetchVolunteers,
} from "../../Redux/actions";
import { fetchGalleryImages } from "../../Redux/actions/galleryActions";
import { authService } from "../../Services/AuthService";

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { members: committeeMembers, loading: committeeLoading } = useSelector(
    (state) => state.committee
  );
  const { donors, loading: donorsLoading } = useSelector((state) => state.donor);
  const { volunteers, loading: volunteersLoading } = useSelector(
    (state) => state.volunteer
  );
  const { images: galleryImages, loading: galleryLoading } = useSelector(
    (state) => state.gallery
  );

  useEffect(() => {
    // Check if admin is logged in with valid token
    const checkAuth = async () => {
      const isAuthenticated = await authService.validateToken();
      if (!isAuthenticated) {
        authService.logout();
        navigate("/admin/login");
        return;
      }
    };
    checkAuth();

    // Fetch all data
    dispatch(fetchCommitteeMembers());
    dispatch(fetchDonors());
    dispatch(fetchVolunteers());
    dispatch(fetchGalleryImages());
  }, [dispatch, navigate]);

  const totalDonations = donors?.reduce((sum, donor) => sum + (donor.amount || 0), 0) || 0;

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            authService.logout();
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Statistics Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>{committeeMembers?.length || 0}</h3>
              <p className="mb-0">Committee Members</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>{donors?.length || 0}</h3>
              <p className="mb-0">Total Donors</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>₹{totalDonations.toLocaleString("en-IN")}</h3>
              <p className="mb-0">Total Donations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>{volunteers?.length || 0}</h3>
              <p className="mb-0">Volunteers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3>{galleryImages?.length || 0}</h3>
              <p className="mb-0">Gallery Images</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="g-3 mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Quick Actions</h4>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/committee")}
                >
                  Manage Committee Members
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/gallery")}
                >
                  Manage Gallery
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate("/admin/volunteers")}
                >
                  Manage Volunteers
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/donors")}
                >
                  Manage Donors
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Donors */}
      <Row className="g-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Recent Donors</h5>
              {donorsLoading ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors?.slice(0, 5).map((donor) => (
                        <tr key={donor.id}>
                          <td>{donor.name}</td>
                          <td>₹{donor.amount?.toLocaleString("en-IN") || 0}</td>
                          <td>{donor.city || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Recent Volunteers</h5>
              {volunteersLoading ? (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers?.slice(0, 5).map((volunteer) => (
                        <tr key={volunteer.id}>
                          <td>{volunteer.name}</td>
                          <td>{volunteer.mobile || "-"}</td>
                          <td>{volunteer.city || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
