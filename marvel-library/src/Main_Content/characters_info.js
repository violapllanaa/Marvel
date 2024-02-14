import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'; 

export const Marvel = () => {
  const { id } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setItem(data.data.results[0]);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [id]);

  return (
    <>
      {item ? (
        <div className="box-content">
          <div className="first-box">
            <h1>{item.name}</h1>
            <h4>{item.description}</h4>
          </div>
          <div className="second-box">
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
