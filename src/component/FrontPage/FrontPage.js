import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../../component/FrontPage/FrontPage.css';
import { getCurrentYear } from '../../component/utils/date.js';
import '../../Assets/fonts.css';

const Navigation = lazy(() => import('../../component/NAV/NavBar.js'));

const transitionOptions = { delay: 0.2, type: 'spring', stiffness: 120 };

const AnimatedText = ({ initial, animate, transition, text, style }) => (
  <motion.p initial={initial} animate={animate} transition={transition} style={style}>
    {text}
  </motion.p>
);

const FrontPage = () => {
  const year = useMemo(() => getCurrentYear(), []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const fontSize = useMemo(() => {
    if (windowWidth < 480) {
      return '80px';
    } else if (windowWidth < 768) {
      return '80px';
    } else {
      return '100px';
    }
  }, [windowWidth]);

  return (
    <div className="front-page-container">
      <motion.header
        className="header"
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          fontFamily: 'SeussFont',
          color: '#F39C12',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <h1 className="logo" aria-label="SeussWorld Logo">
          PunkWorld
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation
            links={[
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ]}
          />
        </Suspense>
      </motion.header>

      <motion.main
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        role="main"
      >
        <div
          style={{
            marginTop: '100px',
            width: '400px',
            height: '400px',
            background: `url(${require('../../component/FrontPage/punk1.png')}) center/cover`,
            borderRadius: '50%',
            margin: '0 auto',
          }}
        />

        <AnimatedText
          className="Title"
          initial={{ y: -250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transitionOptions}
          style={{
            fontFamily: 'SeussFont',
            color: '#F39C12',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'rgba(255, 255, 255, 0.3)',
            padding: '10px',
            fontSize: fontSize,
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
          text="Welcome to our PunkWorld!"
        />
        <AnimatedText
          initial={{ scale: 0.7, y: -250, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={transitionOptions}
          style={{
            fontFamily: 'SeussFont',
            color: '#F39C12',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'rgba(255, 255, 255, 0.3)',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '40px',
            fontWeight: 'bold',
          }}
          text="Experience an immersive 3D world inspired by the whimsical charm of Dr. Seuss and the power of blockchain Punks. Navigate through our fantastic landscapes, find Easter eggs hidden around,  interact with our unique assets, and step into a world beyond the ordinary."
        />

        <Link to="/seussworld">
          <motion.button
            className="enter-button"
            whileHover={{ scale: 1.1, rotate: [0, 360] }}
            whileTap={{ scale: 0.9 }}
            aria-label="Enter SeussWorld"
            style={{
              background: 'linear-gradient(45deg, #FF00E5, #FFA600)',
              color: '#FFF',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              padding: '15px 30px',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Enter PunkWorld
          </motion.button>
        </Link>
      </motion.main>

      <motion.footer
        className="footer"
        initial={{ y: 250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transitionOptions}
        style={{
          fontFamily: 'SeussFont',
          color: '#F39C12',
          textShadow: '2px 2px 4px rgba(1, 0, 0, 0.5)',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <p>&copy; {year} All rights reserved by PunkWorld</p>
      </motion.footer>
    </div>
  );
};

AnimatedText.propTypes = {
  initial: PropTypes.object,
  animate: PropTypes.object,
  transition: PropTypes.object,
  text: PropTypes.string,
  style: PropTypes.object,
};

AnimatedText.defaultProps = {
  initial: { y: -250, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: transitionOptions,
  text: '',
};

FrontPage.propTypes = {
  history: PropTypes.object,
};

export default FrontPage;
