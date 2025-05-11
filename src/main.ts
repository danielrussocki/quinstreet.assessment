/* fonts */
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
/* components */
import { Button } from "./components/button";
import { MaskInput } from "./components/maskInput";
/* styles */
import "./style.css";

const endpointUri =
  "https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar";

document.addEventListener("DOMContentLoaded", () => {
  new MaskInput(".app-mask-input");
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
      button.setDisabled(true);

      const response = await fetch(endpointUri, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (!response.ok) throw new Error("something went wrong!");
      const data = await response.json();
      button.setText("Submitted");
      console.log(data);
    } catch (e) {
      button.setDisabled(false);
      console.error(e);
    }
  }

  const formElement = document.getElementById("app-form") as HTMLFormElement;

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(formElement);
  });
});
