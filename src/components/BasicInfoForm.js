import React, { useState } from 'react';

const BasicInfoForm = ({ onComplete, onFormDataChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    dob: '',
    experienceType: '',
    yearOfExperience: 0,
    selfRate: 5,
    resume: null
  });

  const [errors, setErrors] = useState({});

  const experienceTypes = [
    'Tarot', 'Lal Kitab', 'Palmistry', 'Vedic Astrology', 
    'Numerology', 'Vastu Shastra', 'Face Reading', 'Crystal Healing'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.experienceType) {
      newErrors.experienceType = 'Please select your area of expertise';
    }

    if (formData.yearOfExperience < 0 || formData.yearOfExperience > 50) {
      newErrors.yearOfExperience = 'Please enter a valid number of years (0-50)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFormData = { ...formData, resume: file };
      setFormData(newFormData);
      if (onFormDataChange) {
        onFormDataChange(newFormData);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const isFormValid = () => {
    return formData.name && 
           formData.mobileNumber && 
           formData.dob && 
           formData.experienceType && 
           formData.yearOfExperience >= 0;
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 100px)', 
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '20px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '20px'
        }}>
          <h1 style={{ 
            margin: 0,
            color: '#ea580c',
            fontSize: '24px'
          }}>
            Registration
          </h1>
        </div>
        
        <p style={{ 
          color: '#64748b',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Tell us about yourself and your astrological expertise. This information helps us personalize your assessment experience.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name and Mobile */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.name && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    handleInputChange('mobileNumber', value);
                  }
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.mobileNumber ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.mobileNumber && (
                <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                  {errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Date of Birth *
            </label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.dob ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            {errors.dob && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                {errors.dob}
              </p>
            )}
          </div>

          {/* Experience Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Area of Expertise *
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '10px' 
            }}>
              {experienceTypes.map((type) => (
                <label
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    border: `2px solid ${formData.experienceType === type ? '#ea580c' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: formData.experienceType === type ? '#fef3c7' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="experienceType"
                    value={type}
                    checked={formData.experienceType === type}
                    onChange={(e) => handleInputChange('experienceType', e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <span style={{ fontWeight: '500' }}>{type}</span>
                </label>
              ))}
            </div>
            {errors.experienceType && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                {errors.experienceType}
              </p>
            )}
          </div>

          {/* Years of Experience */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Years of Experience *
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.yearOfExperience}
              onChange={(e) => handleInputChange('yearOfExperience', parseInt(e.target.value) || 0)}
              placeholder="Enter years of experience"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.yearOfExperience ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            {errors.yearOfExperience && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                {errors.yearOfExperience}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Resume/CV (Optional)
            </label>
            <div style={{
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f9fafb'
            }}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📄</div>
                <div style={{ 
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {formData.resume ? formData.resume.name : 'Click to upload resume'}
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginTop: '5px'
                }}>
                  PDF, JPG, PNG up to 10MB
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button - Hidden, handled by header */}
          <button
            type="submit"
            disabled={!isFormValid()}
            style={{ display: 'none' }}
          >
            Continue to MCQ Test →
          </button>
          
          {!isFormValid() && (
            <div style={{ 
              marginTop: '15px',
              padding: '15px', 
              backgroundColor: '#fef3c7', 
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#92400e'
            }}>
              <strong>⚠️ Please complete all required fields to continue</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BasicInfoForm;