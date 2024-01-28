import { useState } from "react";
import "./form.css";
function FundForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [startupName, setStartupName] = useState("");
  const [fundsRequired, setFundsRequired] = useState();
  const [reason, setReason] = useState("");

  async function sendFundApplication(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://crawler-backend.vercel.app/api/sendFundApplication",
      {
        method: "POST",
        headers: {
          Authentication: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          startupName,
          fundsRequired,
          reason,
        }),
      }
    );

    const data = await response.json();

    console.log(data);
    if (data.status === "ok") {
      window.alert(
        "Your Form Has Been Submitted! Use the portal to track your progress."
      );
    } else {
      window.alert(data.error.message);
    }
  }

  return (
    <div>
      <form action="/login" method="POST" onSubmit={sendFundApplication}>
        <br />
        Your Name:
        <br />
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          required
        />
        <br /> <br />
        Your Email:
        <br />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
        />
        <br /> <br />
        Your Contact Number:
        <br />
        <br />
        <input
          type="tel"
          name="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          pattern="[1-9]{1}[0-9]{9}"
        />
        <br /> <br />
        Startup Name/Idea Name:
        <br />
        <br />
        <input
          type="textarea"
          value={startupName}
          onChange={(e) => setStartupName(e.target.value)}
          required
          rows="4"
          cols="50"
        />
        <br /> <br />
        Funds Required:
        <br />
        <br />
        <input
          type="number"
          value={fundsRequired}
          onChange={(e) => setFundsRequired(e.target.value)}
        />
        <br /> <br />
        Reason:
        <br />
        <br />
        <input
          type="textarea"
          width="50rem"
          height="8rem"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          rows="4"
          cols="50"
        />
        <br />
        <br />
        <input type="submit" className="submitButton" value="Submit"></input>
      </form>
    </div>
  );
}

export default FundForm;
