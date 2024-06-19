import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, CategoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(CategoriesState);

  const sliceToDos = (toDos: IToDo[]) => {
    const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
    return [toDos.slice(0, targetIndex), toDos.slice(targetIndex + 1)];
  };
  const onClickChangeCategory = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const [front, back] = sliceToDos(oldToDos);
      const newToDo = { text, id, category: name as Categories };
      return [...front, newToDo, ...back];
    });
  };
  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const [front, back] = sliceToDos(oldToDos);
      return [...front, ...back];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {/* {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClickChangeCategory}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClickChangeCategory}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClickChangeCategory}>
          Done
        </button>
      )} */}
      {categories.map(
        (cat) =>
          category !== cat.category && (
            <button name={cat.category} onClick={onClickChangeCategory}>
              {cat.category}
            </button>
          )
      )}
      <button onClick={onClickDelete}>Delete</button>
    </li>
  );
}

export default ToDo;
