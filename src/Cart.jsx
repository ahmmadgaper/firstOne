import "./Cart.css";
import { useEffect } from "react";
import axios from "axios";
export default function Cart({ count, setCount }) {
  const x =
    JSON.parse(localStorage.getItem("itemCount")) == null
      ? {}
      : JSON.parse(localStorage.getItem("itemCount"));

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products?offset=0&limit=20",
    }).then(function (response) {
      setCount({ ...count, storageKey: response.data });
      localStorage.setItem(`items`, JSON.stringify(response.data));
    });
  }, []);
  const datA = JSON.parse(localStorage.getItem("items"));
  function counts(value, idd) {
    const vv = Number(document.getElementsByClassName("vv")[0].innerHTML);
    const updatedCount = value == "add" ? vv + 1 : vv - 1 < 0 ? 0 : vv - 1;
    x[idd] = updatedCount;
    setCount({ ...count, itemCount: x });
    localStorage.setItem("itemCount", JSON.stringify(x));
  }
  function itemsClicked(itemClicked, enabled, id) {
    enabled
      ? setCount({ ...count, itemSelected: itemClicked, itemPushed: 1 })
      : setCount({ ...count, itemSelected: { 0: 0 }, itemPushed: 0 });

    document.getElementsByClassName("enabled")[0]
      ? document
          .getElementsByClassName("enabled")[0]
          .classList.remove("enabled")
      : null;

    enabled && window.innerWidth < 768
      ? setTimeout(() => {
          document.getElementsByClassName("box")[0].classList.add("enabled");
        }, 300)
      : document.getElementsByClassName("box")[0].classList.remove("enabled");

    enabled && window.innerWidth >= 768
      ? setTimeout(() => {
          document.getElementsByClassName(id)[0].classList.add("enabled");
        }, 300)
      : document.getElementsByClassName(id)[0].classList.remove("enabled");
  }

  return datA ? (
    <>
      <div className="headBar">
        <div className="label">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 2 20 20">
            <path d="M2 3h20v4H2zm17 5H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-2zm-3 6H8v-2h8v2z" />
          </svg>
          <h2>El Box</h2>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {window.innerWidth < 768 ? (
          <div className="cataloug">
            {!count.itemPushed ? (
              <div className="box">
                <div className="productContainered">
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="box">
                <div className="productContainerMob">
                  <div>
                    <img src={count.itemSelected.images[0]} alt="logo" />
                  </div>
                  <div>
                    <h3>{count.itemSelected.title}</h3>
                    <h3>{count.itemSelected.price} $</h3>
                  </div>
                  <div>
                    <p>{count.itemSelected.description}</p>
                  </div>
                  <div className="cartContainer">
                    <div>
                      <h3 onClick={() => counts("add", count.itemSelected.id)}>
                        +
                      </h3>
                      <p className="vv">
                        {x == null || 0
                          ? 0
                          : x[count.itemSelected.id]
                          ? x[count.itemSelected.id]
                          : 0}
                      </p>
                      <h3
                        onClick={() => counts("remove", count.itemSelected.id)}
                      >
                        -
                      </h3>
                    </div>
                    <h3 onClick={() => console.log("hello")}>Add</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="items">
        {datA.map((item) => (
          <div
            key={item.id}
            className={`item ${item.id}`}
            onClick={() => itemsClicked(item, 1, item.id)}
          >
            <div className="fogg">
              {window.innerWidth >= 768 ? (
                <div className="box">
                  {!count.itemPushed ? (
                    <div className="box">
                      <div></div>
                    </div>
                  ) : (
                    <div className="productContainer">
                      <div>
                        <h3>{count.itemSelected.title}</h3>
                        <h3>{count.itemSelected.price} $</h3>
                      </div>
                      <div>
                        <p>{count.itemSelected.description}</p>
                      </div>
                      <div className="cartContainer">
                        <div>
                          <h3
                            onClick={() => counts("add", count.itemSelected.id)}
                          >
                            +
                          </h3>
                          <p className="vv">
                            {x == null || 0
                              ? 0
                              : x[count.itemSelected.id]
                              ? x[count.itemSelected.id]
                              : 0}
                          </p>
                          <h3
                            onClick={() =>
                              counts("remove", count.itemSelected.id)
                            }
                          >
                            -
                          </h3>
                        </div>
                        <h3 onClick={() => console.log("hello")}>Add</h3>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="ddtt">
                <div className="dtl">
                  <h3>{item.price} $</h3>
                </div>
                <div>
                  <img src={item.images[0]} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <></>
  );
}
