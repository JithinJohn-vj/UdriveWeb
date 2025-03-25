/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Grid, Fade, Paper, Modal, Backdrop, FormLabel, Typography } from '@mui/material';

import UploadIllustration from 'src/Illusration/UploadIllustration';

const MultipleFileUpload = ({ label, name, onChange, errors, cloudinaryLink, isEdit }) => {
  console.log(cloudinaryLink);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (file) => {
    setSelectedImage(file);
    setOpen(true);
  };

  useEffect(() => {
    setPreviewFiles([]);
  }, [isEdit]);


  
  console.log(previewFiles);
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const filesArray = Array.from(files);
    setPreviewFiles(filesArray);
    if (onChange) {
      onChange(filesArray);
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
          <Grid item xs={previewFiles.length > 0 || cloudinaryLink ? 6 : 12}>
            <FormLabel htmlFor={`${name}-upload`}>
              <div className="cursor-pointer p-4 w-full  border border-dashed flex justify-center items-center ">
                <UploadIllustration width="70%" height="0%" />
              </div>
              <Typography className="text-center sticky" variant="body1">
                Click or drag files to this area to upload (Images/PDFs)
              </Typography>
            </FormLabel>
          </Grid>
          <Grid item xs={previewFiles.length > 0 || cloudinaryLink ? 6 : 12}>
            {cloudinaryLink && !previewFiles.length > 0 ? (
              <>
                {cloudinaryLink.filetype === 'image' ? (
                  <div>
                    <img
                      src={cloudinaryLink.url}
                      alt="Cloudinary Link"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleOpen(cloudinaryLink)}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      Cloud
                    </Typography>
                  </div>
                ) : (
                  <>
                    {cloudinaryLink.filetype === 'pdf' && (
                      <iframe
                        title="PDF Preview"
                        src={cloudinaryLink.url}
                        style={{ width: '100%', height: '500px' }}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              previewFiles &&
              previewFiles.length > 0 && (
                <div>
                  {previewFiles.map((file, index) => (
                    <div key={index}>
                      {file.type.includes('image') ? (
                        <div>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleOpen(file)}
                          />
                          <Typography variant="h6" gutterBottom>
                            {file.name}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Size: {(file.size / 1024).toFixed(2)} KB
                          </Typography>
                        </div>
                      ) : (
                        <iframe
                          title="PDF Preview"
                          src={URL.createObjectURL(file)}
                          style={{ width: '100%', height: '500px' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )
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
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0, 0, 0, 0)' }, // Transparent black backdrop
          }}
        >
          <Fade in={open}>
            <div>
              {selectedImage && cloudinaryLink && !previewFiles.length > 0 ? (
                <img
                  src={cloudinaryLink}
                  alt="cloud"
                  style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              ) : (
                <>
                  {selectedImage && (
                    <img
                      src={selectedImage && URL?.createObjectURL(selectedImage)}
                      alt={selectedImage?.name}
                      style={{
                        maxWidth: '80%',
                        maxHeight: '80%',
                        margin: 'auto',
                        display: 'block',
                      }}
                    />
                  )}
                </>
              )}
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
  cloudinaryLink: PropTypes.string, // New prop for cloudinary link
};

export default MultipleFileUpload;
