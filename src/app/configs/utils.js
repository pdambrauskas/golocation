import reduxApi from '../configs/rest'

// Copyright Rūta :D
function changeName(name) {
  var index = -1;
  var ends = ['as', 'us', 'ys', 'is'];
  var endsReplace = ['ai', 'au', 'y', 'i'];
  var lastChar = name.slice(-1);
  name = name.trim();

  if (lastChar === 'a' || lastChar === 'e') {
    return name;
  } else if (lastChar === 'ė') {
    return name.replace(/ė$/, "e")
  } else {
    lastChar = name.slice(-2);
    index = ends.indexOf(lastChar);
    if (index === -1) {
      return name;
    } else {
      return name.substring(0, name.length - 2) + endsReplace[index];
    }
  }
}

function saluteForName(name) {
  var processedName = name.trim().toLowerCase().replace('ą', 'a').replace('č', 'c').replace('ę', 'e').replace('ė', 'e').replace('į', 'i').replace('š', 's').replace('ų', 'u').replace('ū', 'u').replace('ž', 'z');
  var defautlSaluteEnd = 'O čia tu, {0}, labas!';
  var changedName = changeName(name);
  changedName = changedName.charAt(0).toUpperCase() + changedName.slice(1);

  switch (processedName) {
    case 'audrunas':
      return 'Oi, Audrūnai, tik nepradėk iškart bėgti.';
    case 'agne':
      return 'Labas Agne! Žinau, kad tikiesi pingvinų, bet manau, kad ir konglomeratuose galima rasti kalcio.';
    case 'evaldas':
   	  return 'Labas Evaldai! Būtinai parodyk Simonai pelkes.';
    case 'laimis':
    case 'laimonas':
   	  return 'Ooo Laimi, pasiimk meškerę, bus galima ir pažvejoti!'
    default:
      return defautlSaluteEnd.replace('{0}', changedName);
  }
}

function updateLocation(dispatch, userId, location) {
  if (!location) location = {}
  setTimeout(() => { dispatch(reduxApi.actions.locations.reset('sync'))}, 0)
  setTimeout(() => { dispatch(reduxApi.actions.locations.sync({...location, user_id: userId}))}, 0)
}

export {saluteForName, updateLocation}
