import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
export const Card = ({ data, itemType, selectedMenuItem, openModal }) => {
  const navigate = useNavigate();
  return (
    <>
      {data &&
        data.map((item) => (
          item.thumbnail && (
            <div className="card" key={item.id} onClick={() => (selectedMenuItem === 'characters' ? navigate(`/${item.id}`) : openModal(item))}>
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name || item.title} />
              <div className="title">
                <h3>{item.name || item.title}</h3>
              </div>
            </div>
          )
        ))}
    </>
  );
};
