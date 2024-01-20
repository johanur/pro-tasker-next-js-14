import Image from 'next/image';

const BackgroundImage = () => {
  return (
    <Image
      src="/images/background.jpg"
      alt="background-image"
      layout="full"
      objectFit="cover"
      fill={true}
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundImage;
