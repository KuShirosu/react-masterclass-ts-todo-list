import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { CategoriesState, flagState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import SelectCategory from "./SelectCategory";
import { useEffect } from "react";

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const selectedToDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(CategoriesState);
  const [flag, setFlag] = useRecoilState(flagState);

  useEffect(() => {
    const storedToDos = localStorage.getItem("toDos");
    const storedCategories = localStorage.getItem("categories");
    if (storedToDos) setToDos(JSON.parse(storedToDos));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, [setToDos, setCategories]);
  useEffect(() => {
    if (!flag) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
      localStorage.setItem("categories", JSON.stringify(categories));
    } else {
      setFlag(false);
    }
  }, [toDos, categories, flag, setFlag]);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <SelectCategory />
      <hr />
      <CreateToDo />
      <hr />
      {selectedToDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

/* interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onVaild = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onVaild)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("email", {
            required: "This is required!",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          type="text"
          placeholder="email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Email is required!",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          type="text"
          placeholder="firstName"
        />
        <span>{errors.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: "This is required!",
          })}
          type="text"
          placeholder="lastName"
        />
        <span>{errors.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "This is required!",
          })}
          type="text"
          placeholder="Username"
        />
        <span>{errors.userName?.message}</span>
        <input
          {...register("password", {
            required: "This is required!",
            minLength: {
              value: 5,
              message: "too short!",
            },
          })}
          type="text"
          placeholder="password"
        />
        <span>{errors.password?.message}</span>

        <input
          {...register("password1", {
            required: "This is required!",
            minLength: {
              value: 5,
              message: "too short!",
            },
          })}
          type="text"
          placeholder="password1"
        />
        <span>{errors.password1?.message}</span>

        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
}
 */
export default ToDoList;
