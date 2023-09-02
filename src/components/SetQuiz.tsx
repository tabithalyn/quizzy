import axios from "axios";
import { useEffect, useState } from "react";

type CategoriesType = {
  name:string;
  id:number;
}

const SetQuiz = () => {
  const [allCategories, setAllCategories] = useState<CategoriesType[]>([]);
  const [chosenCategory, setCategory] = useState("");

  useEffect(() => {
    const url = "https://opentdb.com/api_category.php";
    const fetch = async () => {
      try {
        const {data} = await axios.get(url);
        setAllCategories(data.trivia_categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <>
    <select
      name="category"
      id="category"
      value={chosenCategory}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full bg-white p-3 my-6"
    >
      {allCategories.map((category:CategoriesType, id:number) => (
        <option key={id} value={category.id}>{category.name}</option>
      ))}
    </select>
    </>
  );
}
 
export default SetQuiz;