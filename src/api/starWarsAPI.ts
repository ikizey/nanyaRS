export const fetchStarWarsCharacters = async (searchTerm: string) => {
  const url = searchTerm
    ? `https://swapi.dev/api/people/?search=${searchTerm}`
    : "https://swapi.dev/api/people/?page=1";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results
    .slice(0, 10)
    .map((item: { name: string; gender: string; url: string }) => ({
      name: item.name,
      gender: item.gender,
      url: item.url,
    }));
};
