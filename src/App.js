import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allMail, setAllmail] = useState([]);
  const [viewMail, setViewMail] = useState([]);

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
      <h1
        className="bg-[#1f2125]"
        style={{
          padding: "20px 0px 20px 0px",
          marginTop: "0px",
        }}
      >
        <img
          className="ml-40 lg:ml-80"
          style={{ width: "full", height: "40px" }}
          src="logo-mail.png"
          alt="logo"
        />
      </h1>
      <main className="mt-0">
        <div className="bg-[#343a40] py-8 mt-0">
          <div className="border border-dashed rounded-lg border-[#616266] p-8 w-3/5 h-64 mx-auto">
            <h1 className="text-2xl font-bold -mt-2 mb-4 text-teal-500">
              Make Your Temporary Email Address
            </h1>
            <button
              className="btn bg-[#312e2eef] border-none text-white font-bold py-2 px-4 mt-4 rounded-full"
              onClick={handleEmail}
            >
              Generate Email
            </button>
            <div className="lg:flex text-center justify-between lg:bg-[#55575ae1] rounded-full pb-3 pt-0 mt-3 lg:w-2/4 mx-auto">
              <span
                title="Your Temporary Email"
                className="mt-5 relative mr-2 lg:text-white lg:ml-10 lg:text-lg sm:text-sm text-xs"
                id="email-display"
              >
                Example@gmail.com
              </span>
              <button
                title="Coyp to clipboard"
                className=" mr-3 bg-teal-400 hover:bg-slate-200 pt-3 px-3 pb-1 mt-3 rounded-full text-gray-500"
                onClick={copyContent}
              >
                <span class="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <h3
            className="text-teal-600 font-bold text-xl mb-7"
            style={{ textDecoration: "underline", marginTop: "52px" }}
          >
            All Mail
          </h3>
          <div className="">
            <h1>Count of Mail: {allMail.length}</h1>
            {allMail?.map((m, i) => {
              return (
                <div className="" key={i}>
                  {console.log(m.id)}

                  <div class="rounded-lg p-4 mx-auto lg:w-3/5 mt-3 card-side bg-gray-600 shadow-xl">
                    <div className="lg:flex justify-between w-full">
                      <div className="mr-4">
                        <p>From: {m.from_parsed[0].address}</p>
                        <p className="text-left">
                          Name: {m.from_parsed[0].name}
                        </p>
                      </div>
                      <div className="mr-4 w-64">
                        <p className="text-ellipsis overflow-hidden ...">
                          To: {m.to}
                        </p>
                      </div>
                      <div className="mr-4 w-40">
                        <p className="text-ellipsis overflow-hidden ...">
                          Subject: {m.subject}
                        </p>
                      </div>
                      <div className="">
                        <button
                          onClick={() => setViewMail((prev) => {
                            if(prev.includes(m.id)){
                              return prev.filter(i=>i!==m.id)
                            }
                            return [...prev, m.id]
                          })}
                          className=" bg-[#666768ef] border-none text-whitesmock font-bold px-3 py-1 rounded-xl"
                        >
                          View Email
                        </button>
                      </div>
                    </div>

                    {viewMail.includes(m.id) && (
                      <div className="viewMail mt-8">
                        <p>{m.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <br />
      <footer className="bg-[#383b44] py-4 justify-end flex">
        <img
          className="mr-36 lg:mr-96"
          style={{ width: "full", height: "40px", display: "inline-block" }}
          src="logo-mail.png"
          alt="logo"
        />
      </footer>
    </div>
  );
}

export default App;
