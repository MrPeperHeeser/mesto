import {
  urlParts
} from '../utils/constants.js'

export default class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    const path = this._baseUrl + urlParts.cards;
    return fetch(path, {
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to get cards with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  addNewCard({name, link}) {
    const path = this._baseUrl + urlParts.cards;
    return fetch(path, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          name: name,
          link: link
        }
      )
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to add new card with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  deleteCard({id}) {
    const path = this._baseUrl + urlParts.cards + '/' + id;
    return fetch(path, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to delete card with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  getUserInfo() {
    const path = this._baseUrl + urlParts.userInfo;
    return fetch(path, {
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to get user info with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  updateUserInfo({name, about}) {
    const path = this._baseUrl + urlParts.userInfo;
    return fetch(path, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to update user info with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  updateAvatar({avatarLink}) {
    const path = this._baseUrl + urlParts.userInfo + urlParts.avatar;
    return fetch(path, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to update user avatar status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

  toggleLikeOnCard({cardId, needLike}) {
    let method;
    if (needLike) {
      method = 'PUT'
    } else {
      method = 'DELETE'
    }
    const path = this._baseUrl + urlParts.cards + urlParts.likes + '/' + cardId;
    return fetch(path, {
      method: method,
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('failed to toggle like on card with status: ' + res.status);
      }
    }).catch(e => console.log(e));
  }

}