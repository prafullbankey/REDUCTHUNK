import React, { useState } from 'react';

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newSelectedFiles = [];
    let newErrorMessage = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      
      const fileSizeInMB = file.size / (1024 * 1024); 
      if (fileSizeInMB > 2) {
        newErrorMessage = 'File size exceeds the limit (2MB)';
        continue;
      }

    
      if (!file.type.includes('image/jpeg')) {
        newErrorMessage = 'Invalid file format. Only JPEG files are allowed.';
        continue;
      }

      
      newSelectedFiles.push(file);
    }

    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
    setErrorMessage(newErrorMessage);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelectedFiles = [...prevSelectedFiles];
      updatedSelectedFiles.splice(index, 1);
      return updatedSelectedFiles;
    });
    setErrorMessage('');
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('No valid files selected.');
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files[]', selectedFiles[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the server
      if (response.ok) {
        // Files uploaded successfully
        // Perform any necessary actions
      } else {
        // Handle error case
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileUpload} accept=".jpg,.jpeg" />

      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(file)} alt={`Selected file ${index}`} style={{margin:"20px", height:"250px",width:"350px"}}  />
            <div>
            <button onClick={() => handleRemoveFile(index)} style={{backgroundColor:"red",margin:"10px"}} >Remove</button>
            </div>
            <div>
            <button onClick={uploadFiles} style={{backgroundColor:"green",margin:"10px"}}>Submit</button>

              </div>
          </div>
        ))}
      </div>

      {errorMessage && <p>{errorMessage}</p>}

    </div>
  );
}

export default Home;
