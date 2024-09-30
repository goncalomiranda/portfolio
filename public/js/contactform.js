$(document).ready(function () {
  $("#contactForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var email = $("input#email").val();
    var name = $("input#name").val();
    var subject = "Website Contact: " + name;
    var message = $("textarea#message").val();

    // Disable the submit button to prevent multiple submissions
    var $this = $(this).find("button[type='submit']");
    $this.prop("disabled", true);

    // Send the form data to the internal API
    $.ajax({
      url: "/api/send-email",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
      success: function (response) {
        console.log("response:", response);
        // Clear all fields
        $("#contactForm").trigger("reset");
      },
      error: function (error) {
        console.error("An error occurred while sending the email.");
      },
      complete: function () {
        // Re-enable the submit button
        $this.prop("disabled", false);
      },
    });
  });
});
