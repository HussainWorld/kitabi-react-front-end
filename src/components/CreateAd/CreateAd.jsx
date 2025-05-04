import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { create } from "../../services/adService";
import { AdContext } from "../../contexts/adContext";

const CreateAd = () => {
  const navigate = useNavigate();
  const { ads, setAds, setTrigger, trigger } = useContext(AdContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    status: '',
    location: '',
    image: '',
    category: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    setMessage("");
    setErrors({ ...errors, [evt.target.name]: "" });
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const validateInputs = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) errors.price = "Valid price is required";
    if (!formData.status) errors.status = "Status is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.image) errors.image = "Image URL is required";
    if (!formData.category) errors.category = "Category is required";
    return errors;
  };

  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newErrors = validateInputs();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const price = parseFloat(formData.price);
  
      const response = await create({ 
        title: formData.title, 
        price, 
        description: formData.description, 
        status: formData.status, 
        location: formData.location, 
        image: formData.image, 
        category: formData.category 
      });

      if (response && response._id) {
        const newAd = { 
          ...formData, 
          price, 
          _id: response._id,
          image: response.image, 
        };
  
        const updatedAds = [...ads, newAd];
        setAds(updatedAds);
        localStorage.setItem("ads", JSON.stringify(updatedAds));
        setTrigger(!trigger)
        setMessage("Ad added successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("Failed to add product");
        setMessageType("danger");
      }
    } catch (err) {
      setMessage("Error creating ad: " + err.message);
      setMessageType("danger");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create New Ad</h1>

      {message && <p className={`message-${messageType}`}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="" disabled>Select Status</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          {errors.status && <p>{errors.status}</p>}
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p>{errors.location}</p>}
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <p>{errors.category}</p>}
        </div>

        <button type="submit">Create Ad</button>
      </form>
    </div>
  );
};

export default CreateAd;