import React from 'react';
import './WarningPopup.scss';
import { warningSelector, errorSelector } from '../../store/selector/userSelector';
import { useDispatch, useSelector } from "react-redux";
import { closeWarningPopup } from '../../store/reducer/userSlice';

function WarningPopup(){
  const dispatch = useDispatch();
  const isWarning = useSelector(warningSelector);
  const isError = useSelector(errorSelector);

  const closeWarning = () => {
    dispatch(closeWarningPopup(false))
  };

  return (
    <>
      {(isError && isWarning !== "") && <div className="warning" onClick={(e) => { if(e.target.classList.contains("warning")) closeWarning() }} >
        <div className="warning__frame">
          <h4 className="warning__h4">{isWarning}</h4>
          <div className="warning__wrap-btn">
            <button onClick={() => {closeWarning()}} className="default-btn">OK</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default WarningPopup