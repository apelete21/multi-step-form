import Head from "next/head";
import Step from "../components/step/step";
import { useEffect, useState } from "react";
import Form from "../components/form";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../service/urls";
import { dateGen } from "../service/dateGen";

const stepTitles = [
  "Bienvenue",
  "Vos informations",
  "Conducteurs",
  "Passagers",
  "Horaires",
];

function Home() {
  // request to get companiy logo
  const [logoUrl, setLogoUrl] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const { index: company } = router.query;
  useEffect(() => {
    const getCompanyLogo = () => {
      axios
        .get(`${url.logo}/${company}`)
        .then((res) => {
          setLogoUrl(res.data.logo);
          setSlug(res.data.slug);
        })
        .catch((err) => {
          console.log(err);
          setLogoUrl(null);
        });
    };
    if (company) getCompanyLogo();
  }, [company]);

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
          home_map_address: formData.personalInfo.map_address,
          home_address: formData.passengersInfo.address,
          has_car: formData.personalInfo.car === "Oui" ? true : false,
          nb_of_available_place: formData.driversInfo.freePlaces,
          estimated_price:
            formData.personalInfo.car === "Oui"
              ? formData.driversInfo.pricePerPlace
              : null,
          car_brand: formData.driversInfo.carBrand,
          fuel_type: formData.driversInfo.fuel,
          carpooling_days: formData.hoursInfo.days,
          departure_home_time: dateGen(formData.hoursInfo.homeDeparture),
          departure_work_time: dateGen(formData.hoursInfo.WorkDeparture),
          interested_in_carpooling:
            formData.hoursInfo.finalDecision === "Oui" ? true : false,
          carpooling_decline_reasons:
            formData.hoursInfo.finalDecision === "Oui"
              ? ""
              : formData.hoursInfo.finalDecision,
          company_id: slug,
        });

        let reqOptions = {
          url: url.submission,
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };

        console.log(bodyContent);
        try {
          let response = await axios.request(reqOptions);
          console.log(response.data);
          setRequestLoading(!requestLoading);
        } catch (error) {
          setStep(7);
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
          logoUrl={logoUrl}
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
