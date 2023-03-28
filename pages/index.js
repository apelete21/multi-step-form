import Head from "next/head";
import Step from "../components/step/step";
import { useState } from "react";
import Form from "../components/form";

const stepTitles = ["Bienvenue", "Vos informations", "Horaires"];

function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullname: "",
      email: "",
      phoneNumber: "",
      car: "",
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
        hoursInfo: info,
      });
    } else if (step == 4) {
      setStep(1)
    }
    console.log(formData);
  }

  return (
    <>
      <Head>
        <title>Multi Step Form</title>
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
