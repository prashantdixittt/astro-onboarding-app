class GeminiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    
    console.log('Gemini Service initialized');
    console.log('API Key length:', this.apiKey ? this.apiKey.length : 0);
    console.log('API Key starts with:', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'NOT FOUND');
    console.log('Base URL:', this.baseUrl);
  }

  async scoreKnowledgeAnswer(question, correctAnswer, userAnswer, language) {
    const prompt = `
You are an expert astrology evaluator. Please score the user's answer against the correct answer.

Language: ${language}
Question: ${question}
Correct Answer: ${correctAnswer}
User's Answer: ${userAnswer}

Please evaluate the user's answer on these criteria:
1. Accuracy of astrological concepts (40%)
2. Relevance to the question (30%)
3. Proper use of astrological terminology (20%)
4. Overall coherence and structure (10%)

Provide a score out of 100 and brief feedback explaining the score.

Respond in JSON format:
{
  "score": number (0-100),
  "feedback": "detailed explanation",
  "breakdown": {
    "accuracy": number (0-40),
    "relevance": number (0-30),
    "terminology": number (0-20),
    "coherence": number (0-10)
  }
}
`;

    try {
      console.log('Making Gemini API call for knowledge scoring...');
      console.log('API Key present:', !!this.apiKey);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'x-goog-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      const content = data.candidates[0].content.parts[0].text;
      console.log('Generated content:', content);
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Parsed result:', parsed);
        return parsed;
      }
      
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error scoring knowledge answer:', error);
      return {
        score: 0,
        feedback: `Error evaluating answer. Please try again. ${error.message}`,
        breakdown: { accuracy: 0, relevance: 0, terminology: 0, coherence: 0 }
      };
    }
  }

  async scoreCommunicationText(transcript, language, scenario) {
    const prompt = `
You are an expert communication evaluator for astrology consultants. Please analyze this transcript.

Language: ${language}
Scenario: ${scenario}
Transcript: ${transcript}

Evaluate the communication on:
1. Clarity and fluency (25%)
2. Professional vocabulary (25%)
3. Empathy and client connection (25%)
4. Response structure and completeness (25%)

Also estimate confidence level based on text indicators like:
- Use of filler words
- Sentence completion
- Professional tone
- Assertiveness

Respond in JSON format:
{
  "score": number (0-100),
  "confidence": number (0-100),
  "feedback": "detailed explanation",
  "breakdown": {
    "clarity": number (0-25),
    "vocabulary": number (0-25),
    "empathy": number (0-25),
    "structure": number (0-25)
  },
  "issues": ["list of communication issues found"]
}
`;

    try {
      console.log('Making Gemini API call for communication scoring...');
      console.log('Transcript:', transcript);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'x-goog-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      console.log('Communication API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Communication API Error Response:', errorText);
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Communication API Response:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid communication API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      const content = data.candidates[0].content.parts[0].text;
      console.log('Communication generated content:', content);
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Communication parsed result:', parsed);
        return parsed;
      }
      
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Error scoring communication:', error);
      return {
        score: 0,
        confidence: 0,
        feedback: `Error evaluating communication. Please try again. ${error.message}`,
        breakdown: { clarity: 0, vocabulary: 0, empathy: 0, structure: 0 },
        issues: []
      };
    }
  }
}

export default new GeminiService();