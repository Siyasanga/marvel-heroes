const axios = require('axios');

var timeout = process.env.timeout || 10000;

exports.getCharacters = async (req, res) => {
  var result = await axios.get('https://gateway.marvel.com/v1/public/characters?apikey=aa80eed4e55c8d518affb1568a082a09&&hash=b502238c39f3ce3df2c6498ff3895787&&ts=1614157856031');
  var characters = result.data.data.results.map((character) => {
      return { id: character.id, name: character.name };
  });

  res.json(characters);
}


async function getStories(characterId)
{
  return new Promise((resolve, reject) => {
    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}/stories?apikey=aa80eed4e55c8d518affb1568a082a09&&hash=b502238c39f3ce3df2c6498ff3895787&&ts=1614157856031`;
    axios.get(url, { timeout })
      .then((marvelResponse) => {
        marvelResponse = marvelResponse.data.data.results;
        var stories = marvelResponse.map((story) => {
          return {
            name: story.originalIssue.name,
            title: story.title,
            description: story.description
          };
        });
        resolve(stories);
      }).catch((err) => {
          console.log("Error getting stories for character", err);
          resolve([]);
      });
  });
}

function getComics(characterId)
{
  return new Promise((resolve, reject) => {
    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=aa80eed4e55c8d518affb1568a082a09&&hash=b502238c39f3ce3df2c6498ff3895787&&ts=1614157856031`;
    axios.get(url, { timeout })
      .then((marvelResponse) => {
        marvelResponse = marvelResponse.data.data.results;
        var comics = marvelResponse.map((comic) => {
          return {
            title: comic.title,
            issueNumber: comic.issueNumber,
            description: comic.description
          };
        });
        resolve(comics);
      }).catch((err) => {
          console.log("Error getting comics for character", err);
          resolve([]);
      });
  });
}

exports.getProfile = async (req, res) => {
  try {
    if(!req.query.characterId) throw "Character Id not provided";
    const url = `https://gateway.marvel.com/v1/public/characters/${req.query.characterId}?apikey=aa80eed4e55c8d518affb1568a082a09&hash=b502238c39f3ce3df2c6498ff3895787&ts=1614157856031`
    var marvelResponse = await axios.get(url, { timeout });
    var stories = await getStories(req.query.characterId);
    var comics = await getComics(req.query.characterId);
    marvelResponse = marvelResponse.data.data.results[0];
    var profile = {
      name: marvelResponse.name,
      imagePath: marvelResponse.thumbnail.path+"/standard_medium.jpg",
      stories,
      comics
    };

    res.send(profile);
  }
  catch(err) {
    console.log(`Error getting profile for: "${req.query.characterId}"`, err);
    res.send({});
  }
}