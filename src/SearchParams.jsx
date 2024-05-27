import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSerach from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSerach);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
      className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input 
           type ="text" 
           name="location" 
           id="loaction"
           className="search-input"
           placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select className="search-input grayed-out-disabled"
          id="breed" 
          disabled={breeds.length === 0}
          
           name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2  text-white border-none bg-orange-500 hover:opacity-50">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
