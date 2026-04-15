const CounteriesContainer = document.querySelector(".countries-container");
const FilterByRegion = document.querySelector(".filter-by-region");
const SearchInput = document.querySelector(".search-input");
const themeChanger = document.querySelector(".theme-changer");
const icon = themeChanger.querySelector("i");
const savedTheme = localStorage.getItem("theme");
const loader = document.querySelector(".loader-container");
let allCountries = [];

// fetch API
fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region")
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;

    loader.classList.add("hide"); // 👈 loader બંધ

    renderCountries(allCountries);
  })
  .catch((err) => {
    loader.innerText = "Failed to load data 😢";
    console.error(err);
  });

// create cards function
function renderCountries(country) {
  CounteriesContainer.innerHTML = "";
  country.forEach((country) => {
    const CountryCard = document.createElement("a");
    CountryCard.classList.add("country-card");

    CountryCard.href = `country.html?name=${encodeURIComponent(
      country.name.common,
    )}`;

    CountryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0] || "N/A"}</p>
      </div>`;

    CounteriesContainer.append(CountryCard);
  });
}
// impliment filter logic
FilterByRegion.addEventListener("change", (e) => {
  const selectedRegion = e.target.value;

  if (selectedRegion === "All") {
    renderCountries(allCountries);
  } else {
    const filteredCountries = allCountries.filter(
      (country) => country.region === selectedRegion,
    );

    renderCountries(filteredCountries);
  }
});

// impliment SearchInput
SearchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue),
  );

  renderCountries(filteredCountries);
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
