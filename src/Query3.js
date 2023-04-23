import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => { // destructure props in argument list
  const handleClick = () => onClickHandler(index); // wrap function call in arrow function to avoid immediate invocation

  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={handleClick} // pass function reference instead of invoking it
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired, // mark index as required
  isSelected: PropTypes.bool.isRequired, // mark isSelected as required
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => { // destructure props in argument list
  const [selectedIndex, setSelectedIndex] = useState(null); // remove unused function argument and fix state variable name

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => setSelectedIndex(index);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items?.map((item, index) => ( // use optional chaining to handle null or undefined items prop
        <SingleListItem
          key={index} // add unique key prop to each list item
          onClickHandler={handleClick}
          text={item?.text} // use optional chaining to handle null or undefined item.text
          index={index}
          isSelected={index === selectedIndex} // check if current index matches selectedIndex
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ), // fix PropTypes.array() syntax and use PropTypes.arrayOf() instead
};

List.defaultProps = {
  items: null,
};

export default List;
