import emailjs from '@emailjs/browser';
import emailConfig from '../config/emailConfig';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_eevzhui';
const EMAILJS_TEMPLATE_ID = 'template_rzhq24r';
const EMAILJS_PUBLIC_KEY = 'yGuru69BKZtLdRIDi';

/**
 * Sends assessment results email to the configured recipient
 * @param {Object} params - Email parameters
 * @param {Object} params.basicInfo - Candidate basic information
 * @param {Object} params.scores - Test scores (overall, mcq, knowledge, communication)
 * @param {Object} params.mcqResults - MCQ test results
 * @param {Object} params.knowledgeResults - Knowledge test results
 * @param {Object} params.communicationResults - Communication test results
 * @returns {Promise} EmailJS send promise
 */
export const sendResultsEmail = async ({
  basicInfo,
  scores,
  mcqResults,
  knowledgeResults,
  communicationResults
}) => {
  try {
    // Check if email sending is enabled
    if (!emailConfig.ENABLE_EMAIL_SENDING) {
      console.log('Email sending is disabled in config');
      return { success: false, disabled: true, message: 'Email sending is disabled' };
    }

    // Format the email template parameters
    const templateParams = {
      // Recipient
      to_email: emailConfig.RECIPIENT_EMAIL,

      // Candidate Info
      candidate_name: basicInfo?.name || 'N/A',
      candidate_email: basicInfo?.email || 'N/A',
      candidate_mobile: basicInfo?.mobileNumber || 'N/A',
      candidate_dob: basicInfo?.dob || 'N/A',
      candidate_experience: `${basicInfo?.yearOfExperience !== undefined && basicInfo?.yearOfExperience !== null ? basicInfo.yearOfExperience : 0} years`,
      candidate_expertise: Array.isArray(basicInfo?.experienceType)
        ? basicInfo.experienceType.join(', ')
        : basicInfo?.experienceType || 'N/A',
      candidate_self_rating: `${basicInfo?.selfRate || 0}/10`,
      candidate_languages: basicInfo?.comfortableLanguages?.join(', ') || 'N/A',

      // Overall Score
      overall_score: scores?.overall || 0,
      overall_grade: scores?.overall >= 80 ? 'Excellent' :
                     scores?.overall >= 60 ? 'Good' : 'Needs Improvement',
      recommendation: scores?.overall >= 80 ? 'Recommended for onboarding' :
                      scores?.overall >= 60 ? 'Additional training suggested' :
                      'Comprehensive training required',

      // Test Scores
      mcq_score: scores?.mcq || 0,
      mcq_correct: mcqResults?.mcqResults?.correctAnswers || 0,
      mcq_total: mcqResults?.mcqResults?.totalQuestions || 0,

      knowledge_score: scores?.knowledge || 0,
      knowledge_questions: knowledgeResults?.detailedResults?.length || 0,

      // Knowledge Test Feedback - compile all question feedbacks
      knowledge_feedback: knowledgeResults?.detailedResults
        ?.map((result, index) =>
          `Q${index + 1} (${result.result.score}/100): ${result.result.feedback || 'No feedback'}`
        )
        .join('\n\n') || 'No feedback available',

      communication_score: scores?.communication || 0,
      communication_confidence: communicationResults?.result?.confidence || 0,

      // Communication Breakdown
      comm_clarity: communicationResults?.result?.breakdown?.clarity || 0,
      comm_vocabulary: communicationResults?.result?.breakdown?.vocabulary || 0,
      comm_empathy: communicationResults?.result?.breakdown?.empathy || 0,
      comm_structure: communicationResults?.result?.breakdown?.structure || 0,

      // Feedback
      communication_feedback: communicationResults?.result?.feedback || 'No feedback available',

      // Timestamp
      assessment_date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};