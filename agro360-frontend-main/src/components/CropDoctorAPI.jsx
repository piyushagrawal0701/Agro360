import React, { useState } from "react";

const CropDoctorAPI = () => {
  const [cropImage, setCropImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCropImage(URL.createObjectURL(file));

      // Make an API call to Plant.id
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Api-Key": "wg2kSrBV9r8dpOd6u7lMIKZ0Da1NyYCo10b6otIVUadhVQyOjt", // Replace with your API Key
        },
        body: formData,
      });

      const data = await response.json();
      if (data && data.suggestions) {
        setDiagnosis(data.suggestions[0].plant_name);
      }
    }
  };

  return (
    <div>
      <h1>Crop Doctor</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {cropImage && <img src={cropImage} alt="crop" />}
      {diagnosis && <p>Diagnosis: {diagnosis}</p>}
    </div>
  );
};

export default CropDoctorAPI;
