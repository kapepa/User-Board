import React,{ useState, useRef } from 'react';
import './FullListUser.scss';
import { parseTimeLastUpdate } from "../../helpers/TimeHelpers";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userForm } from '../../store/reducer/userSlice';
import { searchUsers, deleteUsers } from "../../store/action/userActions";
import Pagination from '../Pagination/Pagination';

function FullListUser({list, currentPage, pageAll}){
  const history = useHistory();
  const dispatch = useDispatch();
  const refTimeOut = useRef(null);
  const [directionSort, setDirectionSort] = useState({
    name: true, surname: true, birthday: true, phone: true, email: true, update: true
  })

  const searchInputUser = (e) => {
    clearTimeout(refTimeOut.current);
    refTimeOut.current = setTimeout(() => {
      dispatch(searchUsers({word: e.target.value}))
      clearTimeout(refTimeOut.current);
    },1500);
  }

  const searchFieldName = (name) => {
    dispatch(searchUsers({fields: name, sort: directionSort[name]}));
    setDirectionSort({...directionSort, [name]: directionSort[name] ? false : true});
  };

  const paginationTransition = (e) => {
    const targetPress = parseInt(e.target.dataset.page);
    const targetPrev = e.target.dataset.prev;
    const targetNext = e.target.dataset.next;

    if(targetPrev && JSON.parse(targetPrev) && (currentPage - 1) >= 1) return dispatch(searchUsers({page: currentPage - 1}));
    if(targetNext && JSON.parse(targetNext) && (currentPage + 1) <= pageAll) return dispatch(searchUsers({page: currentPage + 1}));
    if(!isNaN(targetPress)) return dispatch(searchUsers({page: targetPress}));
  }

  return (
    <div className="list-user">
      <div className="list-user__header">
        <div className="list-user__title">
          <h4 className="list-user__h4">Full list user</h4>
        </div>
        <div className="list-user__search-area">
          <input
            type="text"
            name="search"
            className="forma__input forma__input--search"
            maxLength={20}
            placeholder="Search"
            onInput={searchInputUser}
          />
        </div>
      </div>
      <div className="list-user__main">
        <div className="cell-user cell-user--desc">
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"name")}>Name</div>
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"surname")}>Surname</div>
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"birthday")}>Birthday</div>
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"phone")}>Phone</div>
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"email")}>Email</div>
          <div className="cell-user__symbols cell-user__symbols--search" onClick={searchFieldName.bind(null,"update")}>Update</div>
          <div className="cell-user__symbols"></div>
          <div className="cell-user__symbols"></div>
        </div>
        {list.map((user, i) => (
          <div key={"user" + user.update + user.email + i} className="cell-user">
            <div className="cell-user__symbols">{user.name}</div>
            <div className="cell-user__symbols">{user.surname}</div>
            <div className="cell-user__symbols">{`${user.day}/${user.month}/${user.year}`}</div>
            <div className="cell-user__symbols">{user.phone}</div>
            <div className="cell-user__symbols">{user.email}</div>
            <div className="cell-user__symbols">{parseTimeLastUpdate(user.update)}</div>
            <div className="cell-user__action">
              <button className="navigation__btn" onClick={() => {
                dispatch(userForm(user));
                history.push("/");
              }}>Edit</button>
            </div>
            <div className="cell-user__action">
              <button className="default-btn default-btn--red" onClick={() => {
                dispatch(deleteUsers(user.email))
                dispatch(searchUsers());
              }}>Del</button>
            </div>
          </div>
        ))}
      </div>
      <div className="list-user__footer">
        <Pagination transition={paginationTransition} currentPage={currentPage} pageAll={pageAll} />
      </div>
    </div>
  )
}

export default FullListUser