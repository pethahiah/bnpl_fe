import { useEffect } from 'react';
import { scrollUp } from '../../utils/common';
import './notfound.css'
import Link from 'next/link';

const NotFound = () => {
  useEffect(() => {
    scrollUp();
  }, []);
  return (
    <div className='notfound-wrapper'>
      <h1>404</h1>
      <span>Page Not Found!</span>
      <Link className="go-back" href="/">Go Back</Link>
    </div>
  );
};

export default NotFound;
