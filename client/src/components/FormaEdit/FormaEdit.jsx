import React, { useState, useEffect } from "react";
import './FormaEdit.scss';
import formik, { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { addUsers } from '../../store/action/userActions';
import { userSelector } from '../../store/selector/userSelector';
import { userForm } from '../../store/reducer/userSlice'
import { validateInput } from '../../helpers/ValidateInputForm';
import { useHistory, useLocation } from "react-router-dom";
import { parseTimeLastUpdate } from "../../helpers/TimeHelpers"

function FormaEdit (){
  const dispatch = useDispatch();
  const isUser = useSelector(userSelector);
  const [valid, setValid] = useState([]);
  const [born, setBorn] = useState({
    year: Array(100).fill(new Date().getFullYear()),
    month: Array(12).fill(""),
    day: Array(1).fill(""),
  })

  const actionSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(addUsers(values));
    dispatch(userForm({
      name: "", surname: "", year: "", month: "", day: "", phone: "", email: "", update: 0,
    }));
    setSubmitting(false);
  }

  const watcherChangesInput = (e) => {
    const field = e.target.name
    const val = e.target.value
    dispatch(userForm({...isUser, [field]: val}))
  }

  useEffect(() => {
    const date = new Date(isUser.year,isUser.month,0).getDate();
    setBorn({...born, day: Array(date).fill("")})
  },[isUser.year, isUser.month])

  return (
    <div className="forma">
      <h2 className="forma__h2">Users forma</h2>
      <Formik
        enableReinitialize
        initialValues={isUser}
        validate={validateInput(born,setValid)}
        onSubmit={actionSubmit}
      >
        {({ isSubmitting }) => (<Form className="forma__formik">
            <div className="forma__area">
              <label className="forma__label" htmlFor="name">Name</label>
              <Field
                className={`forma__input ${valid.includes("name") ? "forma__input--alert" : ""}`}
                onInput={watcherChangesInput}
                type="text"
                name="name"
                placeholder="Name"
                maxLength={20}
              />
              <ErrorMessage className="forma__warning"  name="name" component="div" />
            </div>
            <div className="forma__area">
              <label className="forma__label" htmlFor="surname">Surname</label>
              <Field
                className={`forma__input ${valid.includes("surname") ? "forma__input--alert" : ""}`}
                onInput={watcherChangesInput}
                type="text"
                name="surname"
                placeholder="Surname"
                maxLength={20}
              />
              <ErrorMessage className="forma__warning"  name="surname" component="div" />
            </div>
            <div className="forma__area forma__area--data">
              <div className="forma__data">
                <label className="forma__label" htmlFor="year">Year</label>
                <Field
                  as="select"
                  name="year"
                  onMouseOut={watcherChangesInput}
                  className={`forma__input forma__data-select forma__data-select--year ${valid.includes("year") ? "forma__input--alert" : ""}`}
                >
                  {born.year.map((year, i) => {
                    return <option key={"year" + i} defaultValue={year - i} defaultChecked={year - i}>{year - i}</option>
                  })}
                </Field>
                <ErrorMessage className="forma__warning"  name="year" component="div" />
              </div>

              <div className="forma__data">
                <label className="forma__label" htmlFor="month">Month</label>
                <Field
                  as="select"
                  name="month"
                  onMouseOut={watcherChangesInput}
                  className={`forma__input forma__data-select ${valid.includes("month") ? "forma__input--alert" : ""}`}
                >
                  {born.month.map((month, i) => {
                    return <option key={"month" + i} defaultValue={i + 1} defaultChecked={i + 1}>{i + 1}</option>
                  })}
                </Field>
                <ErrorMessage className="forma__warning"  name="month" component="div" />
              </div>
              <div className="forma__data">
                <label className="forma__label" htmlFor="day">Day</label>
                <Field
                  as="select"
                  name="day"
                  onMouseOut={watcherChangesInput}
                  className={`forma__input forma__data-select ${valid.includes("day") ? "forma__input--alert" : ""}`}
                >
                  {born.day.map((month, i) => {
                    return <option key={"day" + i} defaultValue={i + 1} defaultChecked={i + 1}>{i + 1}</option>
                  })}
                </Field>
                <ErrorMessage className="forma__warning"  name="day" component="div" />
              </div>
            </div>
            <div className="forma__area">
              <label className="forma__label" htmlFor="phone">Phone</label>
              <Field
                className={`forma__input ${valid.includes("phone") ? "forma__input--alert" : ""}`}
                onInput={watcherChangesInput}
                type="text"
                name="phone"
                placeholder="Phone"
                maxLength={20}
              />
              <ErrorMessage className="forma__warning" name="phone" component="div" />
            </div>
            <div className="forma__area">
              <label className="forma__label" htmlFor="email">Email</label>
              <Field
                className={`forma__input ${valid.includes("email") ? "forma__input--alert" : ""}`}
                onInput={watcherChangesInput}
                type="email"
                name="email"
                placeholder="Email"
                maxLength={20}
              />
              <ErrorMessage className="forma__warning" name="email" component="div" />
            </div>
            <div className="forma__area">
              <label className="forma__label" htmlFor="email">{isUser.update > 0 ? `Update: ${parseTimeLastUpdate(isUser.update)}`:``}</label>
            </div>
            <div className="forma__submit-wrapper">
              <button  className="default-btn" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormaEdit