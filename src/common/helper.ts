export const getImageApp = (avatar?: string) => {
    if (!avatar) {
      return '/images/default.png'
    }
    return avatar.startsWith('http') ? avatar : `https://api.myfiaivn.com/api/v1/file/view/${avatar}`;
  };