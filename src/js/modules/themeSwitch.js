function themeSwitch() {
  const themeSwitch = document.querySelector("#theme-switch");
  themeSwitch.checked = localStorage.getItem("switchedTheme") === "true";
  themeSwitch.checked
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");

  themeSwitch.addEventListener("change", function (e) {
    if (e.currentTarget.checked === true) {
      // Add item to localstorage
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("switchedTheme", "true");
    } else {
      // Remove item if theme is switched back to normal
      localStorage.removeItem("switchedTheme");
      document.body.removeAttribute("data-theme");
    }
  });
}

export default themeSwitch;
