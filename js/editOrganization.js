function editOrganization() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("=") + 1);
  console.log(id);
  if (document.querySelector("#editOrg")) {
    document
      .querySelector("#editOrg form")
      .addEventListener("submit", async e => {
        e.preventDefault();
        const organizationName = document.querySelector(
          "form #organisationName"
        ).value;
        console.log(organizationName);

        if (organizationName) {
          const data = {
            organizationName
          };

          const URL = `${HOST}/api/v1/organisations/${id}`;
          const result = await sendData("PUT", URL, data, "json");
          console.log(result);
          if (result) {
            document
              .querySelector(".message")
              .classList.replace("hidden", "show");
            document.querySelector(".message").innerHTML =
              result.error || ` The Organisation name edited successfully.`;
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
  editOrganization();
});
