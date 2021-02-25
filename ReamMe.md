## The Marvel Heroes Web App

Rnning the server:
 - First run `npm install`
 - From the root directory of the repo, run `node index.js`
 - By default, the server will run on http://localhost:3002
 - **End points**

### API:
 - Endpoint to get all the characters: 'http://localhost:3002/api/marvel/characters'
 - return object =
 ```
    {
        characters:
        [
            { id: 1001870, name: "John Doe" }
        ]
    }
```

- Endpoint to get the data of a character: `http://localhost:3002/api/marvel/characters/api/marvel/character/profile`
- return object:
```
{
        "name": "Ajax",
        "imagePath":"",
        "stories":
        [
            {
                "name": "",
                "title": "",
                "description": ""
            }
        ],
        "comics": 
        [
            {
                "title":"",
                "issueNumber":"",
                "description":""
            }
        ]
    }
```

## To run the front-end:
- `cd` into `mmh/marvel-heroes-client`
- run `npm install`
- Start the angular sever with `ng serve`
