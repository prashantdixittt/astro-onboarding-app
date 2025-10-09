export const getHeaderNextHandler = (currentStep, mcqState) => {
  switch (currentStep) {
    case 'basicInfo':
      return () => {
        const form = document.querySelector('form');
        if (form) form.requestSubmit();
      };
    case 'prerequisites':
      return () => {
        // This will be handled by the parent component
        return 'prerequisites-next';
      };
    case 'mcq':
      return () => {
        if (mcqState.isLastQuestion) {
          const submitButton = document.querySelector('[data-testid="mcq-submit"]');
          if (submitButton) submitButton.click();
        } else {
          const nextButton = document.querySelector('[data-testid="mcq-next"]');
          if (nextButton) nextButton.click();
        }
      };
    case 'knowledge':
      return () => {
        const submitButton = document.querySelector('[data-testid="knowledge-submit"]');
        if (submitButton) submitButton.click();
      };
    case 'communication':
      return () => {
        const submitButton = document.querySelector('[data-testid="communication-submit"]');
        if (submitButton) submitButton.click();
      };
    default:
      return () => {};
  }
};

export const getHeaderBackHandler = (currentStep) => {
  switch (currentStep) {
    case 'prerequisites':
      return () => {
        // This will be handled by the parent component
        return 'prerequisites-back';
      };
    default:
      return () => {};
  }
};

export const getHeaderDisabledState = (currentStep, formData, mcqState, communicationState) => {
  switch (currentStep) {
    case 'basicInfo':
      // Handle both experienceType (for backward compatibility) and experienceTypes (new multi-select)
      const expertise = formData.experienceType || formData.experienceTypes;
      const isExpertiseValid = Array.isArray(expertise)
        ? expertise.length > 0 && expertise.length <= 3
        : !!expertise;

      return !formData.name ||
             !formData.mobileNumber ||
             !formData.dob ||
             !isExpertiseValid ||
             formData.yearOfExperience < 0;
    case 'prerequisites':
      return false;
    case 'mcq':
      return !mcqState.isCurrentQuestionAnswered;
    case 'knowledge':
      const answerTextarea = document.querySelector('textarea[placeholder*="astrological prediction"]');
      return !answerTextarea || !answerTextarea.value.trim();
    case 'communication':
      return !communicationState.hasAudio && !communicationState.hasTranscript;
    default:
      return false;
  }
};
