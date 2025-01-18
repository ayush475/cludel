import { FC } from 'react';

interface FooterProps {
  creatorName: string;
}

const Footer: FC<FooterProps> = ({ creatorName }) => {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      Created by {creatorName}
    </footer>
  );
};

export default Footer;

