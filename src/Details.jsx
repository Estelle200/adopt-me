import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌌</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];

  return (
    <div className="shadow-custom mx-auto mb-[25px] w-[1100px] rounded-[6px] bg-[#faeff0] p-[15px]">
      <Carousel images={pet.images} />
      <div>
        <h1 className="my-[5px] mx-0 text-center text-[60px] text-[#333]">
          {pet.name}
        </h1>
        <h2 className="my-[5px] mx-0 mb-[20px] text-center">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button
            className="mx-auto block cursor-pointer rounded-md border border-[#333] bg-[#ad343e] px-6 py-1 text-lg text-white"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
          <p className="px-[15px] py-0 leading-[1.5]">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className="max-w-[500px] rounded-[30px] bg-[#faeff0] p-[15px] text-center">
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="mx-auto block cursor-pointer rounded-md border border-[#333] bg-[#ad343e] px-6 py-1 text-lg text-white">
                  <button
                    className="mr-4 inline-block"
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="mr-4 inline-block"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
