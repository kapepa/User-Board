const fs = require('fs');
const { resolve } = require('path');

exports.newUser = async (user) => {
  try{
    const dir = resolve(__dirname,"../../","json/user.json");
    if (!fs.existsSync(dir)){
      fs.mkdirSync(resolve(__dirname,"../../","json/"))
      fs.appendFileSync(dir,"[]");
    }
    const store = await JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}));
    const checkExistData = store.findIndex(persona => user.email === persona.email);

    if(checkExistData !== -1) return {alert: true,  warning: "Such email exist!"};

    store.push({...user, update: Date.now(), id: Date.now()});
    await fs.writeFileSync(dir,JSON.stringify(store),{encoding: 'utf-8'});

    return {alert: true, warning: "User added successfully"}
  }catch (e){
    throw e.name
  }
}

exports.updateUser = async (obj) => {
  try{
    const dir = resolve(__dirname,"../../","json/user.json");
    const store = await JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}));
    const findIndex = store.findIndex(user => user.update === obj.update && user.id === obj.id);

    if(store[findIndex].email !== obj.email){
      const checkExistData = store.findIndex(persona => obj.email === obj.email);
      if(checkExistData !== -1) return {alert: true,  warning: "Such email exist!"};
    }

    store.splice(findIndex, 1,{...obj, update: Date.now()});
    await fs.writeFileSync(dir,JSON.stringify(store),{encoding: 'utf-8'});

    return {alert: true, warning: "User updated successfully"}
  }catch (e){
    throw e.name
  }
}

exports.searchUser = async (obj) => {
  try{
    const { word = "", page = 1, fields = "", sort = null } = obj;
    const amountPageUsers = 10;
    const dir = resolve(__dirname,"../../","json/user.json");
    if (!fs.existsSync(dir)) return [];

    let userList = await JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}));
    if(word !== "") userList = userList.filter(user => new RegExp(word,"i").test(user.name) || new RegExp(word,"i").test(user.surname));
    if(fields !== "" && fields !== "birthday") userList.sort((a, b) => {
      const symbolA = isNaN(Number(a[fields])) ? a[fields].toLowerCase().charCodeAt(0) : Number(a[fields]);
      const symbolB = isNaN(Number(b[fields])) ? b[fields].toLowerCase().charCodeAt(0) : Number(b[fields]);
      return sort ? symbolB - symbolA : symbolA - symbolB;
    });
    if(fields !== "" && fields === "birthday") userList.sort((a, b) => {
      const symbolA = new Date(a.year,a.month,a.day).getTime();
      const symbolB = new Date(b.year,b.month,b.day).getTime();
      return !sort ? symbolB - symbolA : symbolA - symbolB;
    });

    const allUser = userList.length
    const pageUser = userList <= amountPageUsers
      ? userList
      : userList.splice(amountPageUsers * page - amountPageUsers, amountPageUsers);

    return {list: pageUser, page: page, pageAll: Math.ceil(allUser / amountPageUsers)};
  }catch (e){
    throw e.name
  }
}

exports.deleteUser = async (email) => {
  try{
    const dir = resolve(__dirname,"../../","json/user.json");
    const store = await JSON.parse(fs.readFileSync(dir, {encoding: 'utf-8'}));
    const findIndex = store.findIndex(user => user.email === email)

    store.splice(findIndex, 1);
    await fs.writeFileSync(dir,JSON.stringify(store),{encoding: 'utf-8'});

    return {alert: true, warning: "Deletion successful"}
  }catch (e){
    throw e.name
  }
}