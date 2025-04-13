// privacy-policy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div>
      
      

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>1. Introduction</h2>
          <p style={{ marginBottom: '1rem' }}>
            Welcome to FASHION CORNER . We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>2. Information We Collect</h2>
          <p style={{ marginBottom: '1rem' }}>We may collect the following types of information:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address, payment information.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Order Information:</strong> Products purchased, order history, preferences.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Technical Information:</strong> IP address, browser type, device information, cookies, and usage data.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Communication Data:</strong> Customer service inquiries, feedback, and survey responses.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: '1rem' }}>We use your information for the following purposes:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>To process and fulfill your orders</li>
            <li style={{ marginBottom: '0.5rem' }}>To communicate with you about your orders, account, or inquiries</li>
            <li style={{ marginBottom: '0.5rem' }}>To improve our products, services, and website functionality</li>
            <li style={{ marginBottom: '0.5rem' }}>To personalize your shopping experience</li>
            <li style={{ marginBottom: '0.5rem' }}>To prevent fraud and enhance security</li>
            <li style={{ marginBottom: '0.5rem' }}>To comply with legal obligations</li>
            <li style={{ marginBottom: '0.5rem' }}>For marketing purposes (with your consent)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>4. Sharing Your Information</h2>
          <p style={{ marginBottom: '1rem' }}>We may share your information with:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Payment processors to complete transactions</li>
            <li style={{ marginBottom: '0.5rem' }}>Shipping carriers to deliver your orders</li>
            <li style={{ marginBottom: '0.5rem' }}>Service providers who assist with our business operations</li>
            <li style={{ marginBottom: '0.5rem' }}>Legal authorities when required by law</li>
            <li style={{ marginBottom: '0.5rem' }}>Business partners in case of mergers or acquisitions</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>5. Cookies and Tracking Technologies</h2>
          <p style={{ marginBottom: '1rem' }}>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand customer behavior. You can control cookies through your browser settings.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>6. Data Security</h2>
          <p style={{ marginBottom: '1rem' }}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>7. Your Rights</h2>
          <p style={{ marginBottom: '1rem' }}>Depending on your location, you may have the right to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Access, correct, or delete your personal information</li>
            <li style={{ marginBottom: '0.5rem' }}>Object to or restrict certain processing activities</li>
            <li style={{ marginBottom: '0.5rem' }}>Withdraw consent for marketing communications</li>
            <li style={{ marginBottom: '0.5rem' }}>Request data portability</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>8. Children's Privacy</h2>
          <p style={{ marginBottom: '1rem' }}>
            Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13 without parental consent.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>9. Changes to This Policy</h2>
          <p style={{ marginBottom: '1rem' }}>
            We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website with an updated effective date.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>10. Contact Us</h2>
          <p style={{ marginBottom: '1rem' }}>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <address style={{ fontStyle: 'normal' }}>
            <p>FASHION CORNER</p>
            <p>contact@fashioncorner.com</p>
            <p>123, Park Street, Kolkata – 700016,
            West Bengal,india</p>
            <p>(02220)35866</p>
          </address>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;