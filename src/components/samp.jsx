import React, { useEffect, useState } from "react";

const SearchWheather = () => {
  const [search, setSearch] = useState("Bengaluru");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4590f50a7f3c9deacd08e897bd12f0f8`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        })

        .catch((err) => console.log(err));
    };
    fetchWeather();
  }, [search]);
  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3d3e63e468a7dd1226d907c7d062ac08`
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setData(result);
  //         console.log(result);
  //       })

  //       .catch((err) => console.log(err));
  //   };
  //   fetchWeather();
  // }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if ((data.weather[0].main = "Thunderstorm")) {
      emoji = "fa-bolt";
    } else if ((data.weather[0].main = "Drizzle")) {
      emoji = "fa-cloud-rain";
    } else if ((data.weather[0].main = "Rain")) {
      emoji = "fa-cloud-shower-heavy";
    } else if ((data.weather[0].main = "Snow")) {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>This location data doesn't exist</div>;
  }

  let temperature = (data.main.temp - 273.15).toFixed();
  let temperature_min = (data.main.temp_min - 273.15).toFixed();
  let temperature_max = (data.main.temp_max - 273.15).toFixed();

  let latitude = data.coord.lat.toFixed(2);
  let longitude = data.coord.lon.toFixed(2);

  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  //Time
  let Time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput("");
  };

  return (
    <div style={{ height: "100vh" }} className="bg-dark overflow-auto ">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3 w-50 mt-1 mx-auto">
          <input
            type="search"
            className="form-control mt-2"
            placeholder="Search City"
            aria-label="Search City"
            aria-describedby="basic-addon2"
            name="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="input-group-text mt-2"
            id="basic-addon2"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <div className="d-inline-flex m-10px mb-5">
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-4 ">
              <div className="card bg-dark text-white">
                <img
                  className="card-img"
                  src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                  alt="Card image"
                />
                <div className="card-img-overlay ">
                  <div className="bg-dark bg-opacity-50 py-3 h-100">
                    <h5 className="card-title">
                      {data.name},{data.sys.country}
                    </h5>
                    <p className="card-text lead">
                      {day},{month} {date}, {year}
                      <br />
                      {Time}
                    </p>

                    <hr />
                    <div className="d-flex justify-content-around align-items-center ">
                      <div className="overflow-auto">
                        <i className={`fas ${emoji} fa-2x`}></i>
                        <h1 className="fw-bolder mb-0">{temperature} &deg;c</h1>
                        <p className="lead fw-bolder mb-0">
                          {data.weather[0].main}
                        </p>
                        <h1 className="lead mt-4">
                          {temperature_min}&deg;c | {temperature_max}&deg;c
                        </h1>
                      </div>
                      {/* <div>
                        <h6 className="fw-bolder">Humidity</h6>
                        <i className="fas fa-humidity fa-2x"></i>

                        <h3 className="fw-bolder mb-1">{data.main.humidity}</h3>
                        <h6 className="mt-0">Pressure</h6>
                        <i class="fas fa-tire-pressure-warning fa-1x"></i>

                        <h3 className="fw-bolder mb-1">{data.main.pressure}</h3>
                      </div> */}
                      {/* <div>
                        <h6 className="fw-bolder">Latitude</h6>

                        <h3 className="fw-bolder mb-1">{latitude}</h3>

                        <h6 className="mt-0">Longitude</h6>
                        <h3 className=" fw-bolder">{longitude}</h3>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark text-white">
                <img
                  className="card-img"
                  src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                  alt="Card image"
                />
                <div className="card-img-overlay">
                  <div className="bg-dark bg-opacity-50 py-3 h-100">
                    <h5 className="card-title">
                      {data.name},{data.sys.country}
                    </h5>
                    <p className="card-text lead">
                      {day},{month} {date}, {year}
                      <br />
                      {Time}
                    </p>
                    <hr />
                    <div className="col-md h-75 mt-0 mb-10">
                      <h6 className="fw-bolder">Humidity</h6>
                      {/* <i className="fas fa-humidity fa-2x"></i> */}
                      {/* <i className={`fas ${emoji} fa-2x`}></i> */}
                      <h3 className="fw-bolder mb-1">{data.main.humidity}</h3>
                      <h6 className="mt-0">Pressure</h6>
                      {/* <p className="lead fw-bolder mb-0">
                      {data.weather[0].main}
                    </p> */}
                      {/* <p className="lead">{data.main.pressure}</p> */}
                      <h3 className="fw-bolder mb-1">{data.main.pressure}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark text-white">
                <img
                  className="card-img"
                  src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                  alt="Card image"
                />
                <div className="card-img-overlay">
                  <div className="bg-dark bg-opacity-50 py-3 h-100">
                    <h5 className="card-title">
                      {data.name}, {data.sys.country}
                    </h5>
                    <p className="card-text lead">
                      {day},{month} {date}, {year}
                      <br />
                      {Time}
                    </p>
                    <hr />
                    <div className="col-md h-75 mt-0 mb-10">
                      <h6 className="fw-bolder">Latitude</h6>

                      <h3 className="fw-bolder mb-1">{latitude}</h3>

                      <h6 className="mt-0">Longitude</h6>
                      <h3 className=" fw-bolder">{longitude}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWheather;
