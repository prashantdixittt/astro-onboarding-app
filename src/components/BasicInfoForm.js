import React, { useState } from 'react';

const BasicInfoForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    dob: '',
    experience: {
      type: '',
      attachments: []
    },
    yearOfExperience: '',
    selfRate: 5
  });

  const [errors, setErrors] = useState({});

  const experienceTypes = [
    'Tarot',
    'Lal Kitab',
    'Palmistry',
    'Vedic Astrology',
    'Numerology',
    'Vastu Shastra',
    'Face Reading',
    'Crystal Healing'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.experience.type) {
      newErrors.experienceType = 'Experience type is required';
    }

    if (!formData.yearOfExperience || formData.yearOfExperience <= 0) {
      newErrors.yearOfExperience = 'Years of experience must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.mobileNumber.trim() &&
      /^\d{10}$/.test(formData.mobileNumber.trim()) &&
      formData.dob &&
      formData.experience.type &&
      formData.yearOfExperience > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // For demo, we'll just use placeholder URLs
    const fileUrls = files.map(file => URL.createObjectURL(file));
    handleInputChange('experience.attachments', fileUrls);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2196f3', marginBottom: '30px' }}>
        🔮 Astrologer Registration
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Name */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.name ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.name}</span>}
        </div>

        {/* Mobile Number */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => {
              // Only allow digits and limit to 10 characters
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              handleInputChange('mobileNumber', value);
            }}
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.mobileNumber ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.mobileNumber && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.mobileNumber}</span>}
          {formData.mobileNumber && (
            <small style={{ color: formData.mobileNumber.length === 10 ? '#4caf50' : '#666', fontSize: '12px' }}>
              {formData.mobileNumber.length}/10 digits
            </small>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.dob ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.dob && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.dob}</span>}
        </div>

        {/* Experience Type */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Area of Expertise *
          </label>
          <select
            value={formData.experience.type}
            onChange={(e) => handleInputChange('experience.type', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.experienceType ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select your expertise</option>
            {experienceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.experienceType && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.experienceType}</span>}
        </div>

        {/* Years of Experience */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
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
              border: `1px solid ${errors.yearOfExperience ? '#f44336' : '#ddd'}`,
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.yearOfExperience && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.yearOfExperience}</span>}
        </div>

        {/* Self Rating */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Rate Yourself (1-10): {formData.selfRate}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.selfRate}
            onChange={(e) => handleInputChange('selfRate', parseInt(e.target.value))}
            style={{
              width: '100%',
              margin: '10px 0'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Certificates/Attachments */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Certificates/Documents (Optional)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            Upload certificates, testimonials, or other relevant documents
          </small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          style={{
            backgroundColor: isFormValid() ? '#4caf50' : '#ccc',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            transition: 'all 0.3s ease',
            opacity: isFormValid() ? 1 : 0.6
          }}
          onMouseOver={(e) => {
            if (isFormValid()) {
              e.target.style.backgroundColor = '#45a049';
            }
          }}
          onMouseOut={(e) => {
            if (isFormValid()) {
              e.target.style.backgroundColor = '#4caf50';
            }
          }}
        >
          Continue to MCQ Test →
        </button>
        
        {!isFormValid() && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#856404'
          }}>
            <strong>⚠️ Please fill in all required fields:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              {!formData.name.trim() && <li>Full Name</li>}
              {(!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber.trim())) && <li>10-digit Mobile Number</li>}
              {!formData.dob && <li>Date of Birth</li>}
              {!formData.experience.type && <li>Area of Expertise</li>}
              {(!formData.yearOfExperience || formData.yearOfExperience <= 0) && <li>Years of Experience (greater than 0)</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default BasicInfoForm;