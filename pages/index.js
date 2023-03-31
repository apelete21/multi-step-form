import Head from "next/head";
import Step from "../components/step/step";
import { useState } from "react";
import Form from "../components/form";

const stepTitles = [
  "Bienvenue",
  "Vos informations",
  "Conducteurs",
  "Passagers",
  "Horaires",
];

function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullname: "",
      secondName: "",
      email: "",
      phoneNumber: "",
      car: "",
    },
    driversInfo: {
      freePlaces: "",
      pricePerPlace: "",
      carBrand: "",
      fuel: "",
    },
    passengersInfo: { 
      tripPrice: "",
    },
    hoursInfo: {
      days: [],
      homeDeparture: "",
      WorkDeparture: "",
      finalDecision: "",
    },
  });

  function updateFormData(info) {
    if (step == 2) {
      setFormData({
        ...formData,
        // Probably better to add each individual key:value of personalInfo but oh well
        personalInfo: info,
      });
    } else if (step == 3) {
      setFormData({
        ...formData,
        driversInfo: info,
      });
    } else if (step == 4) {
      setFormData({
        ...formData,
        passengersInfo: info,
      });
    } else if (step == 5) {
      setFormData({
        ...formData,
        hoursInfo: info,
      });
    } else if (step == 6) {
      setStep(1);
    }
  }

  return (
    <>
      <Head>
        <title>Formulaire Covoiturage Entreprise </title>
        <meta name="description" content="Multi-step Form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <aside>
          {stepTitles.map((title, i) => {
            return (
              <Step key={title} step={step} stepNumber={i + 1}>
                {title}
              </Step>
            );
          })}
        </aside>
        <Form
          step={step}
          setStep={setStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      </main>
    </>
  );
}

export default Home;
