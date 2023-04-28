import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>© 2023 meNetwork. All rights reserved.</p>
        <ul className='footer-links'>
          <li><a href='#'>Terms of Service</a></li>
          <li><a href='#'>Privacy Policy</a></li>
          <li><a href='#'>Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}
