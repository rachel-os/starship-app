import React, { useReducer, useState, useEffect } from 'react';
import config from '../app.config';
import Searchbar from '../Searchbar/Searchbar';
import { initialState, starshipReducer } from '../../Reducers/starshipReducer';
import { Button, Card, Icon, Spin } from 'antd';
import './Starships.css';
import axios from 'axios';
import _ from 'underscore';


export default function Starships() {

  const [starships, setStarships] = useState([])
  const [filterName, setFilterName] = useState(false);
  const [iconState, setIconState] = useState({});
  const [state, dispatch] = useReducer(starshipReducer, initialState);
  const { errorMessage, loading } = state;

  // Get the latest starship data
  useEffect(() => {
    axios.get(`${config.urlApi}`)
      .then((result) => {
        dispatch({
          type: "SEARCH_STARSHIP_SUCCESS",
          payload: setStarships(result.data.results),
        })
      })
  }, [])


  // Search for a starship 
  const search = searchItem => {
    dispatch({
      type: "SEARCH_STARSHIP_REQ"
    });

    axios.get(`${config.urlApi}?search=${searchItem}`)
      .then((response) => {
        if (response.data.count > 0) {
          dispatch({
            type: "SEARCH_STARSHIP_SUCCESS",
            payload: response.data.results
          })
        } else {
          dispatch({
            type: "SEARCH_STARSHIP_FAIL",
            error: "Anyone can make an error, Ensign. But that error doesn’t become a mistake until you refuse to correct it. - Grand Admiral Thrawn"
          })
        }
      })
  }

  // Sort by name (or any other tag in the future)
  const sortStarships = (tag, [setFunction, param]) => {
    if(param) {
      setStarships(starships.reverse());
    } else {
      setStarships(_.sortBy(starships, tag));
    }
    setFunction(!param)
  }

  // Add a favorite starship
  const toggleIconState = (index) => {
    iconState[index] = !iconState[index];
    setIconState(iconState)
  };


  return (
    <div>
      <Searchbar search={search} />
      <div className="sort-by-btn">
        <Button 
          icon="sort-ascending"
          onClick={()=> sortStarships('name', [setFilterName, filterName])}
        >
            Sort by name
        </Button>
      </div>
      <div className="starshipList">
        {loading && !errorMessage ? (
          <div className="loading">Loading... <Spin size="large" /></div>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (starships.map((starship, index) => {
          return (
            <div key={index} className="starshipCard">
              <Card
                title={starship.name}
                extra={
                  <Icon
                    type="star"
                    theme="filled"
                    onClick={() => toggleIconState(index)}
                    className={iconState[index] ? "anticon-selected" : ""}
                  />
                }
                style={{ width: 400 }}>
                <p>model: {starship.model}</p>
                <p>class: {starship.starship_class}</p>
                <p>speed: {starship.MGLT} MGLT</p>
              </Card>
            </div>
          )
        })
            )
        }
      </div>
    </div>
  )
}
