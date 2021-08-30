exports.validatorUserServer = (user) => {
  return new Promise((resolve => {
    const currentYear = new Date().getFullYear()
    const checkRegExp = [
      {name: "name", reg: /^[a-zA-Z\-|а-яA-Я\-]+$/},
      {name: "surname", reg: /^[a-zA-Z\-|а-яA-Я\-]+$/},
      {name: "year", min: currentYear - 100, max: currentYear},
      {name: "month", min: "1", max: "12"},
      {name: "day", min: "1", max: "31"},
      {name: "phone", reg: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/},
      {name: "email", reg: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/},
    ]

    const checkedServerUser = checkRegExp.every((props) => {
      return props.hasOwnProperty("reg")
        ? new RegExp(props.reg,'i').test(user[props.name])
        : user[props.name] >= props.min && +user[props.name] <= props.max;
    });

    resolve(checkedServerUser)
  }))
}