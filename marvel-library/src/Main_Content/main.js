import React, { useState, useEffect } from "react";
import { Card } from "./characters";
import Pagination from './pagination';

export const Main = () => {
  const [url, setUrl] = useState("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85&limit=20");
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState("characters");
  useEffect(() => {                                                                          
    const fetchData = () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const newUrl = `${url}&offset=${offset}`;
      fetch(newUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setItem(data.data.results || []);
          setTotalItems(data.data.total);
        })
        .catch((error) => console.error('Error fetching'));
    };
    fetchData();
  }, [url, currentPage, itemsPerPage]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchCharacters();
  };
  const openModal = (item) => {
    setSelectedMenuItem('comics');
    setUrl(`https://gateway.marvel.com:443/v1/public/comics/${item.id}?ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85`);
  };
  const searchCharacters = () => {
    setUrlBasedOnMenuItem();
  };
  const searchComics = () => {
    setUrlBasedOnMenuItem();
  };
  const handleSearchButtonClick = () => {
    if (selectedMenuItem === 'characters') {
      searchCharacters();
    } else if (selectedMenuItem === 'comics') {
      searchComics();
    }
  };
  const setUrlBasedOnMenuItem = () => {
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/';
    const commonParams = '&ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85&limit=20';
    if (selectedMenuItem === 'characters') {
      setUrl(`${baseUrl}characters?nameStartsWith=${search}${commonParams}`);
    } else if (selectedMenuItem === 'comics') {
      setUrl(`${baseUrl}comics?titleStartsWith=${search}${commonParams}`);
    }
  };
  const fetchDataBasedOnMenu = () => {
    if (selectedMenuItem === 'characters') {
      setUrl(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85&limit=20`);
    } else if (selectedMenuItem === 'comics') {
      setUrl(`https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=3532587bef16a5ec87a8a40c716d1529&hash=af3c31466e6b5b83271cc54b2b4cdf85&limit=20`);
    }
  };
  useEffect(() => {
    fetchDataBasedOnMenu();
  }, [selectedMenuItem, search, currentPage]);
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="./images/logo.png" alt="logo"></img>
        </div>
        <div className="menu">
          <a href="#characters" className={selectedMenuItem === 'characters' ? 'active' : ''} onClick={() => setSelectedMenuItem("characters")}>Characters</a>
          <a href="#comics" className={selectedMenuItem === 'comics' ? 'active' : ''} onClick={() => setSelectedMenuItem("comics")}>Comics</a>
        </div>
        <div className="search">
          <form  onSubmit={handleSearchSubmit}>
            <input type="search"  placeholder="Search characters/comics" className="search_input" onChange={handleSearchInputChange}/>
            <button type="button" className="search_button" onClick={handleSearchButtonClick}>Search</button>
          </form>
        </div>
      </div>
      <div className="container" id="container">
        <div className="displayCharacters">
          {!item.length ? <p>No characters found</p> : <Card data={item} itemType={selectedMenuItem} selectedMenuItem={selectedMenuItem} openModal={openModal} />}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      <div className="footer">
        <p>Kaltrina Rashiti & Viola Pllana</p>
      </div>
    </>
  );
};