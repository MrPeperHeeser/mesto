export default class UserInfo {

  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userDescriptionContainer = document.querySelector(userDescriptionSelector);
    this._userAvatarContainer = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameContainer.textContent,
      userDescription: this._userDescriptionContainer.textContent
    }
  }

  setUserInfo({userName, userDescription, avatarLink, id}) {
    this._userNameContainer.textContent = userName ? userName : this._userNameContainer.textContent
    this._userDescriptionContainer.textContent = userDescription ? userDescription : this._userDescriptionContainer.textContent;
    this._userAvatarContainer.src = avatarLink ? avatarLink : this._userAvatarContainer.src;
    this._id = id ? id : this._id;
  }

}