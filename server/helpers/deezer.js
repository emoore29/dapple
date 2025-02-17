const axios = require("axios");

async function searchTrackDeezer(trackName, trackArtist, trackAlbum) {
  // Search for a track with album, return preview_url if available
  try {
    const res = await axios.get(
      `https://api.deezer.com/search?q=album:"${trackAlbum}"track:"${trackName}"`
    );

    const results = res.data.data;
    const numResults = res.data.total;
    if (numResults == 0) {
      return null;
    }

    // Deezer search results may be inconsistent
    // Verify track name, artist, and album before setting preview
    let previewUrl = null;
    for (const result of results) {
      if (result.title != trackName || result.artist.name != trackArtist) {
        continue;
      }
      previewUrl = result.preview;
      break;
    }
    if (previewUrl) {
      return previewUrl;
    } else {
      console.error(
        "Deezer search results don't match track title and artist."
      );
      return null;
    }
  } catch (error) {
    console.error(`Error searching for track in Deezer.`, error);
    return null;
  }
}

module.exports = {
  searchTrackDeezer,
};
