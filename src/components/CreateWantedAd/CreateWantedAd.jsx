import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { createWantedAd } from "../../services/wantedAdService";
import { WantedAdContext } from "../../contexts/wantedAdContext";

const CreateWantedAd = () => {
  const navigate = useNavigate();
  const { wantedAds, setWantedAds, setTrigger, trigger } = useContext(WantedAdContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
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
    if (!formData.description) errors.title = "Description is required";
    // if (!formData.image) errors.image = "Image URL is required";
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
  
      const response = await createWantedAd({ 
        title: formData.title, 
        description: formData.description, 
        image: formData.image
      });

      if (response && response._id) {
        const newAd = { 
          ...formData, 
          _id: response._id,
          image: response.image, 
        };
  
        const updatedWantedAds = [...wantedAds, newAd];
        setWantedAds(updatedWantedAds);
        localStorage.setItem("wantedAds", JSON.stringify(updatedWantedAds));
        setTrigger(!trigger)
        setMessage("Wanted Ad added successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("Failed to add the wanted ad");
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
      <h1>Create New Wanted Ad</h1>

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
          <label>Image URL:</label>
          <input
            type="file"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>

        <button type="submit">Create Wanted Ad</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default CreateWantedAd;