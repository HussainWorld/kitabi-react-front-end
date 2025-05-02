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

export { getAllAds, create };