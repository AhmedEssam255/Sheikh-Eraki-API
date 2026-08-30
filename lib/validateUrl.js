const validateUrl = (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export default validateUrl;
