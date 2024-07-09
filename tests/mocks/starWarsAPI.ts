import { LoaderFunctionArgs } from "react-router-dom";

const mockCharactersResults = {
  count: 82,
  results: [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      skin_color: "white",
      eye_color: "yellow",
      birth_year: "41.9BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2014-12-10T15:18:20.704000Z",
      edited: "2014-12-20T21:17:50.313000Z",
      url: "https://swapi.dev/api/people/4/",
    },
  ],
};

const mockCharacter = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.dev/api/people/1/",
};

export const fetchStarWarsCharacters = async (_fnArgs: LoaderFunctionArgs) => {
  _fnArgs;
  return new Promise((resolve) => {
    resolve({
      results: mockCharactersResults.results,
      maxPage: Math.ceil(mockCharactersResults.count / 10),
    });
  });
};

export const fetchStarWarsCharacter = async (_fnArgs: LoaderFunctionArgs) => {
  _fnArgs;
  return new Promise((resolve) => {
    resolve(mockCharacter);
  });
};
