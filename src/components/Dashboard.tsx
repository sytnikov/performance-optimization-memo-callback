import { log } from "console";
import React from "react";
import { useCallback, useMemo, useState } from "react";

interface PrintClickedItemProps {
  favouriteItems: string[];
  handleItemClick: (item: string) => void;
  clickedItem: string;
}

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({ name: "John", age: 30 });
  const [items, setItems] = useState<string[]>([
    "Apple",
    "Pear",
    "Orange",
    "Potato",
  ]);
  const [clickedItem, setClickedItem] = useState("");

  // useCallback helps to prevent redeclaration of the function while the component is rerendered
  const handleItemClick = useCallback((item: string) => {
    console.log("Item click ");
    setClickedItem(item);
  }, []);

  const favouriteItems = useMemo(
    // returns the value of the executed function, in this case the list of favourite items
    () =>
      items.filter((item) => {
        console.log(
          "Favourite items being recalculated without optimization..."
        );
        return item.toLowerCase().includes("o");
      }),
    [items]
  );

  const refreshUserDetails = () => {
    console.log("Refreshing user details...");
    setUserDetails((details) => ({
      ...details,
      age: details.age + 1,
    }));
  };

  console.log("Dashboard without optimization rendered");

  return (
    <div>
      <h1>{userDetails.name}'s Dashboard (no optimization)</h1>
      <p>Age: {userDetails.age}</p>
      <button onClick={refreshUserDetails}>Refresh User Details</button>
      <PrintClickedItem
        favouriteItems={favouriteItems}
        handleItemClick={handleItemClick}
        clickedItem={clickedItem}
      />
    </div>
  );
};

const PrintClickedItem = React.memo(({ // React.memo() helps to prevent the component from being rerendered when the props don't change
  favouriteItems,
  handleItemClick,
  clickedItem,
}: PrintClickedItemProps) => {
  console.log("printclickeditem is rerendered....");

  return (
    <div>
      <ul>
        {favouriteItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      {clickedItem && <p>You clicked on {clickedItem}</p>}
    </div>
  );
});

export default Dashboard;
