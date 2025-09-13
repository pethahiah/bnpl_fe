import LogoImg from '../../../public/logo.png';
import Image from 'next/image';

const Logo = () => {
    return (
        <Image src={LogoImg} alt='' />
    )
};

export default Logo;

export const WhiteLogo = () => {
    return (
        <Image src={LogoImg} alt='' />
    )
};
