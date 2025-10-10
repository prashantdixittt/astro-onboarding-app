import React, { useState } from 'react';
import { supportedLanguages } from '../data/mcqQuestionsMultilingual';

const BasicInfoForm = ({ onComplete, onFormDataChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    dob: '',
    experienceTypes: [], // Changed to array for multi-select
    yearOfExperience: '',
    selfRate: 5,
    preferredLanguage: 'english', // Added language preference
    comfortableLanguages: [], // Languages you are comfortable in
  });

  const [errors, setErrors] = useState({});

  const experienceTypes = [
    'Tarot', 'Lal Kitab', 'Palmistry', 'Vedic Astrology',
    'Numerology', 'Vastu Shastra', 'Face Reading', 'Crystal Healing'
  ];

  const availableLanguages = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Marathi',
    'Bengali', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi'
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

    if (!formData.experienceTypes || formData.experienceTypes.length === 0) {
      newErrors.experienceTypes = 'Please select at least one area of expertise';
    } else if (formData.experienceTypes.length > 3) {
      newErrors.experienceTypes = 'Please select maximum 3 areas of expertise';
    }

    if (!formData.comfortableLanguages || formData.comfortableLanguages.length === 0) {
      newErrors.comfortableLanguages = 'Please select at least one language';
    }

    if (formData.yearOfExperience === '' || formData.yearOfExperience < 0 || formData.yearOfExperience > 50) {
      newErrors.yearOfExperience = 'Please enter a valid number of years (0-50)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field, value) => {
    const newErrors = {};

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        }
        break;
      case 'mobileNumber':
        if (!value.trim()) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
        }
        break;
      case 'dob':
        if (!value) {
          newErrors.dob = 'Date of birth is required';
        }
        break;
      case 'experienceTypes':
        if (!value || value.length === 0) {
          newErrors.experienceTypes = 'Please select at least one area of expertise';
        } else if (value.length > 3) {
          newErrors.experienceTypes = 'Please select maximum 3 areas of expertise';
        }
        break;
      case 'comfortableLanguages':
        if (!value || value.length === 0) {
          newErrors.comfortableLanguages = 'Please select at least one language';
        }
        break;
      case 'yearOfExperience':
        if (value === '' || value < 0 || value > 50) {
          newErrors.yearOfExperience = 'Please enter a valid number of years (0-50)';
        }
        break;
      default:
        break;
    }

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    if (onFormDataChange) {
      // Also pass experienceType for header validation
      const dataForParent = {
        ...newFormData,
        experienceType: field === 'experienceTypes' ? value : newFormData.experienceTypes
      };
      onFormDataChange(dataForParent);
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field, value) => {
    const fieldErrors = validateField(field, value);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleExpertiseToggle = (type) => {
    let newExpertise = [...formData.experienceTypes];
    if (newExpertise.includes(type)) {
      newExpertise = newExpertise.filter(t => t !== type);
    } else {
      if (newExpertise.length < 3) {
        newExpertise.push(type);
      } else {
        // Show warning if trying to select more than 3
        return;
      }
    }
    handleInputChange('experienceTypes', newExpertise);
  };

  const handleLanguageToggle = (language) => {
    let newLanguages = [...formData.comfortableLanguages];
    if (newLanguages.includes(language)) {
      newLanguages = newLanguages.filter(l => l !== language);
    } else {
      newLanguages.push(language);
    }
    handleInputChange('comfortableLanguages', newLanguages);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Transform experienceTypes array to experienceType for backward compatibility
      const submissionData = {
        ...formData,
        experienceType: formData.experienceTypes // MCQTest expects this as array or string
      };
      onComplete(submissionData);
    }
  };

  const isFormValid = () => {
    return formData.name &&
           formData.mobileNumber &&
           formData.dob &&
           formData.experienceTypes &&
           formData.experienceTypes.length > 0 &&
           formData.experienceTypes.length <= 3 &&
           formData.comfortableLanguages &&
           formData.comfortableLanguages.length > 0 &&
           formData.yearOfExperience !== '' && formData.yearOfExperience >= 0;
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      padding: '10px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '25px'
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
                onBlur={(e) => handleBlur('name', e.target.value)}
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
                onBlur={(e) => handleBlur('mobileNumber', e.target.value)}
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
          <div style={{ marginBottom: '30px' }}>
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
              onBlur={(e) => handleBlur('dob', e.target.value)}
              min="1900-01-01"
              max="2024-12-31"
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

          {/* Areas of Expertise - Multi-select */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Areas of Expertise * (Select 1-3)
            </label>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '10px'
            }}>
              {formData.experienceTypes.length > 0
                ? `${formData.experienceTypes.length} selected`
                : 'Select at least one area'}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '10px'
            }}>
              {experienceTypes.map((type) => {
                const isSelected = formData.experienceTypes.includes(type);
                const isDisabled = !isSelected && formData.experienceTypes.length >= 3;

                return (
                  <div
                    key={type}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      border: `2px solid ${isSelected ? '#ea580c' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      backgroundColor: isSelected ? '#ffedd5' : isDisabled ? '#f3f4f6' : 'white',
                      opacity: isDisabled ? 0.6 : 1,
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(234, 88, 12, 0.2)' : 'none'
                    }}
                    onClick={(e) => {
                      if (!isDisabled) {
                        handleExpertiseToggle(type);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by div onClick
                      disabled={isDisabled}
                      style={{
                        marginRight: '12px',
                        transform: 'scale(1.3)',
                        accentColor: '#ea580c',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        pointerEvents: 'none'
                      }}
                    />
                    <span style={{ fontWeight: '500', color: isSelected ? '#ea580c' : '#374151' }}>{type}</span>
                  </div>
                );
              })}
            </div>
            {errors.experienceTypes && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                {errors.experienceTypes}
              </p>
            )}
          </div>

          {/* Languages You Are Comfortable In - Multi-select */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Languages You Are Comfortable In * (Select all that apply)
            </label>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '10px'
            }}>
              {formData.comfortableLanguages.length > 0
                ? `${formData.comfortableLanguages.length} selected`
                : 'Select at least one language'}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '10px'
            }}>
              {availableLanguages.map((language) => {
                const isSelected = formData.comfortableLanguages.includes(language);

                return (
                  <div
                    key={language}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      border: `2px solid ${isSelected ? '#ea580c' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#ffedd5' : 'white',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(234, 88, 12, 0.2)' : 'none'
                    }}
                    onClick={() => handleLanguageToggle(language)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by div onClick
                      style={{
                        marginRight: '12px',
                        transform: 'scale(1.3)',
                        accentColor: '#ea580c',
                        cursor: 'pointer',
                        pointerEvents: 'none'
                      }}
                    />
                    <span style={{ fontWeight: '500', fontSize: '14px', color: isSelected ? '#ea580c' : '#374151' }}>{language}</span>
                  </div>
                );
              })}
            </div>
            {errors.comfortableLanguages && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>
                {errors.comfortableLanguages}
              </p>
            )}
          </div>

          {/* Preferred Language */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Preferred Language for Assessment *
            </label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {supportedLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '5px'
            }}>
              All questions will be displayed in your selected language
            </p>
          </div>

          {/* Years of Experience */}
          <div style={{ marginBottom: '30px' }}>
            <div>
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 50)) {
                    handleInputChange('yearOfExperience', value === '' ? '' : parseInt(value));
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                  handleBlur('yearOfExperience', value);
                }}
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
          </div>

          {/* Self Rating */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Self Rating (1-10) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.selfRate}
                onChange={(e) => handleInputChange('selfRate', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, #ea580c 0%, #ea580c ${(formData.selfRate - 1) * 11.11}%, #e5e7eb ${(formData.selfRate - 1) * 11.11}%, #e5e7eb 100%)`,
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Beginner</span>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#ea580c',
                  padding: '4px 12px',
                  backgroundColor: '#ffedd5',
                  borderRadius: '20px',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>
                  {formData.selfRate}
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Expert</span>
              </div>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '5px'
            }}>
              Rate your expertise level in astrology
            </p>
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