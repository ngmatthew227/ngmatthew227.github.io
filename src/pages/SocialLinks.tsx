import React from 'react';
import github from '../../static/img/social/github.png';
import gmail from '../../static/img/social/gmail.png';
import telegram from '../../static/img/social/telegram.png';

type SocialLinkProps = {
  title: string;
  src: any;
  link: string;
};

export default function SocialLinks(): JSX.Element {
  const SocialLinkList = [
    {
      src: github,
      link: 'https://github.com/ngmatthew227',
    },
    {
      src: gmail,
      link: 'mailto: matthewlearn56@gmail.com',
    },
    {
      src: telegram,
      link: 'https://t.me/ngmatthew227',
    },
  ];

  return (
    <div>
      {SocialLinkList.map((ele: SocialLinkProps) => {
        return (
          <a href={ele.link}>
            <img src={ele.src} style={{marginRight: "1rem"}} />
          </a>
        );
      })}
    </div>
  );
}
