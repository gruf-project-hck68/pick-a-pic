import Swal from "sweetalert2";

export const SwalSuccess = (success_title, success_message) => {
  Swal.fire({
    title: success_title ? success_title : "Success",
    text: success_message ? success_message : "Operation successfully executed",
    icon: "success",
    confirmButtonText: "Cool",
  });
};

export const SwalError = (error) => {
  let message = error.message || "Internal server error";

  switch (error.name) {
    case "noTitle":
      message = "Title is required";
      break;

    case "noUser":
      message = "User does not exist";
      break;

    case "noContent":
      message = "Content is required";
      break;

    case "upVoted":
      message = "already upvoted";
      break;

    case "downVoted":
      message = "already downvoted";
      break;

    case "fieldRequired":
      message = "Please fill in both name and profile picture fields";
      break;
  }
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "Cool",
  });
};
