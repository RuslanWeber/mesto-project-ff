// const config = {
//   cohortId: 'wff-cohort-25',
//   baseUrl: 'https://nomoreparties.co/v1/',
//   headers: {
//     authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
//     'Content-Type': 'application/json'
//   }
// };

// const url = `${config.baseUrl}${config.cohortId}`;

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Ошибка: ${response.status}`);
  }
};
// делаем запрос карточкам на сервере
export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
};
// делаем запрос о профиле
export const getProfileInfo = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
};
// обновляем информацию о профиле
export const updateProfileInfo = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  }).then(handleResponse);
};
// добавляем новую карточку 
export const addCardToServer = (name, link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-25/cards', {
    method: 'POST',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  }).then(handleResponse);
};
// устанавливаем лайк карточке
export const addLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
};
// удаляем лайк карточке
export const removeLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
};
// удаляем карточку
export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
};
// меняем аватарку
export const avatarUpdate = async (newAvatarUrl) => {
  const response = await fetch('https://nomoreparties.co/v1/wff-cohort-25/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '503df497-9af6-43ef-8dd4-c222ed80b4e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: newAvatarUrl })
  });
  return await handleResponse(response);
};
