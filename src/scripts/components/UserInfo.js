export default class UserInfo {

  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameContainer.textContent,
      userDescription: this._userDescriptionContainer.textContent
    }
  }

  setUserInfo({userName, userDescription}) {
    this._userNameContainer.textContent = userName;
    this._userDescriptionContainer.textContent = userDescription;
  }

}