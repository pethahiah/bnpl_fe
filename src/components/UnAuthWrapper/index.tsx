import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import Logo from '../Logo';
import UnAuthImg from '../../../public/working-from-home-ergonomic-workstation.png';

// import { illustrations } from '../../assets';

interface IUnAuthWrapper {
  title: string;
  subTitle: string;
  ctaQuestion?: string;
  ctaText?: string;
  ctaRoute?: string;
  children: React.ReactElement;
  subTitleComponent?: () => React.ReactElement;
  overrideContentClass?: string;
  ctaAction?: () => void;
  img?: string;
}

function UnAuthWrapper({
  title, subTitle, children, ctaQuestion, ctaRoute, ctaText, subTitleComponent, ctaAction, img
}: IUnAuthWrapper) {
  const router = useRouter();
  const testimonials = [
    {
      testimony: 'Paythru is the most reliable payment solution.',
      name: 'Temitope Alex',
      type: 'MD',
      img: ''
    },
  ];

  const handleGoBack = () => {
    router.back();
  }
  return (
    <div className="w-screen min-h-[100vh] flex flex-row !p-0">
      <div className="h-full flex flex-col flex-grow px-5 py-10 lg:px-20">
        <div className='w-full flex flex-row justify-between items-center mb-4'>
          <Logo />
        </div>
        <div className="h-[100%] min-h-[80vh] flex justify-center items-center w-full">
          <div className='flex flex-col m-auto min-w-[350px] h-[100%] w-full'>
            {/* {img && <img src={img} alt="" className='!w-16 !h-16 mb-6' />} */}
            <div className='w-full flex flex-col justify-start items-start'>
              <h1 className='text-3xl text-az-black-900'>{title}</h1>
              {subTitleComponent ? subTitleComponent() : <p className='text-az-200 max-w-[400px] text-left text-base my-3 w-full'>{subTitle}</p>}
            </div>
            <div className='children max-h-[80%] overflow-auto'>
              {
                children
              }
            </div>
            <div className='form-cta w-full flex flex-row justify-center items-center'>{ctaQuestion}
              {
                ctaAction ? (
                  <Button
                    label={ctaText || ""}
                    type='text'
                    overrideStyle={{
                      color: 'rgba(80,44,43,.882)',
                      width: 'max-content',
                      marginLeft: '0.5rem'
                    }}
                    onClick={ctaAction}
                  />
                ) : (
                  <Link className='ml-2' href={`/${ctaRoute}`}>
                    <Button
                      label={ctaText || ""}
                      type='text'
                      overrideStyle={{
                        color: 'rgba(80,44,43,.882)',
                        width: 'max-content',
                      }}
                    />
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex w-6/12 un-auth-left flex-col justify-between top-0 sticky overflow-hidden h-[100vh]'>
        <Image src={UnAuthImg} alt="" className='w-full h-full object-cover' />
      </div>
    </div>
  );
}

export default UnAuthWrapper;