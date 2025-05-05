const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ads`

const getAllAds = async () => {
  try {
      const res = await fetch(BASE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      const data = await res.json()

      if (data.err) {
          throw new Error(data.err)
      }
      
      return data

  } catch (err) {
      console.log(err)
      throw new Error(err)
  }
}

const view = async (adId) => {
  try {
    const res = await fetch(`${BASE_URL}/${adId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (adData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(adData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to create ad');
    }

    return data;
  } catch (err) {
    console.error('Error creating ad:', err);
    throw new Error('Failed to create ad');
  }
};

const deleteAd = async (adId) => {
  try {
      const res = await fetch(`${BASE_URL}/${adId}`, {
          method: 'DELETE',
          headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });

      if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to delete ad');
      }

      return { message: 'Ad deleted successfully' };
  } catch (err) {
      console.error('Delete Error:', err);
      throw new Error(err.message);
  }
};

// update ad
async function updateAd (adId, adFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${adId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


export { getAllAds, view, create, deleteAd, updateAd };