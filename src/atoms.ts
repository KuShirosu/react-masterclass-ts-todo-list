import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "To Do",
  "DOING" = "Doing",
  "DONE" = "Done",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories | string;
}

export interface ICategory {
  category: string;
  id: number;
}

export const categoryState = atom<Categories | string>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const flagState = atom({
  key: "flag",
  default: true,
});

// Categories 열거형을 배열로 변환하고 각 요소에 id를 할당하는 함수
const categoriesArray: ICategory[] = Object.values(Categories).map(
  (category, index) => ({
    category,
    id: index,
  })
);

export const CategoriesState = atom<ICategory[]>({
  key: "categories",
  default: categoriesArray,
});
