const getVideos = async (req, res) => {
  try {
    const moreVideos = req.query.moreVideos === 'true';
    const nextPageToken = req.query.nextPageToken || null;

    if (moreVideos && !nextPageToken) {
      const error = new Error();
      error.message = 'Next page token is required to fetch more videos.';
      error.status = 400;
      throw error;
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const playlistId = 'UUpV4a28-iIiF7dlph__N7Hg';
    const apiLink =
      moreVideos && req.query.nextPageToken
        ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&pageToken=${nextPageToken}&key=${apiKey}`
        : `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`;

    const response = await fetch(apiLink);

    if (!response.ok) {
      const error = new Error();
      const responseData = await response.json();

      error.status = responseData.error.code || response.status;
      error.message =
        responseData.error.message || 'An error occurred while fetching videos.';
      throw error;

      return;
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'An error occurred while fetching videos.';
    throw error;
  }
};

const searchVideos = async (req, res) => {
  try {
    const query = req.query.search || null;

    if (!query) {
      const error = new Error();
      error.message = 'Search keyword is required.';
      error.status = 400;
      throw error;
    }

    const apiLink = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpV4a28-iIiF7dlph__N7Hg&q=${query}&key=AIzaSyAUGw4fJtiAEMISbFN1XTyioOHM44d7ibg`;
    
    const response = await fetch( apiLink );

    if (!response.ok) {
      const error = new Error();
      const responseData = await response.json();

      error.status = responseData.error.code || response.status;
      error.message =
        responseData.error.message ||
        'An error occurred while searching videos.';
      throw error;

      return;
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'An error occurred while searching videos.';
    throw error;
  }
};

export { getVideos, searchVideos };
