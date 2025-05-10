/* fonts */
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
/* components */
import { Button } from "./components/button";
/* styles */
import "./style.css";

// TODO: Mask del Input de Phone Numer
// TODO: Funcionalidad del Read More...
// TODO: Regex para validar input Email
// TODO: Validaciones de Inputs en general
// TODO: Fondo cambiante según email
// TODO: Agregar un state disabled al botón cuando se encuentre en loading para evitar múltiples clicks

const endpointUri =
  "https://url.us.m.mimecastprotect.com/s/L5k1CmZ258C1ELGqcOhJTRnXp3?domain=formsws-hilstaging-com-0adj9wt8gzyq.runscope.net";

document.addEventListener("DOMContentLoaded", () => {
  const button = new Button("#app-button");

  async function submitForm(el: HTMLFormElement) {
    const formData = new FormData(el);

    /* ajax version */
    // const formJsonData: Record<string, string> = {};
    // formData.forEach((item, key) => {
    //   if (item instanceof File) return;
    //   formJsonData[key] = item;
    // });
    // const encodedData = new URLSearchParams(formJsonData).toString();

    // const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", endpointUri);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.send(encodedData);

    /* fetch version */
    try {
      button.setLoading(true);

      const response = await fetch(endpointUri, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("something went wrong!");
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    } finally {
      button.setLoading(false);
    }
  }

  const formElement = document.getElementById("app-form") as HTMLFormElement;

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(formElement);
  });
});
