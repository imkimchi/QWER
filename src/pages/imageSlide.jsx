import { useEffect, useState } from 'react';

const ImageSlideshow = () => {
  const [imageDetails, setImageDetails] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % (imageDetails.length > 0 ? imageDetails.length : 1);
        return isNaN(newIndex) ? 0 : newIndex;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [imageDetails]);


  // useEffect(() => {
  //   console.log("currentImageIndex", currentImageIndex)
  // }, [currentImageIndex])

  useEffect(() => {
    fetch('/api/count')
      .then(response => response.json())
      .then(data => setImageDetails(data.imageFiles || []))  // Ensure imageDetails is initialized to an empty array
      .catch(error => console.error('Error fetching image details:', error));
  }, []);

  return (
    <>
    <div style={{
      width: "100vh",
      height: "100vh",
      // backgroundImage: `url(/slide/${imageDetails[currentImageIndex]})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(400%) contrast(175%) blur(0px)',
      transform: 'scale(400%) translateX(20%)',
      animation: 'rotate360 4s linear infinite'
    }}>
    {imageDetails.map((image, index) => (
      <img
        key={index}
        src={`/slide/${image}`}
        alt={`Image ${index + 1}`}
        style={{ display: index === currentImageIndex ? 'block' : 'none',
        // objectFit: 'cover', // Set objectFit property to 'cover'
        position: 'absolute', // Position absolute to overlay images
        top: 0,
        left: 0,
        
        width: '100%', height: '100%' }}
      />
    ))}
      
    </div>
    <div className="Me">Who Else Would've Thought</div>
    </>
  );
};

export default ImageSlideshow;
