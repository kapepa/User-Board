import React, { useEffect } from "react";
import "./Users.scss";
import NavLayout from "../../layout/NavLayout/NavLayout";
import FullListUser from "../../components/FullListUser/FullListUser";
import { searchSelector } from "../../store/selector/userSelector";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../store/action/userActions"

function Users () {
  const dispatch = useDispatch();
  const isSearch = useSelector(searchSelector);

  useEffect(() => {
    dispatch(searchUsers())
  },[])

  return (
    <NavLayout>
      <FullListUser list={isSearch.list} currentPage={isSearch.page} pageAll={isSearch.pageAll}/>
    </NavLayout>
  )
}

export default Users