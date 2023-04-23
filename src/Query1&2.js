//! Ques1 : Explain what the simple List component does.

//* Ans : In this code the simple list component does the following works :
//* 1) The List component receives an array of items as props. 
//* 2) It renders a list of items as an unordered list .

//* 3) The List component uses the useState hook to maintain the state of the selectedIndex variable.
//* 4) The List component is composed of two child components, SingleListItem and WrappedListComponent, 
//*    both of which are memoized using the React.memo() function for performance optimization.
//* 5) The WrappedListComponent maintains state using the useState() hook, and updates its state when the items prop changes using the useEffect() hook. 
//*    It then maps over the items array and renders a SingleListItem for each item, 
//*    passing down props such as text, index, and isSelected. When a SingleListItem is clicked, 
//*    it updates the state of selectedIndex in WrappedListComponent via the handleClick function.

//! Ques2: What problems / warnings are there with code ?

//* Ans : There are a few problems / warnings with the given code :

//*       All the errors and warnings are mentioned in the form of comments within the same line .

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
    index,
    isSelected,
    onClickHandler,
    text,
}) => {
    return (
        <li
            style={{ backgroundColor: isSelected ? 'green' : 'red' }}
            onClick={onClickHandler(index)} // Warning: onClickHandler should be a function reference, not a function call
        >
            {text}
        </li>
    );
};

WrappedSingleListItem.propTypes = {
    index: PropTypes.number,                      // Add isRequired here also it should be like this (index: PropTypes.number.isRequired) 
    isSelected: PropTypes.bool,                  // Add isRequired here also it should be like this (isSelected: PropTypes.bool.isRequired) because it's good practice to add isRequired to all required props to ensure that the component is used correctly and to provide clear error messages if they are missing.
    onClickHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};                                                           
    

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
    items,
}) => {
    const [setSelectedIndex, selectedIndex] = useState(); // Error: setSelectedIndex is a function and should be used like this (const [selectedIndex, setSelectedIndex] = useState(-1);) because second arguement shoud be a function .

    useEffect(() => {
        setSelectedIndex(null); // Warning: useEffect has a missing dependency on setSelectedIndex (change null to -1) like this (setSelectedIndex(-1);)
    }, [items]);

    const handleClick = index => {
        setSelectedIndex(index);
    };

    return (
        <ul style={{ textAlign: 'left' }}>
            {items.map((item, index) => (
                <SingleListItem
                    key={index}   // added a key to improve the performance of our app (In order to identify a element as fast as possible)
                    onClickHandler={() => handleClick(index)}
                    text={item.text}
                    index={index}
                    isSelected={selectedIndex} // Warning: isSelected should be a boolean, not a number (it should be like this isSelected={index === selectedIndex})
                    
                />
            ))}
        </ul>
    )
};

WrappedListComponent.propTypes = {
    items: PropTypes.array(PropTypes.shapeOf({   //array to arrayOf  and shapeOf to shape
        text: PropTypes.string.isRequired,
    })),
};

WrappedListComponent.defaultProps = {
    items: null, // Error: items should be an empty array, not null (simply put [])
};

const List = memo(WrappedListComponent);

export default List;


      


