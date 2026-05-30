import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { fetchGalleryImages } from "../Redux/actions/galleryActions";

function Gallery() {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);

  // Fallback to default images if API data is empty
  const defaultImages = [
    "/images/gallery_photos/Bhawan_Photo.jpg",
    "/images/gallery_photos/Photo1.jpg",
    "/images/gallery_photos/Photo2.jpg",
    "/images/gallery_photos/Photo3.jpg",
    "/images/gallery_photos/Photo4.jpg",
    "/images/gallery_photos/Photo5.jpg",
    "/images/gallery_photos/Photo6.jpg", 
    "/images/gallery_photos/Photo7.jpg",  
  ];

  // Convert API images to display format or use defaults
  const displayImages = images && images.length > 0 
    ? images.map(img => img.photoUrl || img)
    : defaultImages.map((url, index) => ({ id: index, photoUrl: url }));

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ fontSize: "1.75rem" }}>
        📸 हमारी गतिविधियों की झलक
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
          Error loading gallery images: {error}. Showing default images.
        </Alert>
      )}

      <Row className="g-4">
        {displayImages.map((img, index) => {
          const imageUrl = typeof img === 'string' ? img : img.photoUrl;
          const imageId = typeof img === 'string' ? index : img.id;
          const imageTitle = typeof img === 'object' ? img.title : `Gallery ${index + 1}`;
          
          return (
            <Col key={imageId || index} md={4} sm={6} xs={12}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  src={imageUrl}
                  alt={imageTitle}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/images/committee/placeholder.png";
                  }}
                />
                {typeof img === 'object' && img.title && (
                  <Card.Body>
                    <Card.Text className="text-center mb-0" style={{ fontSize: "0.9rem" }}>
                      {img.title}
                    </Card.Text>
                  </Card.Body>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Gallery;