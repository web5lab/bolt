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
    body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #fed7aa 0%, #fdba74 50%, #fb923c 100%); min-height: 100vh; position: relative;',
    bodyOverlay: 'position: absolute; inset: 0; opacity: 0.3; background-image: url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a574\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3Ccircle cx=\'53\' cy=\'53\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'43\' r=\'1\'/%3E%3Ccircle cx=\'47\' cy=\'17\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");',
    container: 'max-width: 600px; margin: auto; padding: 40px 20px;',
    card: 'background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 30px 20px 35px 25px; box-shadow: 8px 8px 0px rgba(245, 158, 11, 0.3), 0 25px 60px rgba(245, 158, 11, 0.15); overflow: hidden; border: 3px solid #fbbf24; position: relative;',
    cardDecorative: 'position: absolute; top: 8px; right: 8px; width: 16px; height: 16px; background: #fbbf24; border-radius: 50%; opacity: 0.6;',
    cardDecorative2: 'position: absolute; top: 16px; left: 16px; width: 12px; height: 12px; border: 2px solid #f59e0b; opacity: 0.5; transform: rotate(45deg);',
    header: 'background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 50px 40px; text-align: center; position: relative; overflow: hidden; border-radius: 27px 17px 32px 22px 0 0 0 0;',
    headerOverlay: 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;',
    headerDecorative: 'position: absolute; top: 12px; right: 12px; width: 20px; height: 20px; border: 2px dashed #ffffff; border-radius: 60% 40% 70% 30%; opacity: 0.4; transform: rotate(12deg);',
    headerDecorative2: 'position: absolute; bottom: 12px; left: 12px; width: 16px; height: 16px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; opacity: 0.6;',
    logo: 'font-size: 32px; font-weight: 800; margin: 0; color: white; position: relative; z-index: 1; letter-spacing: -0.5px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);',
    tagline: 'font-size: 16px; margin: 8px 0 0 0; opacity: 0.95; font-weight: 600; position: relative; z-index: 1; color: rgba(255, 255, 255, 0.95);',
    content: 'padding: 50px 40px;',
    heading: 'font-size: 28px; color: #1f2937; margin-bottom: 24px; font-weight: 800; line-height: 1.2; background: linear-gradient(135deg, #f59e0b, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative;',
    headingUnderline: 'position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 120px; height: 3px;',
    paragraph: 'font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.7; font-weight: 500;',
    buttonContainer: 'text-align: center; margin: 40px 0; padding: 20px 0;',
    button: 'display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 25px 15px 30px 20px; font-weight: 700; font-size: 16px; box-shadow: 4px 4px 0px rgba(245, 158, 11, 0.4), 0 10px 30px rgba(245, 158, 11, 0.3); transition: all 0.3s ease; border: none; cursor: pointer; position: relative; overflow: hidden;',
    buttonHover: 'transform: translateY(-2px) scale(1.05); box-shadow: 6px 6px 0px rgba(245, 158, 11, 0.5), 0 15px 40px rgba(245, 158, 11, 0.4);',
    highlight: 'background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1)); padding: 24px; border-radius: 20px 15px 25px 10px; margin: 24px 0; border: 3px dashed #f59e0b; position: relative;',
    highlightDecorative: 'position: absolute; top: 8px; right: 8px; width: 12px; height: 12px; background: #fbbf24; border-radius: 50%; opacity: 0.6;',
    footer: 'text-align: center; color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 30px; border-top: 2px dashed #d1d5db;',
    link: 'color: #f59e0b; text-decoration: none; font-weight: 600;',
    divider: 'height: 2px; background: linear-gradient(90deg, transparent, #f59e0b, transparent); margin: 30px 0; border-radius: 2px;',
    badge: 'display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 6px 12px; border-radius: 15px 10px 20px 15px; font-size: 12px; font-weight: 700; margin-left: 8px; box-shadow: 3px 3px 0px rgba(16, 185, 129, 0.3);',
    glassEffect: 'background: rgba(245, 158, 11, 0.1); backdrop-filter: blur(10px); border: 2px dashed #f59e0b; border-radius: 20px 15px 25px 10px; padding: 20px; margin: 20px 0; position: relative;',
    glassDecorative: 'position: absolute; top: 8px; left: 8px; width: 8px; height: 8px; background: #fbbf24; border-radius: 50%; opacity: 0.5;',
    glassDecorative2: 'position: absolute; bottom: 8px; right: 8px; width: 10px; height: 10px; border: 2px solid #f59e0b; opacity: 0.4; transform: rotate(45deg); border-radius: 30% 70%;'
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to redesignr.ai ✨</title>
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
          .float-animation {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
        </style>
      </head>
      <body style="${styles.body}">
        <div style="${styles.bodyOverlay}"></div>
        <div style="${styles.container}">
          <div style="${styles.card}">
            <div style="${styles.cardDecorative}"></div>
            <div style="${styles.cardDecorative2}"></div>
            <div style="${styles.header}">
              <div style="${styles.headerOverlay}"></div>
              <div style="${styles.headerDecorative}"></div>
              <div style="${styles.headerDecorative2}"></div>
              <h1 style="${styles.logo}">redesignr<span style="color: #fed7aa;">.ai</span></h1>
              <p style="${styles.tagline}">🎨 AI-Powered Website Builder</p>
            </div>
            <div style="${styles.content}">
              <h2 style="${styles.heading}">Welcome, ${username}! 👋
                <svg style="${styles.headingUnderline}" viewBox="0 0 120 12" fill="none">
                  <path d="M5 8 Q60 2 115 8" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                </svg>
                <span style="${styles.badge}">PREMIUM</span>
              </h2>
              
              <p style="${styles.paragraph}">You've just joined the future of web design! 🚀 redesignr.ai isn't just another website builder — it's your <strong>AI-powered design partner</strong> that transforms ideas into stunning websites in seconds with our hand-crafted, conversion-optimized approach. ✨</p>
              
              <div style="${styles.highlight}">
                <div style="${styles.highlightDecorative}"></div>
                <p style="${styles.paragraph}; margin-bottom: 0; color: #1f2937;">🎯 <strong>What's next?</strong> Create high-converting landing pages, redesign existing websites, or generate beautiful documentation from GitHub repos with our cutting-edge AI technology. No coding required, unlimited creative possibilities! 🎨</p>
              </div>
              
              <div style="${styles.buttonContainer}">
                <a href="https://redesignr.ai/dashboard" style="${styles.button}" class="button-shine">
                  🚀 Launch Dashboard ✨
                </a>
              </div>
              
              <div style="${styles.divider}"></div>
              
              <div style="${styles.glassEffect}">
                <div style="${styles.glassDecorative}"></div>
                <div style="${styles.glassDecorative2}"></div>
                <p style="${styles.paragraph}; margin-bottom: 16px; color: #1f2937;"><strong>🎯 Pro Tips for Success:</strong></p>
                <p style="${styles.paragraph}; margin-bottom: 8px; font-size: 14px; color: #374151;">🎨 Start with our AI prompt builder for instant, conversion-optimized results</p>
                <p style="${styles.paragraph}; margin-bottom: 8px; font-size: 14px; color: #374151;">🔄 Clone any website URL and customize it with our hand-drawn aesthetic</p>
                <p style="${styles.paragraph}; margin-bottom: 8px; font-size: 14px; color: #374151;">📚 Transform GitHub repos into beautiful, searchable documentation</p>
                <p style="${styles.paragraph}; margin-bottom: 0; font-size: 14px; color: #374151;">🎪 Use our 1600+ premium templates for professional, unique designs</p>
              </div>
              
              <p style="${styles.paragraph}">Questions? Our creative team is here to help! 💬 Reach out to us at <a href="mailto:shiva@redesignr.ai" style="${styles.link}">shiva@redesignr.ai</a> or just reply to this email. We love hearing from our community! 🤗</p>
              
              <div style="${styles.footer}">
                <p style="margin-bottom: 16px; font-weight: 600;">© 2025 redesignr.ai — Hand-crafted with ❤️ and AI magic for creators ✨</p>
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
