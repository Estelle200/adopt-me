import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="my-6 block h-[130px] w-full overflow-hidden border-b-2 border-[#333]">
        <img className="min-h-[100px] w-[100px]" src={hero} alt={name} />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
        <h1 className="m-0 w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-[30px] font-normal text-[#333]">
          {name}
        </h1>
        <h2 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-normal">
          {" "}
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};
export default Pet;
