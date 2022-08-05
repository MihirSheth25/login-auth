import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import styles from "./../Login.module.css";
import Form from "../../UI/FormStyle/Form";
import Error from "../../UI/Alerts/Error";
import passShowImg from "./../../Assets/PasswordState/show-pass.svg";
import passHideImg from "./../../Assets/PasswordState/hide-pass.svg";

// const loading = {
//   margin: "1em",
//   fontSize: "24px",
// };

// const title = {
//   pageTitle: "Password Reset Screen",
// };

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      passwordShown: false,
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      await axios
        .get("http://localhost:8080/reset-password", {
          params: {
            resToken: token,
          },
        })
        .then((response) => {
          if (response.data.message === "reset link valid") {
            this.setState({
              email: response.data.email,
              updated: false,
              isLoading: false,
              error: false,
            });
          } else {
            this.setState({
              updated: false,
              isLoading: false,
              error: true,
            });
          }
        })
        .catch((error) => {
          console.log(error.data);
        });
      // console.log(response);
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        "http://localhost:8080/update-password",
        {
          email,
          password,
          resToken: token,
        }
      );
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const {
      password,
      confirmPassword,
      passwordShown,
      error,
      isLoading,
      updated,
    } = this.state;

    if (error) {
      return (
        <Form>
          <div className={styles.msg}>
            <h3>Form was not submitted</h3>
            <p>Please try requsting another reset link</p>
          </div>
          {/* // TODO --> ADD LINK HERE */}
          <button type="button">Back to login</button>
        </Form>
      );
    }
    if (isLoading) {
      return (
        <div className={styles.msg}>
          <Form>
            <h3>Please wait...</h3>
          </Form>
        </div>
      );
    }
    return (
      <div className={styles.msg}>
        <Form>
          <h3>Password Reset</h3>
          <form onSubmit={this.updatePassword}>
            <div className={styles.passContainer}>
              <label htmlFor="password">
                New password:
                <input
                  className={styles.passInp}
                  required
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  onChange={this.handleChange("password")}
                />
                <img
                  className={styles.passVisImg}
                  title={passwordShown ? "Hide password" : "Show password"}
                  alt="Password visibility"
                  src={passwordShown ? passHideImg : passShowImg} // TODO --> EDIT
                  // state keeps jumping from false to true and vice versa on click =>
                  onClick={this.setState({
                    passwordShown: (prevState) => !prevState,
                  })}
                />
              </label>
            </div>
            <label htmlFor="confirmPassword">
              Confirm Password:
              <input
                required
                type="password"
                id="confirmPassword"
                onChange={this.handleChange("confirmPassword")}
              />
            </label>
            {password !== confirmPassword && (
              <Error errMsg="Passwords do not match" />
            )}
            <button type="submit">Update Password</button>
          </form>
        </Form>
        {updated && (
          <div className={styles.msg}>
            <Form>
              <h3>Your password was updated successfully</h3>
              {/* // TODO --> ADD LINK HERE */}
              <button type="button">Login Page</button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
