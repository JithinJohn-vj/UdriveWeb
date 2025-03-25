/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Paper, FormLabel, Typography, Avatar } from '@mui/material';

const AvatarUpload = ({ label, name, onChange, errors, cloudinaryLink, isEdit, w, h, variant }) => {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEdit && cloudinaryLink) {
      // Set cloudinaryLink as avatar when in edit mode and link exists
      setAvatar(cloudinaryLink.url);
    } else {
      setAvatar(null);
    }
  }, [cloudinaryLink, isEdit]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setAvatar(file);
    if (onChange) {
      onChange(file);
    }
  };

  const handleClick = () => {
    // Trigger file input click when clicking on the avatar
    fileInputRef.current.click();
  };

  return (
    <div className="pt-4 dark:text-white">
      <FormLabel htmlFor={`${name}-upload`} style={{ marginBottom: '1px' }}>
        {label}
      </FormLabel>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar
          variant={variant || null}
          alt="Avatar"
          src={
            avatar
              ? typeof avatar === 'string'
                ? avatar
                : URL.createObjectURL(avatar)
              : 'https://www.svgrepo.com/show/294299/upload.svg'
          }
          onClick={handleClick}
          style={{ width: w ? w : '150px', height: h ? h : '150px', cursor: 'pointer',maxHeight:"600px" }}
        />
      </div>
      <input
        ref={fileInputRef}
        accept="image/*"
        id={`${name}-upload`}
        type="file"
        name={name}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {errors && errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

AvatarUpload.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  cloudinaryLink: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Can be string or object
  isEdit: PropTypes.bool,
};

export default AvatarUpload;
