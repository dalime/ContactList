'use strict';

$(() => {
  //CREATE
  $('#btnAddContact').click(addContact);

  //READ
  let contactPacks = createContactPack();
  let $lis = contactPacks.map(contactInfo => createLi(contactInfo));
  $('#list').append($lis);

  //DELETE
  $('#list').on('dblclick', 'li', removeContact);

  //UPDATE
  $('#list').on('click', 'button.edit', openEditModal);
  $('#editNameForm').submit(saveUpdate);
  $('#btnUpdate').click(updateContact);
});


//CREATE
function addContact(event) {
  event.preventDefault();

  let contactInfo = packArray();
  let $li = createLi(contactInfo);
  $('#list').append($li);
  addInfoToStorage(contactInfo);
}

function createLi(contactInfo) {
  let newFirstName = (contactInfo.map(function(a) {return a.firstName;}))[0];
  let newLastName = (contactInfo.map(function(a) {return a.lastName;}))[1];
  let newPhone = (contactInfo.map(function(a) {return a.phone}))[2];
  let newEmail = (contactInfo.map(function(a) {return a.email}))[3];
  let newStreet = (contactInfo.map(function(a) {return a.street}))[4];
  let newCity = (contactInfo.map(function(a) {return a.city}))[5];
  let newState = (contactInfo.map(function(a) {return a.state}))[6];
  let newCountry = (contactInfo.map(function(a) {return a.country}))[7];
  let newZip = (contactInfo.map(function(a) {return a.zip}))[8];
  let newPicture = (contactInfo.map(function(a) {return a.picture}))[9];

  let $li = $('#template').clone();
  $li.removeAttr('id');
  $li.find('.tempFirstName').text(newFirstName);
  $li.find('.tempLastName').text(newLastName);
  $li.find('.tempPhone').text(newPhone);
  $li.find('.tempEmail').text(newEmail);
  $li.find('.tempStreet').text(newStreet);
  $li.find('.tempCity').text(newCity);
  $li.find('.tempState').text(newState);
  $li.find('.tempCountry').text(newCountry);
  $li.find('.tempZip').text(newZip);
  $li.find('#tempPicture').attr('src', newPicture);
  return $li;
}

//UPDATE
function saveUpdate() {
  let $index = $('#contactEditModal').data('index');
  let newFirstName = $('#editFirstName').val();
  let newLastName = $('#editLastName').val();
  let newPhone = $('#editPhone').val();
  let newEmail = $('#editEmail').val();
  let newStreet = $('#editStreet').val();
  let newCity = $('#editCity').val();
  let newState = $('#editState').val();
  let newCountry = $('#editCountry').val();
  let newZip = $('#editZip').val();
  let newPicture = $('#editPicture').val();
}

function openEditModal() {
  let $index = $(this).parent().index();
  $('#contactEditModal').data('index', $index);
  $('#contactEditModal').find('#editFirstName').val(contactInfoFromStorage("firstNames")[$index]);
  $('#contactEditModal').find('#editLastName').val(contactInfoFromStorage("lastNames")[$index]);
  $('#contactEditModal').find('#editPhone').val(contactInfoFromStorage("phones")[$index]);
  $('#contactEditModal').find('#editEmail').val(contactInfoFromStorage("emails")[$index]);
  $('#contactEditModal').find('#editStreet').val(contactInfoFromStorage("streets")[$index]);
  $('#contactEditModal').find('#editCity').val(contactInfoFromStorage("cities")[$index]);
  $('#contactEditModal').find('#editState').val(contactInfoFromStorage("states")[$index]);
  $('#contactEditModal').find('#editCountry').val(contactInfoFromStorage("countries")[$index]);
  $('#contactEditModal').find('#editZip').val(contactInfoFromStorage("zips")[$index]);
  $('#contactEditModal').find('#editPicture').val(contactInfoFromStorage("pictures")[$index]);
  $('#contactEditModal').modal();
}

function updateContact() {
  let $index = $('#contactEditModal').data('index');
  let $newFirstName = $('#editFirstName').val();
  let $newLastName = $('#editLastName').val();
  let $newPhone = $('#editPhone').val();
  let $newEmail = $('#editEmail').val();
  let $newStreet = $('#editStreet').val();
  let $newCity = $('#editCity').val();
  let $newState = $('#editState').val();
  let $newCountry = $('#editCountry').val();
  let $newZip = $('#editZip').val();
  let $newPicture = $('#editPicture').val();

  let firstNames = contactInfoFromStorage("firstNames");
  let lastNames = contactInfoFromStorage("lastNames");
  let phones = contactInfoFromStorage("phones");
  let emails = contactInfoFromStorage("emails");
  let streets = contactInfoFromStorage("streets");
  let cities = contactInfoFromStorage("cities");
  let states = contactInfoFromStorage("states");
  let countries = contactInfoFromStorage("countries");
  let zips = contactInfoFromStorage("zips");
  let pictures = contactInfoFromStorage("pictures");
  firstNames.splice($index, 1, $newFirstName);
  lastNames.splice($index, 1, $newLastName);
  phones.splice($index, 1, $newPhone);
  emails.splice($index, 1, $newEmail);
  streets.splice($index, 1, $newStreet);
  cities.splice($index, 1, $newCity);
  states.splice($index, 1, $newState);
  countries.splice($index, 1, $newCountry);
  zips.splice($index, 1, $newZip);
  pictures.splice($index, 1, $newPicture);

  contactInfoToStorage("firstNames", firstNames);
  contactInfoToStorage("lastNames", lastNames);
  contactInfoToStorage("phones", phones);
  contactInfoToStorage("emails", emails);
  contactInfoToStorage("streets", streets);
  contactInfoToStorage("cities", cities);
  contactInfoToStorage("states", states);
  contactInfoToStorage("countries", countries);
  contactInfoToStorage("zips", zips);
  contactInfoToStorage("pictures", pictures);

  let contactPacks = createContactPack();
  let $li = (createLi(contactPacks[$index])).html();

  $("#list > li:nth-child(" + ($index + 1) + ")").html($li);
}

//DELETE
function removeContact() {
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index) {
  let contactPacks = createContactPack();
  contactPacks.splice(index, 1);
  let firstNames = [];
  let lastNames = [];
  let phones = [];
  let emails = [];
  let streets = [];
  let cities = [];
  let states = [];
  let countries = [];
  let zips = [];
  let pictures = [];
  for (let i = 0; i < contactPacks.length; i++) {
    let newFirstName = contactPacks[i][0];//.firstName[0];
    newFirstName = newFirstName.firstName;
    firstNames.push(newFirstName);
    let newLastName = contactPacks[i][1];//.lastName[1];
    newLastName = newLastName.lastName;
    lastNames.push(newLastName);
    let newPhone = contactPacks[i][2];
    newPhone = newPhone.phone;
    phones.push(newPhone);
    let newEmail = contactPacks[i][3];
    newEmail = newEmail.phone;
    emails.push(newEmail);
    let newStreet = contactPacks[i][4];
    newStreet = newStreet.street;
    streets.push(newStreet);
    let newCity = contactPacks[i][5];
    newCity = newCity.city;
    cities.push(newCity);
    let newState = contactPacks[i][6];
    newState = newState.state;
    states.push(newState);
    let newCountry = contactPacks[i][7];
    newCountry = newCountry.country;
    countries.push(newCountries);
    let newZip = contactPacks[i][8];
    newZip = newZip.zip;
    zips.push(newZip);
    let newPicture = contactPacks[i][9];
    newPicture = newPicture.picture;
    pictures.push(newPicture);
  }
  contactInfoToStorage("firstNames", firstNames);
  contactInfoToStorage("lastNames", lastNames);
  contactInfoToStorage("phones", phones);
  contactInfoToStorage("emails", emails);
  contactInfoToStorage("streets", streets);
  contactInfoToStorage("cities", cities);
  contactInfoToStorage("states", states);
  contactInfoToStorage("countries", countries);
  contactInfoToStorage("zips", zips);
  contactInfoToStorage("pictures", pictures);
}

//FUNCTIONS TO READ, PARSE, MODIFY, STRINGIFY, WRITE TO LOCALSTORAGE

function packArray() {
  let arrContactInfo = [];

  let firstName = $('#iptFirstName').val();
  $('#iptfirstName').val('');
  arrContactInfo.push({"firstName": firstName});
  let lastName = $('#iptLastName').val();
  $('#iptlastName').val('');
  arrContactInfo.push({"lastName": lastName});
  let phone = $('#iptPhone').val();
  $('#iptPhone').val('');
  arrContactInfo.push({"phone": phone});
  let email = $('#iptEmail').val();
  $('#iptEmail').val('');
  arrContactInfo.push({"email": email});
  let street = $('#iptStreet').val();
  $('#iptStreet').val('');
  arrContactInfo.push({"street": street});
  let city = $('#iptCity').val();
  $('#iptCity').val('');
  arrContactInfo.push({"city": city});
  let state = $('#iptState').val();
  $('#iptState').val('');
  arrContactInfo.push({"state": state});
  let country = $('#iptCountry').val();
  $('#iptCountry').val('');
  arrContactInfo.push({"country": country});
  let zip = $('#iptZip').val();
  $('#iptZip').val('');
  arrContactInfo.push({"zip": zip});
  let picture = $('#iptPicture').val();
  $('#iptPicture').val('');
  arrContactInfo.push({"picture": picture});

  return arrContactInfo;
}

function addInfoToStorage(contactInfo) {
  //Unpack array
  let newFirstName = (contactInfo.map(function(a) {return a.firstName;}))[0];
  let newLastName = (contactInfo.map(function(a) {return a.lastName;}))[1];
  let newPhone = (contactInfo.map(function(a) {return a.phone;}))[2];
  let newEmail = (contactInfo.map(function(a) {return a.email;}))[3];
  let newStreet = (contactInfo.map(function(a) {return a.street;}))[4];
  let newCity = (contactInfo.map(function(a) {return a.city;}))[5];
  let newState = (contactInfo.map(function(a) {return a.state;}))[6];
  let newCountry = (contactInfo.map(function(a) {return a.country;}))[7];
  let newZip = (contactInfo.map(function(a) {return a.zip;}))[8];
  let newPicture = (contactInfo.map(function(a) {return a.picture}))[9];

  //Read
  let firstNames = contactInfoFromStorage("firstNames");
  let lastNames = contactInfoFromStorage("lastNames");
  let phones = contactInfoFromStorage("phones");
  let emails = contactInfoFromStorage("emails");
  let streets = contactInfoFromStorage("streets");
  let cities = contactInfoFromStorage("cities");
  let states = contactInfoFromStorage("states");
  let countries = contactInfoFromStorage("countries");
  let zips = contactInfoFromStorage("zips");
  let pictures = contactInfoFromStorage("pictures");
  //parse
  //modify
  firstNames.push(newFirstName);
  lastNames.push(newLastName);
  phones.push(newPhone);
  emails.push(newEmail);
  streets.push(newStreet);
  cities.push(newCity);
  states.push(newState);
  countries.push(newCountry);
  zips.push(newZip);
  pictures.push(newPicture);
  //stringify
  //write
  contactInfoToStorage("firstNames", firstNames);
  contactInfoToStorage("lastNames", lastNames);
  contactInfoToStorage("phones", phones);
  contactInfoToStorage("emails", emails);
  contactInfoToStorage("streets", streets);
  contactInfoToStorage("cities", cities);
  contactInfoToStorage("states", states);
  contactInfoToStorage("countries", countries);
  contactInfoToStorage("zips", zips);
  contactInfoToStorage("pictures", pictures);
}
//1.read
//2.parse
function contactInfoFromStorage(infoType) {
  //read and parse
  switch (infoType) {
    case "firstNames":
    var json = localStorage.firstNames;
    break;
    case "lastNames":
    var json = localStorage.lastNames;
    break;
    case "phones":
    var json = localStorage.phones;
    break;
    case "emails":
    var json = localStorage.emails;
    break;
    case "streets":
    var json = localStorage.streets;
    break;
    case "cities":
    var json = localStorage.cities;
    break;
    case "states":
    var json = localStorage.states;
    break;
    case "countries":
    var json = localStorage.countries;
    break;
    case "zips":
    var json = localStorage.zips;
    break;
    case "pictures":
    var json = localStorage.pictures;
    break;
  }
  let contactInfo;
  try {
    contactInfo = JSON.parse(json);
  } catch(error) {
    contactInfo = [];
  }
  return contactInfo;
}

function createContactPack() {
  var contactPacks = [];
  let localStorageLength = (JSON.parse(localStorage.firstNames)).length;
  for (var i = 0; i < localStorageLength; i++) {
    let contactPack = [];
    contactPack.push({"firstName": "" + (JSON.parse(localStorage.firstNames))[i]});
    contactPack.push({"lastName": "" + (JSON.parse(localStorage.lastNames))[i]});
    contactPack.push({"phone": "" + (JSON.parse(localStorage.phones))[i]});
    contactPack.push({"email": "" + (JSON.parse(localStorage.emails))[i]});
    contactPack.push({"street": "" + (JSON.parse(localStorage.streets))[i]});
    contactPack.push({"city": "" + (JSON.parse(localStorage.cities))[i]});
    contactPack.push({"state": "" + (JSON.parse(localStorage.states))[i]});
    contactPack.push({"country": "" + (JSON.parse(localStorage.countries))[i]});
    contactPack.push({"zip": "" + (JSON.parse(localStorage.zips))[i]});
    contactPack.push({"picture": "" + (JSON.parse(localStorage.pictures))[i]});
    contactPacks.push(contactPack);
  }
    //To create contact info packs for all elements searched
  return contactPacks;
}

//4.stringify
//5.write
function contactInfoToStorage(infoType, array) {
  switch (infoType) {
    case "firstNames":
    localStorage.firstNames = JSON.stringify(array);
    break;
    case "lastNames":
    localStorage.lastNames = JSON.stringify(array);
    break;
    case "phones":
    localStorage.phones = JSON.stringify(array);
    break;
    case "emails":
    localStorage.emails = JSON.stringify(array);
    break;
    case "streets":
    localStorage.streets = JSON.stringify(array);
    break;
    case "cities":
    localStorage.cities = JSON.stringify(array);
    break;
    case "states":
    localStorage.states = JSON.stringify(array);
    break;
    case "countries":
    localStorage.countries = JSON.stringify(array);
    break;
    case "zips":
    localStorage.zips = JSON.stringify(array);
    break;
    case "pictures":
    localStorage.pictures = JSON.stringify(array);
    break;
  }
}
