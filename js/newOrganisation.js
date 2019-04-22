function newOrg() {
  if (document.querySelector("#newOrg")) {
    document
      .querySelector("#newOrg form")
      .addEventListener("submit", async e => {
        e.preventDefault();
        const organizationName = document.querySelector("form #orgName").value;

        if (organizationName) {
          const data = {
            organizationName
          };
          console.log(organizationName);

          const URL = `${HOST}/api/v1/organisations/new`;
          const result = await sendData("POST", URL, data, "json");
          console.log(result);
          if (result) {
            document
              .querySelector(".message")
              .classList.replace("hidden", "show");
            document.querySelector(".message").innerHTML =
              result.error || ` Organization successfuly created.`;
            document
              .querySelector(".message")
              .classList.remove("message-error");
            document
              .querySelector(".message")
              .classList.remove("message-success");
            document
              .querySelector(".message")
              .classList.add(
                result.error ? "message-error" : "message-success"
              );
          }
        }

        return true;
      });
  }
}

window.document.addEventListener("DOMContentLoaded", () => {
  newOrg();
});
