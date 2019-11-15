import React, { useState } from 'react';
import './Searchbar.css';
import { Input } from 'antd';

export default function Searchbar({search}) {

  const [ searchItem, setSearchItem ] = useState("");
  
  const { Search } = Input;

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const resetSearchField = () => {
    setSearchItem("");
  };

  const submitSearchInput = (e) => {
    search(searchItem);
    resetSearchField();
  };

  return (
    <div>
      <Search
        placeholder="Millenium Falcon"
        onChange={handleSearchChange}
        onSearch={ () => submitSearchInput({searchItem})}
        size="large"
        allowClear={true}
        enterButton
      />
    </div>
  )
}
