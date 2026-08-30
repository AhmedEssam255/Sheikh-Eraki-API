const validateUrl = (url) => {
  const regex =
    /^https:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/i;

  if ( regex.test( url ) && url.length > 0 ) {
    return true;
  } else {
    return false;
  }
};

export default validateUrl;
