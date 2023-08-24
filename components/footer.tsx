import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="nx-bg-gray-100 nx-py-8 nx-px-4 md:nx-px-8">
      <div className="nx-container nx-mx-auto">
        <div className="md:nx-flex md:nx-justify-between md:nx-flex-wrap">
          {/* Section 1 - Fetch.ai docs or logo */}
          <div className="md:nx-w-full nx-mb-8 md:nx-mb-0">
            <h4 className="nx-text-black nx-font-semibold nx-mb-2 md:nx-mb-4">Fetch.ai docs or logo</h4>
            <p className="nx-text-gray-600 nx-text-sm">
              <a href="/privacy-policy" className="nx-hover:nx-text-gray-800">Privacy Policy</a>
              <span className="nx-mx-2">|</span>
              <a href="/platform-links" className="nx-hover:nx-text-gray-800">Platform Links</a>
            </p>
          </div>

          {/* Section 2 - Agents */}
          <div className="md:nx-w-1/4 md:nx-mb-4">
            <h4 className="nx-text-black nx-font-semibold nx-mb-2">Agents</h4>
            <p className="nx-text-gray-600 nx-text-sm">
              Core concepts<br />
              Managed agents<br />
              Quick start guides<br />
              Documentation
            </p>
          </div>

          {/* Section 3 - Developers */}
          <div className="md:nx-w-1/4 md:nx-mb-4">
            <h4 className="nx-text-black nx-font-semibold nx-mb-2">Developers</h4>
            <p className="nx-text-gray-600 nx-text-sm">
              Core concepts<br />
              Connect your API<br />
              Device setup<br />
              Marketplace setup
            </p>
          </div>

          {/* Section 4 - Product */}
          <div className="md:nx-w-1/4 md:nx-mb-4">
            <h4 className="nx-text-black nx-font-semibold nx-mb-2">Product</h4>
            <p className="nx-text-gray-600 nx-text-sm">
              Core concepts<br />
              Managed agents<br />
              Quick start guides<br />
              Documentation
            </p>
          </div>

          {/* Section 5 - Content Hub */}
          <div className="md:nx-w-1/4 md:nx-mb-4">
            <h4 className="nx-text-black nx-font-semibold nx-mb-2">Content Hub</h4>
            <p className="nx-text-gray-600 nx-text-sm">
              Core concepts<br />
              Managed agents<br />
              Quick start guides<br />
              Documentation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
