import Image from 'next/image';

const BackgroundImage = () => {
  return (
    <Image
      src="/images/background.jpg"
      alt="background-image"
      className="object-cover"
      fill={true}
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundImage;
