// import React, { useState } from "react";
// import axios from "axios";

// import styles from "./../Login.module.css";
// import Form from "../../UI/FormStyle/Form";
// import Error from "../../UI/Alerts/Error";
// // import Accept from "../../UI/Alerts/Accept";
// import passHideImg from "./../../Assets/PasswordState/hide-pass.svg";
// import passShowImg from "./../../Assets/PasswordState/show-pass.svg";

// function Confirm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordShown, setPasswordShown] = useState(false);

//   const [update, setUpdate] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   async function Reset() {
//     console.log(this.props.match.params.token);
//     await axios
//       .get("http://localhost:8080/reset-password", {
//         params: {
//           resToken: this.props.match.params.token,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         if (response.data.message === "reset link valid") {
//           setEmail(response.data.email);
//           setUpdate(false);
//           setLoading(false);
//           setError(false);
//         } else {
//           setUpdate(false);
//           setLoading(false);
//           setError(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error.data);
//       });
//   }

//   // useEffect(() => {
//   //   const ignore = false;

//   //   if (!ignore) {
//   //     Reset();
//   //   }
//   // });

//   const updatePassword = (e) => {
//     e.preventDefault();
//     axios
//       .put("http://localhost:8080/update-password", {
//         email: email,
//         password: password,
//       })
//       .then((response) => {
//         console.log(response.data);
//         if (response.data.message === "password updated") {
//           setUpdate(true);
//           setError(false);
//         } else {
//           setUpdate(false);
//           setError(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error.data);
//       });
//   };

//   if (error) {
//     return (
//       <Form>
//         <div className={styles.msg}>
//           <h3>Form was not submitted</h3>
//           <p>Please try requsting another reset link</p>
//         </div>
//         {/* // TODO --> ADD LINK HERE */}
//         <button type="button">Back to login</button>
//       </Form>
//     );
//   } else if (loading) {
//     return (
//       <div className={styles.msg}>
//         <Form>
//           <h3>Please wait...</h3>
//         </Form>
//       </div>
//     );
//   } else {
//     return (
//       <div className={styles.msg}>
//         <Form>
//           <h3>Password Reset</h3>
//           <form onSubmit={this.updatePassword}>
//             <div className={styles.passContainer}>
//               <label htmlFor="password">
//                 New password:
//                 <input
//                   className={styles.passInp}
//                   required
//                   type={passwordShown ? "text" : "password"}
//                   id="password"
//                   onChange={this.handleChange("password")}
//                 />
//                 <img
//                   className={styles.passVisImg}
//                   title={passwordShown ? "Hide password" : "Show password"}
//                   alt="Password visibility"
//                   src={passwordShown ? passHideImg : passShowImg} // TODO --> EDIT
//                   // state keeps jumping from false to true and vice versa on click =>
//                   onClick={() => setPasswordShown((prevState) => !prevState)}
//                 />
//               </label>
//             </div>
//             <label htmlFor="confirmPassword">
//               Confirm Password:
//               <input
//                 required
//                 type="password"
//                 id="confirmPassword"
//                 onChange={this.handleChange("confirmPassword")}
//               />
//             </label>
//             {password !== confirmPassword && (
//               <Error errMsg="Passwords do not match" />
//             )}
//             <button type="submit">Update Password</button>
//           </form>
//         </Form>
//         {update && (
//           <div className={styles.msg}>
//             <Form>
//               <h3>Your password was updated successfully</h3>
//               {/* // TODO --> ADD LINK HERE */}
//               <button type="button">Login Page</button>
//             </Form>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// export default Confirm;
