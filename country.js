const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const CountryNameh1 = document.querySelector(".country-name");
const Nativename = document.querySelector(".Native-name");
const Population = document.querySelector(".Population");
const Region = document.querySelector(".Region");
const subRegion = document.querySelector(".sub-region");
const Capital = document.querySelector(".Capital");
const TopLevelDomain = document.querySelector(".top-level-domain");
const Currencies = document.querySelector(".Currencies");
const Languages = document.querySelector(".Languages");
const BorderCountry = document.querySelector(".Border-Counteries");
const savedTheme = localStorage.getItem("theme");
const themeChanger = document.querySelector(".theme-changer");
const loader = document.querySelector(".loader-container");
const icon = themeChanger.querySelector("i");

// hide container 
const container = document.querySelector(".Country-detailes-container");
container.style.display = "none";

// Use API
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {

    loader.classList.add("hide");   // loader બંધ
    container.style.display = "block"; // content દેખાડવું

    flagImg.src = country.flags.svg; // show flag

    // **** Handle Country Detailes ****//
    // handle Country Name
    CountryNameh1.innerText = country.name.common;
    console.log(country);

    // handle Top-Level_domain
    TopLevelDomain.innerText = country.tld;
    if (country.name.nativeName) {
      Nativename.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      Nativename.innerText = country.name.common;
    }

    // handle Population
    Population.innerText = country.population.toLocaleString("en-IN");

    // handle Region
    Region.innerText = country.region;
    // handle sub-region
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    // handle capital
    if (country.capital?.[0]) {
      Capital.innerText = country.capital?.[0];
    }
    // handle currencies
    if (country.currencies) {
      Currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    // handle languages
    if (country.languages) {
      Languages.innerText = Object.values(country.languages).join(", ");
    }
    // handle Border Country
    if (country.borders) {
      country.borders.forEach((border) => {
        console.log(border);
        fetch(` https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log([borderCountry]);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            // console.log(borderCountryTag);
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            BorderCountry.append(borderCountryTag);
          });
      });
    }
  });

// APPLY SAVED THEME
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeChanger.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
} else {
  document.body.classList.remove("dark");
  themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
}
// handle dark mode
themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // SAVE THEME
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeChanger.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
  } else {
    localStorage.setItem("theme", "light");
    themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
  }
});
