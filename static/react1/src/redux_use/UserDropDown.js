import { useSelector } from 'react-redux';
import React from 'react';
// import Client from './Client';
import DropdownButton from './DropdownButton.js';
export default function Userdropdown(props) {
  // console.log('userdropdown render');
  let userMenu;
  let users = useSelector((state) => state.parts.users);
  if (users.length > 0) {
    userMenu = users.map((user, idx) => (
      <span
        key={idx}
        onClick={() => {
          props.onSelect(user.name);
        }}
      >
        {user.name}
      </span>
    ));
    userMenu.push(
      <span
        key={users.length}
        onClick={() => {
          props.onSelect('');
        }}
      >
        *
      </span>
    );
  } else {
    userMenu = (
      <span
        onClick={() => {
          props.onSelect('');
        }}
      >
        *
      </span>
    );
  }
  return (
    <DropdownButton
      variant="light"
      title={props.title || ''}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {userMenu}
    </DropdownButton>
  );
}
