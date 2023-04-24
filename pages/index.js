import Head from "next/head";
import Step from "../components/step/step";
import { useEffect, useState } from "react";
import Form from "../components/form";
import axios from "axios";

const stepTitles = [
  "Bienvenue",
  "Vos informations",
  "Conducteurs",
  "Passagers",
  "Horaires",
];

function Home() {
  const [step, setStep] = useState(1);
  const [requestLoading, setRequestLoading] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullname: "",
      secondName: "",
      email: "",
      map_address: "",
      phoneNumber: "",
      car: "",
    },
    driversInfo: {
      freePlaces: Number,
      pricePerPlace: Number,
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
    }
  }

  /**
   * sending request for register
   */
  useEffect(() => {
    if (step == 6) {
      const register = async () => {
        const headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          first_name: formData.personalInfo.fullname,
          last_name: formData.personalInfo.secondName,
          phone_number: formData.personalInfo.phoneNumber,
          map_address: formData.personalInfo.map_address,
          address: formData.passengersInfo.address,
          has_car: formData.personalInfo.car === "Oui" ? true : false,
          nb_of_available_place: formData.driversInfo.freePlaces,
          estimated_price:
            formData.personalInfo.car === "Oui"
              ? formData.driversInfo.pricePerPlace
              : null,
          car_brand: formData.driversInfo.carBrand,
          fuel_type: formData.driversInfo.fuel,
          day: formData.hoursInfo.days,
          departure_home_time: formData.hoursInfo.homeDeparture,
          departure_work_time: formData.hoursInfo.WorkDeparture,
          interested_in_carpooling:
            formData.hoursInfo.finalDecision === "Oui" ? true : false,
        });

        let reqOptions = {
          url: "https://pro.tukkijamm.com/api/v1/pre_user_registers",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };

        console.log(bodyContent)

        let response = await axios.request(reqOptions);
        console.log(response.data);
        if (response.ok) {
          setRequestLoading(!requestLoading)
        } else {
          setStep(7)
        }
      };
      register();
    }
  }, [step]);

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
          requestLoading={requestLoading}
          setRequestLoading={setRequestLoading}
        />
      </main>
    </>
  );
}

export default Home;
