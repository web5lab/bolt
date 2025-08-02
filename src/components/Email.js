import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// Configure transport - replace with your actual email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


// HTML template for password reset email



// Welcome email after successful registration
const sendWelcomeEmail = async (email, userName) => {
  const html = createEmailTemplate(userName,);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to redesignr.ai!',
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
};


// createEmailTemplate.js
const createEmailTemplate = (username) => {
  const styles = {
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;',
    container: 'max-width: 600px; margin: auto; padding: 40px 20px;',
    card: 'background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);',
    header: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; text-align: center; position: relative; overflow: hidden;',
    headerOverlay: 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;',
    logo: 'font-size: 32px; font-weight: 800; margin: 0; background: linear-gradient(45deg, #ffffff, #f0f0f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; z-index: 1; letter-spacing: -0.5px;',
    tagline: 'font-size: 16px; margin: 8px 0 0 0; opacity: 0.9; font-weight: 500; position: relative; z-index: 1;',
    content: 'padding: 50px 40px;',
    heading: 'font-size: 28px; color: #1a1a1a; margin-bottom: 24px; font-weight: 700; line-height: 1.2; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;',
    paragraph: 'font-size: 16px; color: #4a5568; margin-bottom: 24px; line-height: 1.6; font-weight: 400;',
    buttonContainer: 'text-align: center; margin: 40px 0; padding: 20px 0;',
    button: 'display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; border: none; cursor: pointer; position: relative; overflow: hidden;',
    buttonHover: 'transform: translateY(-2px); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);',
    highlight: 'background: linear-gradient(135deg, #667eea20, #764ba220); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 4px solid #667eea;',
    footer: 'text-align: center; color: #8e9aaf; font-size: 14px; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;',
    link: 'color: #667eea; text-decoration: none; font-weight: 500;',
    divider: 'height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 30px 0;',
    badge: 'display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);',
    glassEffect: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 20px; margin: 20px 0;'
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to redesignr.ai</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          * { box-sizing: border-box; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .button-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
          }
          .button-shine:hover::before {
            left: 100%;
          }
          @media (max-width: 640px) {
            .container { padding: 20px 10px !important; }
            .content { padding: 30px 20px !important; }
            .header { padding: 40px 20px !important; }
            .logo { font-size: 28px !important; }
            .heading { font-size: 24px !important; }
          }
        </style>
      </head>
      <body style="${styles.body}">
        <div style="${styles.container}">
          <div style="${styles.card}">
            <div style="${styles.header}">
              <div style="${styles.headerOverlay}"></div>
              <h1 style="${styles.logo}">redesignr.ai</h1>
              <p style="${styles.tagline}">AI-Powered Website Builder</p>
            </div>
            <div style="${styles.content}">
              <h2 style="${styles.heading}">Welcome, ${username}! 
                <span style="${styles.badge}">PREMIUM</span>
              </h2>
              
              <p style="${styles.paragraph}">You've just joined the future of web design. redesignr.ai isn't just another website builder — it's your AI-powered design partner that transforms ideas into stunning websites in seconds.</p>
              
              <div style="${styles.highlight}">
                <p style="${styles.paragraph}; margin-bottom: 0;">🚀 <strong>What's next?</strong> Create, redesign, or clone any website with our cutting-edge AI technology. No coding required, unlimited possibilities.</p>
              </div>
              
              <div style="${styles.buttonContainer}">
                <a href="https://redesignr.ai/dashboard" style="${styles.button}" class="button-shine">
                  ✨ Launch Dashboard
                </a>
              </div>
              
              <div style="${styles.divider}"></div>
              
              <div style="${styles.glassEffect}">
                <p style="${styles.paragraph}; margin-bottom: 16px; color: #2d3748;"><strong>🎯 Pro Tips:</strong></p>
                <p style="${styles.paragraph}; margin-bottom: 8px; font-size: 14px;">• Start with our AI prompt builder for instant results</p>
                <p style="${styles.paragraph}; margin-bottom: 8px; font-size: 14px;">• Clone any website URL and customize it instantly</p>
                <p style="${styles.paragraph}; margin-bottom: 0; font-size: 14px;">• Use our premium templates for professional designs</p>
              </div>
              
              <p style="${styles.paragraph}">Questions? Our team is here to help. Reach out to us at <a href="mailto:shiva@redesignr.ai" style="${styles.link}">shiva@redesignr.ai</a> or just reply to this email.</p>
              
              <div style="${styles.footer}">
                <p style="margin-bottom: 16px;">© 2025 redesignr.ai — Crafted with ❤️ for creators</p>
                <p>
                  <a href="https://redesignr.ai/unsubscribe?email=${encodeURIComponent(username)}" style="${styles.link}">Unsubscribe</a> • 
                  <a href="https://redesignr.ai/privacy" style="${styles.link}">Privacy Policy</a> • 
                  <a href="https://redesignr.ai/terms" style="${styles.link}">Terms</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};




export {
  sendWelcomeEmail,
};
