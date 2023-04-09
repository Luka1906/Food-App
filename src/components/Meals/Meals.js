import React, { useEffect,useState } from "react";
import Card from "../UI/Card";
import MealItems from "./MealItems";
import classes from "./Meals.module.css";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null)
  
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-dbda5-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    };

    fetchMeals().catch(error => {
      setHttpError(error.message);
      setIsLoading(false);

    });
  });

  if(isLoading) {
    return <section className={classes["meals-loading"]}>
      <p>Loading...</p>
    </section>
  };

  if(httpError) {
    return <section>
      <h3 className={classes["meals-error"]}>{httpError}</h3>
    </section>
  }

  
  const mealItems = meals.map((meal) => (
    <MealItems
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <Card>
      <MealsSummary />
      <section className={classes["items-list"]}>
        <ul>{mealItems}</ul>
      </section>
    </Card>
  );
};

export default Meals;
