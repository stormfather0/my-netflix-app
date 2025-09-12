import React, { useState } from 'react';
import './Footer.css'
import greaterIcon from '../../assets/greater.svg'

const Footer = () => {
  const [language, setLanguage] = useState("English");
  
  return (
    <div className="footer">
      <h1 className="footer_title">
        Ready to watch? Enter your email to create or restart your membership.
      </h1>
      <div className="input_field">
        <input
          type="input"
          placeholder="Email address"
          className="get-started-input"
        />
        <button className="get-started-btn">
          Get Started
          <img src={greaterIcon} alt="" />
        </button>
      </div>
      <h2 className='questions'>Questions? Call 0800 609 226</h2>

      <div className="footer_links">
     
        <ul className="footer_list">
          <li className="footer_link">FAQ</li>
          <li className="footer_link">Investor Relations</li>
          <li className="footer_link">Privacy</li>
          <li className="footer_link">Speed Test</li>
          <li className="footer_link"> Help Center</li>
          <li className="footer_link">Jobs</li>
          <li className="footer_link"> Cookie Preferences</li>
          <li className="footer_link"> Legal Notices</li>
          <li className="footer_link"> Account</li>
          <li className="footer_link">Ways to Watch</li>
          <li className="footer_link">Corporate Information</li>
          <li className="footer_link">Only on Netflix</li>
          <li className="footer_link">Media Center</li>
          <li className="footer_link">Terms of Use</li>

          <li className="footer_link">Contact Us</li>
        </ul>
      </div>
     
      <div className="language-selector">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-dropdown"
      >
        <option value="English">English</option>
        <option value="Ukrainian">Ukrainian</option>
        <option value="Farsi">Farsi</option>
      </select>
    </div>
    <h3 className='footer_text'>Netflix Ukraine</h3>
      <h3 className='footer_text'>This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</h3>

    </div>
  );
}

export default Footer
