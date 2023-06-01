import React, { useState } from "react";

function HiringCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contactNo: "",
    email: "",
  });

  const handleFormChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //   // Get the data from the form
    // const firstName = event.target.firstName.value;
    // const lastName = event.target.lastName.value;
    // const address = event.target.address.value;
    // const contactNo = event.target.contactNo.value;
    // const email = event.target.email.value;

    // // Send the data to the database
    // // Add the event listener to the submit button
    // const submitButton = document.getElementById("submitButton");
    // submitButton.addEventListener("click", handleSubmit);

    // Here, you can handle the form submission as per your requirements
    console.log(formData);
    // Reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      contactNo: "",
      email: "",
    });
    // Close the modal
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid lg:grid-flow-col   rounded-lg shadow p-2 border-solid">
      <img
        src={props.imageUrl}
        alt={props.imageAlt}
        className="max-w- max-h-80 object-fit mb-1 p-2 pt-8 rounded-full"
      />

      <div className="flex-col p-6">
        <h3 className="text-lg  font-bold mb-2">{props.position}</h3>
        <p className="text-white-400 mb-2">{props.description}</p>
        <p className="text-white-400 mb-2">
          <strong>Experience:</strong> {props.experience}
        </p>
        <p className="text-white-400 mb-2">
          <strong>Requirements:</strong> {props.requirements}
        </p>
        <p className="text-white-500">
          <strong>Salary:</strong> {props.salary}
        </p>

        <button
          className="bg-transparent font-normal rounded-lg border-2 border10 text10 box-glow text10 transition-all text-base px-4 mt-4"
          onClick={openModal}
        >
          Apply now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg30 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              Apply for {props.position}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactNo">Contact No:</label>
                <input
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleFormChange}
                  className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="h-8 bg-transparent border-b-[1px] border-white/90 text-white/90 text-opacity-75 focus:outline-none px-2 m-1 flex-1 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-transparent font-normal rounded border-2 border10 text10 box-glow transition-all text10  text-base px-4 ml-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-transparent font-normal border-2 rounded border10 text10 box-glow transition-all text10  text-base px-4 ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HiringCard;
