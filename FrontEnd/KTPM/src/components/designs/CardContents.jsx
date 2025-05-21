import React from 'react';
import './CardContents.css';

const CardContents = ({ 
  title, 
  desc, 
  actionText, 
  href, 
  actionHref,
  imageSrc,
  imageAlt,
  children
}) => {
  return (
    <div className="card-contents">
      {/* Phần hình ảnh có thể tuỳ chỉnh */}
      <div className="card-contents__image">
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={imageAlt || 'card content'}
            className="card-contents__image-img" 
          />
        )}
        {children} {/* Cho phép truyền content bất kỳ */}
      </div>

      <div className="card-contents__content">
        <div>
        <span href={href} className="card-contents__link">
          <span className="card-contents__title">{title}</span>
        </span>
        </div>
        <div>
        <p className="card-contents__desc">{desc}</p>
        </div>
        <div>
        <a className="card-contents__action" href={actionHref}>
          {actionText}
          <span aria-hidden="true">→</span>
        </a>
        </div>
      </div>
    </div>
  );
};

CardContents.defaultProps = {
  title: 'Default Title',
  desc: 'Default description text',
  actionText: 'Learn more',
  href: '#',
  actionHref: '#',
  imageSrc: null,
  imageAlt: '',
};

export default CardContents;