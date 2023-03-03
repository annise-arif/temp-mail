import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allMail, setAllmail] = useState([]);
  console.log(allMail);

  useEffect(() => {
    fetch(
      "https://api.testmail.app/api/json?apikey=87384f5c-db35-4c17-8efa-e43eae70fd4e&namespace=cibce&pretty=true",
      {
        headers: {
          Authorization: "Bearer 87384f5c-db35-4c17-8efa-e43eae70fd4e",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAllmail(data.emails));
  }, []);

  const handleEmail = () => {
    const domains = ["inbox.testmail.app"];
    const usernameLength = Math.floor(Math.random() * (12 - 6 + 1) + 6);
    const username = Array.from({ length: usernameLength }, () => {
      return String.fromCharCode(
        Math.floor(Math.random() * (122 - 97 + 1) + 97)
      );
    }).join("");
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `cibce.${username}@${domain}`;

    document.getElementById("email-display").innerHTML = email; // display the generated email in the email display
  };

  const copyContent = async () => {
    let text = document.getElementById("email-display").innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="App">
      <h1 style={{backgroundColor: "gray", padding: "20px 0px 20px 0px", marginTop: "0px"}}>header</h1>
      <br />
      <main>
        <button onClick={handleEmail}>Generate Email</button>
        <div>
          <div id="email-display" style={{ margin: "15px 0px 15px 0px" }}></div>{" "}
          <button onClick={copyContent}>Copy Email</button>
        </div>

        <div>
          <h3 style={{textDecoration: "underline", marginTop: "52px"}}>All Mail</h3>
          <div>
            {allMail?.map((m, i) => {
              return (
                <div key={i}>
                  <p>Name: {m.from_parsed[0].name}</p>
                  <p>From: {m.from_parsed[0].address}</p>
                  <div>Subject: {m.subject}</div>
                  <hr />
                </div>
                
              );
            })}
          </div>
        </div>
      </main>
      <br />
      <footer style={{backgroundColor: "gray"}}>footer</footer>
    </div>
  );
}

export default App;
