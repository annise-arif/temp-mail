import "./App.css";

function App() {


    const handleEmail = () => {
      const domains = ["gmail.com"];
      const usernameLength = Math.floor(Math.random() * (12 - 6 + 1) + 6);
      const username = Array.from({ length: usernameLength }, () => {
        return String.fromCharCode(
          Math.floor(Math.random() * (122 - 97 + 1) + 97)
        );
      }).join("");
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const email = `${username}@${domain}`;

      document.getElementById("email-display").innerHTML = email; // display the generated email in the email display
    }

    const copyContent = async () => {
      let text = document.getElementById('email-display').innerHTML;
      try {
        await navigator.clipboard.writeText(text);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

  return (
    <div className="App">
      <h1>header</h1>
      <br />
      <hr />
      <main>
        <button onClick={handleEmail}>Generate Email</button>
        <div>
        <div id="email-display" style={{margin: "15px 0px 15px 0px"}}></div> <button onClick={copyContent}>Copy Email</button>
        </div>
      </main>
      <br />
      <hr />
      <footer>footer</footer>
    </div>
  );
}

export default App;
