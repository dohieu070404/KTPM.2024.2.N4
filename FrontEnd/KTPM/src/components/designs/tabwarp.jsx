import React from "react";
import "./tabwarp.css";

const TabWrap = ({ groupName = "tabGroup", tabs = [] }) => {
  return (
    <div className="tab-wrap">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            id={`${groupName}${index}`}
            name={groupName}
            className="tab"
            defaultChecked={index === 0}
          />
          <label htmlFor={`${groupName}${index}`}>{tab.label}</label>
        </React.Fragment>
      ))}

      {tabs.map((tab, index) => (
        <div key={index} className="tab__content">
          <h3>{tab.title}</h3>
          {tab.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TabWrap;
