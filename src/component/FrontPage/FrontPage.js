import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Web3 from 'web3'; 
import { MyNFT } from '../../abi/MyNFT.js'; 
import '../../component/FrontPage/FrontPage.css';
import { getCurrentYear } from '../../component/utils/date.js';
import '../../Assets/fonts.css';

const Navigation = lazy(() => import('../../component/NAV/NavBar.js'));

const transitionOptions = { delay: 0.2, type: 'spring', stiffness: 120 };

const FrontPage = () => {
  const year = useMemo(() => getCurrentYear(), []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAllowed, setIsAllowed] = useState(false); 

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

  const checkNFTOwnership = async () => {
  
    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = '0xEe2d1f6D5C8d71e8c97CAA4A80fF9eD87dbB9C34';
      const nftContract = new web3.eth.Contract(MyNFT, contractAddress);
      const accounts = await web3.eth.getAccounts();
  
      if (!accounts[0]) {
        console.error("No account connected");
        return;
      }
  
      const userAddress = accounts[0];
  
      const balance = await nftContract.methods.balanceOf(userAddress).call();

setIsAllowed(Number(balance.toString()) > 0);

    } catch (error) {
    }
  };
  

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      requestAccount();
    } else {
    }
  }, []);

  const requestAccount = async () => {

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkNFTOwnership();
    } catch (error) {
      console.error('User denied account access', error);
    }
  };
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

{!window.ethereum ? (
      <p style={{ 
        fontFamily: 'SeussFont', 
        color: '#F39C12',
        fontSize: '20px', 
        textAlign: 'center', 
        marginTop: '50px' 
      }}>
        Please install MetaMask
      </p>
    ) : isAllowed ? (
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
    ) : (
      <>
        <p  style={{
            fontFamily: 'SeussFont',
            color: '#F39C12',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'rgba(255, 255, 255, 0.3)',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '40px',
            fontWeight: 'bold',
          }}>
          You need to own our NFTs to enter PunkWorld.
        </p>
        <button 
          onClick={requestAccount}
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
            display: 'block',
            margin: '20px auto',
          }}
        >
          Connect Wallet
        </button>
      </>
    )}
      </motion.main>
      <footer
        style={{
          background: '#F5F5F5',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <p
          style={{
            fontFamily: 'SeussFont',
            color: '#000',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
            fontSize: '24px',
          }}
        >
          &copy; {year} PunkWorld. All rights reserved.
        </p>
      </footer>
    </div>
  );
};




const AnimatedText = ({ initial, animate, transition, text, style }) => (
  <motion.p initial={initial} animate={animate} transition={transition} style={style}>
    {text}
  </motion.p>
);

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