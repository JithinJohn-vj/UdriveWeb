/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Fade,
  Paper,
  Modal,
  Backdrop,
  FormLabel,
  Typography,
  IconButton,
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete'; // Importing Delete icon

import UploadIllustration from 'src/Illusration/UploadIllustration'; // Replace with your actual illustration import


const MultipleFileUpload = ({ label, name, onChange, errors, cloudinaryLink, isEdit }) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Initialize with cloudinaryLink files if available
    if (cloudinaryLink?.length) {
      setPreviewFiles(cloudinaryLink);
    }
  }, [cloudinaryLink, isEdit]);

  const handleOpen = (file) => {
    setSelectedImage(file);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const filesArray = Array.from(files).map((file) => ({
      filetype: file.type.includes('image') ? 'image' : 'pdf',
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    // Merge existing previewFiles with new files
    const updatedFiles = [...previewFiles, ...filesArray];
    setPreviewFiles(updatedFiles);

    // Pass the updated files to the parent component
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  const handleRemove = (index) => {
    const updatedFiles = previewFiles.filter((_, i) => i !== index);
    setPreviewFiles(updatedFiles);

    // Pass the updated files to the parent component after removal
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  return (
    <div className="pt-4 dark:text-white">
      <Paper
        component="form"
        elevation={3}
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Grid container spacing={2} style={{ height: '300px', overflow: 'auto' }}>
          <Grid item xs={previewFiles.length > 0 ? 6 : 12}>
            <FormLabel htmlFor={`${name}-upload`}>
              <div className="cursor-pointer p-4 w-full border border-dashed flex justify-center items-center">
                <UploadIllustration width="70%" height="0%" />
              </div>
              <Typography className="text-center sticky" variant="body1">
                Click or drag files to this area to upload (Images/PDFs)
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={previewFiles.length > 0 ? 6 : 12}>
            {previewFiles.length > 0 ? (
              previewFiles.map((file, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {file.filetype === 'image' ? (
                      <div>
                        <img
                          src={file.url}
                          alt={file.name || `File ${index}`}
                          style={{
                            maxWidth: '100px',
                            maxHeight: '100px',
                            width: 'auto',
                            height: 'auto',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleOpen(file)}
                        />
                      </div>
                    ) : (
                      file.filetype === 'pdf' && (
                        <iframe
                          title={`PDF Preview ${index}`}
                          src={file.url}
                          style={{ width: '100px', height: '100px' }}
                        />
                      )
                    )}
                    <Typography variant="subtitle2" gutterBottom style={{ marginLeft: '10px', flexGrow: 1 }}>
                      {file.name || 'Uploaded File'}
                    </Typography>
                    <IconButton onClick={() => handleRemove(index)} color="error">
                    ❌         
                               </IconButton>
                  </div>
                  <Typography variant="body1" gutterBottom>
                    Size: {file.size ? (file.size / 1024).toFixed(2) : 'N/A'} KB
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body1" gutterBottom>
                No files uploaded yet.
              </Typography>
            )}
          </Grid>
        </Grid>
        <input
          accept="image/*, application/pdf"
          id={`${name}-upload`}
          type="file"
          name={name}
          style={{ display: 'none' }}
          onChange={handleChange}
          multiple
        />
        {errors && errors[name] && <p>{errors[name].message}</p>}

        {/* Modal for image preview */}
        <Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={open}
  onClose={handleClose}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
>
  <Fade in={open}>
    <div
      style={{
        position: 'relative',
        maxWidth: '80%',
        maxHeight: '80%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        overflowY:"auto"
      }}
    >
      {selectedImage && selectedImage.url ? (
        <img
          src={selectedImage.url}
          alt="cloud"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            marginBottom: '10px',
          }}
        />
      ) : null}

      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        ❌
      </IconButton>
    </div>
  </Fade>
</Modal>
      </Paper>
    </div>
  );
};

MultipleFileUpload.propTypes = {
  label: PropTypes.string.isRequired,
  isEdit: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  cloudinaryLink: PropTypes.arrayOf(
    PropTypes.shape({
      filetype: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
      size: PropTypes.number,
    })
  ),
};

export default MultipleFileUpload;
