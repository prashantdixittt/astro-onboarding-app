# EmailJS Setup Instructions

This guide will help you configure EmailJS to automatically send assessment results to `yadavshashank700@gmail.com` when candidates complete the assessment.

## 📋 Prerequisites

- A Gmail account (or any email service)
- EmailJS account (free tier supports 200 emails/month)

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Click **Sign Up** and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Once logged in, click **Add New Service**
2. Select **Gmail** (or your preferred email provider)
3. Click **Connect Account** and authorize EmailJS to access your Gmail
4. Give your service a name (e.g., "Assessment Results Service")
5. **Copy the Service ID** - you'll need this later (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Use the template below:

#### Template Settings:
    - **Template Name**: `assessment_results_notification`
- **Subject**: `New Assessment Results - {{candidate_name}}`

#### Email Content (HTML):

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ea580c, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .score-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ea580c; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .info-item { background: white; padding: 15px; border-radius: 6px; }
    .info-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .info-value { font-size: 16px; font-weight: bold; color: #1e293b; margin-top: 5px; }
    .grade-excellent { color: #10b981; }
    .grade-good { color: #f59e0b; }
    .grade-needs-improvement { color: #ef4444; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Assessment Results</h1>
      <p style="margin: 0; font-size: 18px;">{{assessment_date}}</p>
    </div>

    <div class="content">
      <h2>Candidate Information</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Name</div>
          <div class="info-value">{{candidate_name}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">{{candidate_email}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Mobile</div>
          <div class="info-value">{{candidate_mobile}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">DOB</div>
          <div class="info-value">{{candidate_dob}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Experience</div>
          <div class="info-value">{{candidate_experience}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expertise</div>
          <div class="info-value">{{candidate_expertise}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Self Rating</div>
          <div class="info-value">{{candidate_self_rating}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Languages</div>
          <div class="info-value">{{candidate_languages}}</div>
        </div>
      </div>

      <h2>Overall Performance</h2>
      <div class="score-card">
        <h1 style="margin: 0; font-size: 48px; color: #ea580c;">{{overall_score}}%</h1>
        <p style="margin: 10px 0 5px 0; font-size: 20px; font-weight: bold;">{{overall_grade}}</p>
        <p style="margin: 0; color: #666;">{{recommendation}}</p>
      </div>

      <h2>Test Breakdown</h2>
      <div class="score-card">
        <h3 style="margin-top: 0;">📝 MCQ Test: {{mcq_score}}%</h3>
        <p style="margin: 5px 0;">Correct Answers: {{mcq_correct}}/{{mcq_total}}</p>
      </div>

      <div class="score-card">
        <h3 style="margin-top: 0;">🎓 Knowledge Test: {{knowledge_score}}%</h3>
        <p style="margin: 5px 0;">Questions Answered: {{knowledge_questions}}</p>
      </div>

      <div class="score-card">
        <h3 style="margin-top: 0;">🎙️ Communication Test: {{communication_score}}%</h3>
        <p style="margin: 5px 0;">Confidence Score: {{communication_confidence}}/100</p>
        <div style="margin-top: 15px;">
          <strong>Breakdown:</strong>
          <ul style="margin: 10px 0;">
            <li>Clarity: {{comm_clarity}}/25</li>
            <li>Vocabulary: {{comm_vocabulary}}/25</li>
            <li>Empathy: {{comm_empathy}}/25</li>
            <li>Structure: {{comm_structure}}/25</li>
          </ul>
        </div>
        <p style="margin-top: 15px;"><strong>Feedback:</strong><br>{{communication_feedback}}</p>
      </div>

      <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #666;">
        This is an automated email from the Astrologer Assessment System
      </p>
    </div>
  </div>
</body>
</html>
```

4. **Copy the Template ID** - you'll need this (e.g., `template_xyz456`)
5. Click **Save**

### Step 4: Get Your Public Key

1. Go to **Account** in the sidebar
2. Find your **Public Key** (e.g., `abc123xyz456`)
3. Copy this key

### Step 5: Configure Your Application

1. Open `src/services/emailService.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your Service ID from Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz456'; // Your Template ID from Step 3
const EMAILJS_PUBLIC_KEY = 'abc123xyz456'; // Your Public Key from Step 4
```

### Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm start
   ```

2. Complete a test assessment
3. View the results to trigger the email
4. Check `yadavshashank700@gmail.com` for the email
5. Check browser console for any errors

---

## 🔍 Troubleshooting

### Email Not Sending?

1. **Check Browser Console**: Look for error messages
2. **Verify Credentials**: Make sure all IDs and keys are correct
3. **Check EmailJS Dashboard**: Go to **History** tab to see failed attempts
4. **CORS Issues**: EmailJS should work from localhost, but check their documentation
5. **Rate Limits**: Free tier is limited to 200 emails/month

### Common Error Messages:

- **"Service ID is invalid"**: Check your Service ID in emailService.js
- **"Template ID is invalid"**: Check your Template ID in emailService.js
- **"Public Key is invalid"**: Check your Public Key in emailService.js
- **"Failed to send email"**: Check EmailJS dashboard for error details

---

## 📊 Email Flow

1. User completes all assessments
2. User clicks "View My Results" button
3. Results modal opens
4. Email is automatically sent in the background
5. Status notification appears in the modal:
   - 📧 **Sending**: Email is being sent
   - ✅ **Success**: Email sent successfully
   - ❌ **Error**: Failed to send (check configuration)

---

## 🔒 Security Notes

⚠️ **Important Security Considerations:**

1. **Client-Side Exposure**: Your EmailJS credentials are visible in the client-side code. Anyone can inspect and potentially abuse them.

2. **Rate Limiting**: EmailJS free tier has a limit of 200 emails/month. Malicious users could exhaust this.

3. **Spam Protection**: EmailJS has some built-in protections, but consider:
   - Adding reCAPTCHA to your forms
   - Implementing server-side rate limiting
   - Monitoring the EmailJS dashboard for unusual activity

4. **Production Recommendation**: For production use, consider:
   - Moving email logic to a backend API
   - Using serverless functions (Vercel, Netlify, AWS Lambda)
   - Keeping credentials secure on the server

---

## 📝 Testing Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created with all variables
- [ ] Service ID, Template ID, and Public Key copied
- [ ] emailService.js updated with credentials
- [ ] Test email sent successfully
- [ ] Email received at yadavshashank700@gmail.com
- [ ] All candidate data appears correctly in email
- [ ] Status notifications work in the UI

---

## 📧 Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Dashboard**: https://dashboard.emailjs.com/
- **EmailJS Support**: https://www.emailjs.com/docs/faq/

---

## 🎉 You're All Set!

Once configured, the system will automatically send a beautifully formatted email with complete assessment results to `yadavshashank700@gmail.com` whenever a candidate views their results.